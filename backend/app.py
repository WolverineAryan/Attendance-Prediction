from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import numpy as np
import pandas as pd
import joblib
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from models import db, User
from ai_chat import ask_ollama
from ai_chat import ask_ai

app = Flask(__name__)
CORS(app)
app.config["JWT_SECRET_KEY"] = "your-secret-key-here"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///attendance.db"

jwt = JWTManager(app)
bcrypt = Bcrypt(app)
db.init_app(app)
with app.app_context():
    db.create_all() 

    
uploaded_csv_text = ""

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
# SignUP ROUTE
# ===============================
@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User already exists"}), 400

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")

    user = User(name=name, email=email, password=hashed)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"})

# ===============================
# LOGIN ROUTE
# ===============================
@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = create_access_token(identity=user.id)

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })

# ===============================
# MANUAL PREDICTION
# ===============================
@app.route("/predict-manual", methods=["POST"])
def predict_manual():
    data = request.get_json()

    attendance = data["attendance"]
    late = data["late"]
    leaves = data["leaves"]
    discipline = data["discipline"]

    X = np.array([[attendance, late, leaves, discipline]])

    model.predict(X)

    # RULE BASED OVERRIDE LOGIC
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
# CSV PREDICTION
# ===============================
@app.route("/predict-csv", methods=["POST"])
def predict_csv():
    try:
        file = request.files["file"]
        df = pd.read_csv(file)

        # ---- FIX: Remove existing risk column ----
        if "risk" in df.columns:
            df = df.drop(columns=["risk"])

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
# STORE UPLOADED CSV DATA FOR AI
# ===============================
@app.route("/upload-data", methods=["POST"])
def upload_data():
    global uploaded_csv_text

    uploaded_csv_text = request.json.get("text", "")

    return jsonify({"message": "CSV data stored for AI chatbot"})

# ===============================
# CHATBOT ROUTE
# ===============================
@app.route("/chat", methods=["POST"])
def chat():
    question = request.json.get("question")

    if not uploaded_csv_text:
        return jsonify({
            "reply": "Please upload a CSV file first before asking questions."
        })

    answer = ask_ollama(question, uploaded_csv_text)

    return jsonify({"reply": answer})


# ===============================
# RUN SERVER
# ===============================
if __name__ == "__main__":
    app.run(port=5000)
