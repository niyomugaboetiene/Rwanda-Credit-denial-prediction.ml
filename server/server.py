from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/get_province")
def get_province_names():
    