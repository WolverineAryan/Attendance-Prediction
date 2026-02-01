from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pandas as pd
import os

# ✅ CREATE FLASK APP FIRST
app = Flask(__name__)
CORS(app)

# -----------------------------
# CSV PREDICTION ROUTE
# -----------------------------
@app.route("/predict-csv", methods=["POST"])
def predict_csv():

    file = request.files.get("file")

    if not file:
        return jsonify({"error": "No file uploaded"}), 400

    df = pd.read_csv(file)

    # ✅ simple rule-based prediction (replace with ML later)
    def predict(row):
        if row["attendance"] < 50:
            return "High", "Very low attendance"
        elif row["attendance"] < 70:
            return "Medium", "Irregular attendance"
        else:
            return "Low", "Good attendance"

    predictions = df.apply(
        lambda r: predict(r), axis=1, result_type="expand"
    )

    df["risk"] = predictions[0]
    df["reason"] = predictions[1]

    # ✅ SAVE AS REAL CSV
    output_file = "attendance_prediction.csv"
    df.to_csv(output_file, index=False)

    return send_file(
        output_file,
        as_attachment=True,
        download_name="attendance_prediction.csv",
        mimetype="text/csv"
    )

@app.route("/")
def home():
    return "Attendance Prediction API is running"

# -----------------------------
# RUN SERVER
# -----------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
