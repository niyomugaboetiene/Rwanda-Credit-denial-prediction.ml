import pickle
import json
import imblearn
import numpy as np
import pandas as pd

__province = None
__district = None
__model = None
__data_columns = None

def get_district_names():
    return __district

def get_province_names():
    return __province


def predict_credit_denial(district, province, s10aq3_converted, ur_converted, poverty_converted, quintile_converted):
    try:
         district_index = __data_columns.index(district.lower())  if district.lower() in __data_columns else -1
         province_index = __data_columns.index(province.lower()) if province.lower() in __data_columns else -1
         quintile_index = __data_columns.index("quintile_converted")
         poverity_index = __data_columns.index("poverty_converted")
         s10aq3_index = __data_columns.index("s10aq3_converted")
         ur_index = __data_columns.index("ur_converted")

         x = np.zeros(len(__data_columns))

         x[s10aq3_index] = s10aq3_converted
         x[ur_index] = ur_converted
         x[quintile_index] = quintile_converted
         x[poverity_index] = poverty_converted

         if (district_index >= 0):
           x[district_index] = 1
        
         if (province_index >= 0):
            x[province_index] = 1
        
        #  print("------ DEBUG START ------")
        #  print("District:", district)
        #  print("Province:", province)
        #  print("Vector:", x)
        #  print("Non-zero values:", [i for i, v in enumerate(x) if v != 0])
        #  print("Prediction:", __model.predict([x])[0])
        #  print("------ DEBUG END ------")
         return  int(__model.predict([x])[0])

    except Exception as e:
        print("Error", e)
        x[district_index] = -1
        x[province_index] = -1
        x[ur_index] = -1
        x[s10aq3_index] = -1
        x[quintile_index] = -1


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
    # print(f"District {len(get_district_names())}")
    # print(f"Province {get_province_names()}")
    print(f"Prediction is {predict_credit_denial('nyarugenge', 'City of Kigali', 1, 1, 2, 2)}")