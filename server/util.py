
import os
import json
import pickle
import numpy as np

__province = None
__district = None
__model = None
__data_columns = None


def get_district_names():
    return __district


def get_province_names():
    return __province


def predict_credit_denial(
    district,
    province,
    s10aq3_converted,
    ur_converted,
    poverty_converted,
    quintile_converted
):
    if __model is None or __data_columns is None:
        raise RuntimeError("Model artifacts have not been loaded.")

    try:
        district = str(district).strip().lower()
        province = str(province).strip().lower()

        district_index = (
            __data_columns.index(district)
            if district in __data_columns else -1
        )

        province_index = (
            __data_columns.index(province)
            if province in __data_columns else -1
        )

        quintile_index = __data_columns.index(
            "quintile_converted"
        )

        poverty_index = __data_columns.index(
            "poverty_converted"
        )

        s10aq3_index = __data_columns.index(
            "s10aq3_converted"
        )

        ur_index = __data_columns.index(
            "ur_converted"
        )

        if district_index == -1:
            raise ValueError(f"Unknown district: {district}")

        if province_index == -1:
            raise ValueError(f"Unknown province: {province}")

        x = np.zeros(len(__data_columns), dtype=float)

        x[s10aq3_index] = float(s10aq3_converted)
        x[ur_index] = float(ur_converted)
        x[poverty_index] = float(poverty_converted)
        x[quintile_index] = float(quintile_converted)

        x[district_index] = 1
        x[province_index] = 1

        prediction = __model.predict(x.reshape(1, -1))[0]

        return int(prediction)

    except Exception as e:
        print("Prediction error:", e)
        raise


def load_artifacts():

    print("Loading saved artifacts......")

    global __data_columns
    global __province
    global __district
    global __model

    SERVER_DIR = os.path.dirname(os.path.abspath(__file__))

    PROJECT_DIR = os.path.dirname(SERVER_DIR)

    ARTIFACTS_DIR = os.path.join(
        PROJECT_DIR,
        "artifacts"
    )

    columns_path = os.path.join(
        ARTIFACTS_DIR,
        "columns.json"
    )

    model_path = os.path.join(
        ARTIFACTS_DIR,
        "model.pickle"
    )

    if not os.path.isfile(columns_path):
        raise FileNotFoundError(
            f"columns.json not found: {columns_path}"
        )

    if not os.path.isfile(model_path):
        raise FileNotFoundError(
            f"model.pickle not found: {model_path}"
        )

    with open(columns_path, "r") as f:

        data = json.load(f)

        __data_columns = data["data_columns"]

    with open(model_path, "rb") as f:

        __model = pickle.load(f)

    __province = __data_columns[3:8]
    __district = __data_columns[8:38]

    print("Loading saved artifacts done.")

    print("Total features:", len(__data_columns))
    print("Total provinces:", len(__province))
    print("Total districts:", len(__district))


if __name__ == "__main__":

    load_artifacts()

    print(
        "Prediction is:",
        predict_credit_denial(
            "nyarugenge",
            "city of kigali",
            1,
            1,
            2,
            2
        )
    )
