from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
import os

app = Flask(__name__)
CORS(app)
print("✅ app.py loaded")

# ===============================
# Load trained ML model
# ===============================
model = joblib.load("attendance_model.pkl")


# ===============================
# HOME TEST ROUTE
# ===============================
@app.route("/")
def home():
    return "Backend running successfully"


# ===============================
# ✅ MANUAL PREDICTION
# ===============================
@app.route("/predict-manual", methods=["POST"])
def predict_manual():
    data = request.get_json()

    attendance = data["attendance"]
    late = data["late"]
    leaves = data["leaves"]
    discipline = data["discipline"]

    X = np.array([[attendance, late, leaves, discipline]])

    pred = model.predict(X)[0]

    # ---------- RULE OVERRIDE ----------
    if attendance < 50 or leaves > 8 or late > 12:
        risk = "High"
        reason = "Very low attendance or excessive leaves/late"

    elif attendance < 70 or late > 6:
        risk = "Medium"
        reason = "Irregular attendance pattern"
    else:
        risk = "Low"
        reason = "Good attendance record"


    return jsonify({
        "risk": risk,
        "reason": reason
    })


# ===============================
# ✅ CSV PREDICTION
@app.route("/predict-csv", methods=["POST"])
def predict_csv():
    try:
        file = request.files["file"]
        df = pd.read_csv(file)

        df.columns = (
            df.columns.str.lower()
            .str.replace(" ", "")
            .str.replace("_", "")
            .str.replace("%", "")
        )

        def find_col(keys):
            for col in df.columns:
                for k in keys:
                    if k in col:
                        return col
            return None

        attendance_col = find_col(["attendance", "attend", "present"])
        late_col = find_col(["late"])
        leaves_col = find_col(["leave", "absent"])
        discipline_col = find_col(["discipline", "behavior", "behaviour"])

        if not all([attendance_col, late_col, leaves_col, discipline_col]):
            return jsonify({
                "error": "CSV must include attendance, late, leaves, discipline columns"
            }), 400

        def clean(col):
            return (
                col.astype(str)
                .str.replace("%", "")
                .replace("", "0")
                .replace("nan", "0")
                .astype(float)
            )

        X = pd.DataFrame({
            "attendance": clean(df[attendance_col]),
            "late": clean(df[late_col]),
            "leaves": clean(df[leaves_col]),
            "discipline": clean(df[discipline_col]),
        })

        preds = model.predict(X.values)

        # ✅ FIX HERE
        def normalize_prediction(p):
            if isinstance(p, str):
                return p.capitalize()
            risk_map = {0: "Low", 1: "Medium", 2: "High"}
            return risk_map.get(int(p), "Unknown")

        df["risk"] = [normalize_prediction(p) for p in preds]

        output = "attendance_prediction.csv"
        df.to_csv(output, index=False)

        return send_file(output, as_attachment=True)

    except Exception as e:
        print("CSV ERROR:", e)
        return jsonify({"error": str(e)}), 500


# ===============================
# RUN SERVER
# ===============================
if __name__ == "__main__":
    app.run(port=5000)
