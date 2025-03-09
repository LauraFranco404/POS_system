from django_backend.mongo_connection import db
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
import pymongo
from datetime import datetime, timedelta
from pymongo import WriteConcern
from pymongo.errors import PyMongoError
from bson import ObjectId

inventory = db["inventory"]
sales = db["sales"]
users = db["users"]

@csrf_exempt
def getSalesBySellerID(request):
    # Check if the request method is GET
    if request.method != 'GET':
        return JsonResponse({"error": "Invalid request method. Only GET is allowed."}, status=405)

    try:
        # Get sellerid from query parameters
        seller_id = int(request.GET.get("sellerid"))

        # Check if seller_id is provided
        if not seller_id:
            return JsonResponse({"error": "Missing 'sellerid' parameter in the URL."}, status=400)

        print(seller_id)
        # Validate if seller exists
        if not users.find_one({"documentid": seller_id}):
            print("not found: ",seller_id)
            return JsonResponse({"error": "Seller not found."}, status=404)

        # Fetch sales for the given seller ID
        sales_data = list(sales.find({"sellerid": seller_id}))

        # If no sales found
        if not sales_data:
            return JsonResponse({"message": "No sales found for this seller.", "sales": []}, status=200)

        # Prepare the response
        response = []
        for sale in sales_data:
            sale["_id"] = str(sale["_id"])  # Convert ObjectId to string
            response.append(sale)

        return JsonResponse({"message": "Sales retrieved successfully.", "sales": response}, status=200)

    except PyMongoError as e:
        return JsonResponse({"error": "Database error: " + str(e)}, status=500)

    except Exception as e:
        return JsonResponse({"error": "An unexpected error occurred: " + str(e)}, status=500)

    
@csrf_exempt
def sellProducts(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            sellerid = data.get("sellerid")
            products = data.get("products", [])

            if not products:
                return JsonResponse({"error": "No products provided"}, status=400)

            if not sellerid or not users.find_one({"documentid": sellerid}):
                return JsonResponse({"error": "Seller not found"}, status=404)

            # Guardar la fecha y hora en formato ISO 8601
            data["sale_datetime"] = datetime.now().isoformat()

            with db.client.start_session() as session:
                with session.start_transaction(write_concern=WriteConcern("majority")):
                    product_ids = [p["productid"] for p in products]
                    existing_products = list(inventory.find({"productid": {"$in": product_ids}}, session=session))
                    existing_product_map = {p["productid"]: p for p in existing_products}

                    updates = []
                    for product in products:
                        productid = product.get("productid")
                        amount = product.get("amount", 0)

                        if productid is None or amount <= 0:
                            raise ValueError("Invalid product data")

                        existing_product = existing_product_map.get(productid)
                        if not existing_product:
                            raise ValueError(f"Product with id {productid} not found")
                        if existing_product["amount"] < amount:
                            raise ValueError(f"Insufficient stock for product {productid}")

                        updates.append({
                            "filter": {"productid": productid},
                            "update": {"$inc": {"amount": -amount}}
                        })

                    if updates:
                        inventory.bulk_write([
                            pymongo.UpdateOne(update["filter"], update["update"])
                            for update in updates
                        ], session=session)

                    sales.insert_one(data, session=session)

            return JsonResponse({"message": "Sale registered successfully"}, status=200)

        except ValueError as e:
            return JsonResponse({"error": str(e)}, status=400)
        except PyMongoError as e:
            return JsonResponse({"error": "Database error: " + str(e)}, status=500)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "Method not allowed"}, status=405)

# 🟢 Consultas por rango de fechas relativo a sale_datetime
def querySalesByRelativeDays(days):
    limit_date = datetime.now() - timedelta(days=days)
    return list(sales.find({
        "sale_datetime": {"$gte": limit_date.isoformat()}
    }))

# 🟢 Obtener ventas de las últimas 24 horas
def getSalesToday(request):
    try:
        sales_today = querySalesByRelativeDays(1)
        for sale in sales_today:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_today, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# 🟢 Obtener ventas de los últimos 7 días
def getSalesThisWeek(request):
    try:
        sales_this_week = querySalesByRelativeDays(7)
        for sale in sales_this_week:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_this_week, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# 🟢 Obtener ventas del último mes (30 días)
def getSalesThisMonth(request):
    try:
        sales_this_month = querySalesByRelativeDays(30)
        for sale in sales_this_month:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(sales_this_month, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# 🟢 Obtener todas las ventas
def getAllSales(request):
    try:
        all_sales = list(sales.find({}))
        for sale in all_sales:
            sale["_id"] = str(sale["_id"])
        return JsonResponse(all_sales, safe=False, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

# 🟢 Eliminar una venta
@csrf_exempt
def deleteSale(request):
    if request.method != "DELETE":
        return JsonResponse({"error": "Method not allowed"}, status=405)
    try:
        data = json.loads(request.body)
        sale_id = data.get("_id")

        if not sale_id or not ObjectId.is_valid(sale_id):
            return JsonResponse({"error": "Invalid or missing sale ID"}, status=400)

        result = sales.delete_one({"_id": ObjectId(sale_id)})
        if result.deleted_count == 0:
            return JsonResponse({"error": "Sale not found"}, status=404)

        return JsonResponse({"message": "Sale deleted successfully"}, status=200)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


