from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import json
from django.views.decorators.csrf import csrf_exempt
import os
from dotenv import load_dotenv

load_dotenv()
uri = os.getenv("DATABASE_URL") #full url is in .env file, it is not uploaded to the repository.
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["Test-stuff"]
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

@csrf_exempt
def addseller(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            db["sellers"].insert_one(data)
            return JsonResponse({"message": "Seller added"}, status=201) #201 - good status and created something
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500) #500 - server error
    return JsonResponse({"error": "method not allowed"}, status=405) #405 - method not allowed e.g only post type allowed


def deleteseller(request):
    return HttpResponse("Removed seller to bd!")

def updateseller(request):
    return HttpResponse("Upadted seller to bd!")

def getsellers(request):
    return HttpResponse("Some sollers!")

def getseller(request):
    return HttpResponse("Single seller!")
