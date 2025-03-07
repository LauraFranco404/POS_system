from django_backend.mongo_connection import db

from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import json
import pymongo  # 👈 Importación necesaria

from pymongo import WriteConcern
from pymongo.errors import PyMongoError

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
                return JsonResponse({"error": "Seller not found"}, status=404)

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
