from django_backend.mongo_connection import db

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import json
import pymongo  # 👈 Importación necesaria
from datetime import datetime  # 👈 Importación para la fecha y hora

from pymongo import WriteConcern
from pymongo.errors import PyMongoError

from bson import ObjectId  # 👈 Importación necesaria para manejar ObjectId


inventory = db["inventory"]
sales = db["sales"]
sellers = db["sellers"]  # 👈 Colección para los vendedores

# product sale structure {sellerid: 111, clientid: 112, products: [{"productid": 1, "amount": 1}, ..., {"productid": 2, "amount": 2}]}
@csrf_exempt
def sellProducts(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            sellerid = data.get("sellerid")
            products = data.get("products", [])
            
            # Validar si hay productos en la solicitud
            if not products:
                return JsonResponse({"error": "No products provided"}, status=400)

            # Validar si el vendedor existe
            if not sellerid or not sellers.find_one({"documentid": sellerid}):
                print("vendedor no existe")
                return JsonResponse({"error": "Seller not found"}, status=404)

            # Agregar fecha y hora de la venta
            data["sale_datetime"] = datetime.now().isoformat()  # 👈 Fecha y hora en formato ISO 8601

            # Iniciar una sesión para la transacción
            with db.client.start_session() as session:
                with session.start_transaction(write_concern=WriteConcern("majority")):
                    # Obtener todos los productos mencionados en una sola consulta
                    product_ids = [p["productid"] for p in products]
                    existing_products = list(inventory.find({"productid": {"$in": product_ids}}, session=session))
                    
                    # Crear un diccionario para acceder rápidamente a los productos existentes
                    existing_product_map = {p["productid"]: p for p in existing_products}

                    # Validar existencia y stock suficiente
                    updates = []
                    for product in products:
                        productid = product.get("productid")
                        amount = product.get("amount", 0)

                        # Validar los datos del producto
                        if productid is None or amount <= 0:
                            raise ValueError("Invalid product data")

                        # Validar existencia y stock suficiente
                        existing_product = existing_product_map.get(productid)
                        if not existing_product:
                            raise ValueError(f"Product with id {productid} not found")
                        if existing_product["amount"] < amount:
                            raise ValueError(f"Insufficient stock for product {productid}")

                        # Preparar actualizaciones para update_many
                        updates.append({
                            "filter": {"productid": productid},
                            "update": {"$inc": {"amount": -amount}}
                        })

                    # Ejecutar update_many para todas las actualizaciones en una sola operación
                    if updates:
                        inventory.bulk_write([
                            pymongo.UpdateOne(update["filter"], update["update"])
                            for update in updates
                        ], session=session)

                    # Registrar la venta en la colección sales
                    sales.insert_one(data, session=session)

            # Commit exitoso
            return JsonResponse({"message": "Sale registered successfully"}, status=200)

        except ValueError as e:
            # Error de validación de datos
            return JsonResponse({"error": str(e)}, status=400)
        except PyMongoError as e:
            # Error en la transacción o en la conexión
            print(e)
            return JsonResponse({"error": "Database error: " + str(e)}, status=500)
        except Exception as e:
            # Error general
            print(e)
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# Obtener todas las ventas
def getAllSales(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        all_sales = list(sales.find({}))
        # Convertir _id a string
        for sale in all_sales:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(all_sales, safe=False, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)


# Obtener ventas de hoy
def getSalesToday(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        today = datetime.now().date()
        start = datetime.combine(today, datetime.min.time())
        end = datetime.combine(today, datetime.max.time())

        sales_today = list(sales.find({"sale_datetime": {"$gte": start.isoformat(), "$lt": end.isoformat()}}))
        # Convertir _id a string
        for sale in sales_today:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_today, safe=False, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)


# Obtener ventas de esta semana
def getSalesThisWeek(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        today = datetime.now().date()
        start_of_week = today - timedelta(days=today.weekday())
        start = datetime.combine(start_of_week, datetime.min.time())
        end = datetime.combine(today, datetime.max.time())

        sales_this_week = list(sales.find({"sale_datetime": {"$gte": start.isoformat(), "$lt": end.isoformat()}}))
        # Convertir _id a string
        for sale in sales_this_week:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_this_week, safe=False, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)

# Obtener ventas de este mes
def getSalesThisMonth(request):
    if request.method != "GET":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        today = datetime.now()
        start_of_month = today.replace(day=1)
        start = datetime.combine(start_of_month, datetime.min.time())
        end = datetime.combine(today, datetime.max.time())

        sales_this_month = list(sales.find({"sale_datetime": {"$gte": start.isoformat(), "$lt": end.isoformat()}}))
        # Convertir _id a string
        for sale in sales_this_month:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_this_month, safe=False, status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)
# Eliminar una venta obteniendo el ID desde el cuerpo de la petición (JSON)
@csrf_exempt
def deleteSale(request):
    if request.method != "DELETE":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        # Obtener el cuerpo de la petición y cargarlo como JSON
        data = json.loads(request.body)
        sale_id = data.get("_id")

        # Verificar si el ID fue proporcionado
        if not sale_id:
            return JsonResponse({"error": "Sale ID is required"}, status=400)  # 400 - Bad Request

        # Verificar si el ID es válido
        if not ObjectId.is_valid(sale_id):
            return JsonResponse({"error": "Invalid sale ID format"}, status=400)  # 400 - Bad Request

        # Buscar y eliminar la venta
        result = sales.delete_one({"_id": ObjectId(sale_id)})
        if result.deleted_count == 0:
            return JsonResponse({"error": "Sale not found"}, status=404)  # 404 - Not Found
        return JsonResponse({"message": "Sale deleted successfully"}, status=200)  # 200 - OK

    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)  # 400 - Bad Request
    except Exception as e:
        print(e)
        return JsonResponse({"error": str(e)}, status=500)  # 500 - Server Error
