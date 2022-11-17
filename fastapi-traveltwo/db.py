import os
import bson
import pymongo

dbhost = os.environ['MONGOHOST']
dbname = os.environ['MONGODATABASE']
dbuser = os.environ['MONGOUSER']
dbpass = os.environ['MONGOPASSWORD']
mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"

client = pymongo.MongoClient(mongo_str)
