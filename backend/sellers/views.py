from django_backend.mongo_connection import db
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.shortcuts import render
import bcrypt
import json

users = db["users"]
# json users structure: {"documentid": 1234567891, "name": "n1", "lastname": "n2", "datebirth": "10/10/2010", "password":1234, "type": "seller"}

@csrf_exempt
def addSeller(request):
    print("method: ", request.method)
    if request.method == "POST":
        try:
            data = json.loads(request.body)

            # Verificar si el tipo es "seller"
            if data.get("type") != "seller":
                return JsonResponse({"error": "Invalid user type. Only 'seller' can be added."}, status=403)

            if users.find_one({"documentid": data.get("documentid")}) is None:
                # Encrypt password
                password = str(data.get("password")).encode("utf-8")
                hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
                data["password"] = hashed_password.decode("utf-8")

                users.insert_one(data)
                return JsonResponse({"message": "Seller added"}, status=200)
            else:
                return JsonResponse({"error": "Seller Document ID has already been added"}, status=409)
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def deleteSeller(request):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            seller = users.find_one({"documentid": data.get("documentid")})

            # Comprobar si el usuario es un vendedor
            if seller and seller.get("type") == "seller":
                users.delete_one({"documentid": data.get("documentid")})
                return JsonResponse({"message": "Seller deleted"}, status=200)
            elif seller:
                return JsonResponse({"error": "User is not a seller"}, status=403)
            else:
                return JsonResponse({"error": "Seller Document ID was not found"}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Method not allowed"}, status=405)

@csrf_exempt
def updateSeller(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            seller = users.find_one({"documentid": data.get("documentid")})

            # Comprobar si el usuario es un vendedor
            if seller and seller.get("type") == "seller":
                # Encrypt password
                password = str(data.get("password")).encode("utf-8")
                hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())
                data["password"] = hashed_password.decode("utf-8")
                
                users.update_one({"documentid": data.get("documentid")}, {"$set": data})
                return JsonResponse({"message": "Seller updated"}, status=200)
            elif seller:
                return JsonResponse({"error": "User is not a seller"}, status=403)
            else:
                return JsonResponse({"error": "Seller Document ID was not found"}, status=404)
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def getAllSellers(request):
    if request.method == "GET":
        try:
            # Filtrar solo vendedores
            usersdb = list(users.find({"type": "seller"}, {"_id": 0, "password": 0}))
            return JsonResponse({"sellers": usersdb}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    return JsonResponse({"error": "Method not allowed"}, status=405)

def getSellerById(request):
    if request.method == "GET":
        documentid = int(request.GET.get("documentid"))
        if not documentid:
            return JsonResponse({"error": "No Document ID provided"}, status=400)

        seller = users.find_one({"documentid": documentid}, {"_id": 0, "password": 0})

        # Comprobar si el usuario es un vendedor
        if seller and seller.get("type") == "seller":
            return JsonResponse({"seller": seller}, status=200)
        elif seller:
            return JsonResponse({"error": "User is not a seller"}, status=403)
        else:
            return JsonResponse({"error": "Seller Document ID was not found"}, status=404)

    return JsonResponse({"error": "Method not allowed"}, status=405)
