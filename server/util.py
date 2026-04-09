import pickle
import json

__province = None
__district = None
__model = None
__data_columns = None

def get_district_names():
    pass


def load_artifacts():

    print("Loading saved artifacs......")
    global __data_columns
    global __province
    global __district
    global __model

with open("./artifacts/columns.json", "r") as f:
    __data_columns = json.load(f)['data_columns']

with open("/artifacts/model.pickle", "rb") as f:
    __model = pickle.load(f)