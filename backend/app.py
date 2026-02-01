from flask import Flask, request, send_file
from flask_cors import CORS
import pandas as pd
import joblib

app = Flask(__name__)
CORS(app)

model = joblib.load("attendance_model.pkl")

@app.route("/")
def home():
    return "Backend running"

@app.route("/predict-csv", methods=["POST"])
def predict_csv():
    file = request.files["file"]
    df = pd.read_csv(file)

    X = df[["attendance", "late", "leaves", "discipline"]]
    df["risk"] = model.predict(X)

    df.to_csv("attendance_prediction.csv", index=False)

    return send_file(
        "attendance_prediction.csv",
        as_attachment=True,
        download_name="attendance_prediction.csv"
    )

@app.route("/predict-manual", methods=["POST"])
def predict_manual():
    data = request.json

    X = pd.DataFrame([{
        "attendance": data["attendance"],
        "late": data["late"],
        "leaves": data["leaves"],
        "discipline": data["discipline"]
    }])

    risk = model.predict(X)[0]

    reason = (
        "Very low attendance"
        if risk == "High"
        else "Irregular attendance"
        if risk == "Medium"
        else "Good attendance"
    )

    return {
        "risk": risk,
        "reason": reason
    }

if __name__ == "__main__":
    app.run(port=5000, debug=True)
