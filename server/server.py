from flask import Flask, request, jsonify
import util

app = Flask(__name__)

@app.route("/get_province")
def get_province_names():
    response = jsonify({
        "province": util.get_province_names()
    })

    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route("/get_district")
def get_district_names():
    response = jsonify({
        "province": util.get_district_names()
    })

    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

@app.route('/predict_credit_denial', methods=['POST'])
def predict_house_credit_denail():
    # district, province, s10aq3_converted, ur_converted, poverty_converted, quintile_converted
    district = request.json['district']
    province = request.json['province']
    s10aq3_converted = int(request.json['s10aq3_converted'])
    ur_converted = int(request.json['ur_converted'])
    poverty_converted = int(request.json['poverty_converted'])
    quintile_converted = float(request.json['quintile_converted'])

    response = jsonify({
        "Allowed for credit": util.predict_credit_denial(district, province, s10aq3_converted, ur_converted, poverty_converted, quintile_converted)
    })

    response.headers.add("Access-Control-Allow-Origin", "*")

    return response

if __name__ == "__main__":
    print("Server started successfully")
    util.load_artifacts()
    app.run()