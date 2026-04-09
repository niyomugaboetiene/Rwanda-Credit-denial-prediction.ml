import pickle
import json
import sklearn
import numpy as np

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
         district_index = __data_columns.index(district.lower())
         province_index = __data_columns.index(province.lower())
         quintile_index = __data_columns.index(quintile_converted)
         poverity_index = __data_columns.index(poverity_index)
         s10aq3_index = __data_columns.index(s10aq3_converted)
         ur_index = __data_columns.index(ur_converted)

         x = np.zeros(len(__data_columns))

         x[s10aq3_index] = s10aq3_converted
         x[ur_index] = ur_converted
         x[quintile_index] = quintile_converted
         x[poverity_index] = poverty_converted

         if (district_index >= 0):
           x[district_index] = 1
        
         if (province_index >= 0):
            x[province_index] = 1
        
         y_pred = __model.predict([x])[0]

    except:
        x[district_index] = -1
        x[province_index] = -1
        x[ur_index] = -1
        x[s10aq3_index] = -1
        x[quintile_converted] = -1


    return y_pred

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