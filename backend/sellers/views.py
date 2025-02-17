from django.views.decorators.csrf import csrf_exempt
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from django.http import JsonResponse
from django.shortcuts import render
from dotenv import load_dotenv
import bcrypt
import json
import os

load_dotenv()
uri = os.getenv("DATABASE_URL") #full url is in .env file, it is not uploaded to the repository.
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["Test-stuff"]
sellers = db["sellers"]

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

#json sellers structure: {"documentid": 1234567891, "name": "nombre1", "lastname": "apellido1", "datebirth": "10/10/2010", "password":1234}

@csrf_exempt
def addSeller(request):
    print("method: ", request.method)
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            if (sellers.find_one({"documentid": data.get("documentid")}) == None):
                
                #encrypt password
                password = str(data.get("password")).encode("utf-8")  
                hashed_password = bcrypt.hashpw(password, bcrypt.gensalt())  
                data["password"] = hashed_password.decode("utf-8")

                sellers.insert_one(data)
                return JsonResponse({"message": "Seller added"}, status=200) #200 - good status
            else:
                return JsonResponse({"error": "seller already added"}, status=409) #409 - conflict     
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500) #500 - server error
    return JsonResponse({"error": "method not allowed"}, status=405) #405 - method not allowed e.g only post type allowed

@csrf_exempt
def deleteSeller(request):
    if request.method == "DELETE":
        try:
            data = json.loads(request.body)
            if (sellers.find_one({"documentid": data.get("documentid")}) != None):
                sellers.delete_one({"documentid": data.get("documentid")})
                return JsonResponse({"message": "Seller deleted"}, status=200) #200 - good status
            else:
                return JsonResponse({"error": "seller not found"}, status=404) #404 - not found
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500) #500 - server error
    return JsonResponse({"error": "method not allowed"}, status=405) #405 - method not allowed e.g only post type allowed

@csrf_exempt
def updateSeller(request):
    if request.method == "PUT":
        try:
            data = json.loads(request.body)
            if (sellers.find_one({"documentid": data.get("documentid")}) != None):
                sellers.update_one({"documentid": data.get("documentid")}, {"$set": data})
                return JsonResponse({"message": "Seller updated"}, status=200) #200 - good status
            else:
                return JsonResponse({"error": "seller doesn't exists"}, status=404) #404 - not found     
        except Exception as e:
            print(e)
            return JsonResponse({"error": str(e)}, status=500) #500 - server error
    return JsonResponse({"error": "method not allowed"}, status=405) #405 - method not allowed e.g only post type allowed

def getAllSellers(request):
    if request.method == "GET":
        try:
            sellersdb = list(sellers.find({}, {"_id": 0, "password": 0}))  # Excluir el campo _id
            return JsonResponse({"sellers": sellersdb}, status=200, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)

    return JsonResponse({"error": "method not allowed"}, status=405)

def getSellerById(request):
    if request.method == "GET":
        documentid = int(request.GET.get("documentid")) # get val form param

        if not documentid:
            return JsonResponse({"error": "No documentid provided"}, status=400) 
        print("docid: ", documentid)
        seller = sellers.find_one({"documentid": documentid}, {"_id": 0, "password":0})

        if seller:
            return JsonResponse({"seller": seller}, status=200) #200 - good status
        else:
            return JsonResponse({"error": "Seller not found"}, status=404) #404 - not found     

    return JsonResponse({"error": "Método no permitido"}, status=405) #405 - method not allowed e.g only post type allowed
