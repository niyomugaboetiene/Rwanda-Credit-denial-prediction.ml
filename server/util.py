import pickle
import json
import sklearn

__province = None
__district = None
__model = None
__data_columns = None

def get_district_names():
    return __district

def get_province_names():
    return __province


def load_artifacts():

    print("Loading saved artifacs......")
    global __data_columns
    global __province
    global __district
    global __model

    with open("./artifacts/columns.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __district = __data_columns[8:38]
        __province = __data_columns[3:8]

    with open("./artifacts/model.pickle", "rb") as f:
        __model = pickle.load(f)
    
    print("Loading saved artifacts done.")


if __name__ == "__main__":
    load_artifacts()
    print(f"District {len(get_district_names())}")
    print(f"Province {get_province_names()}")