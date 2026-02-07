import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, accuracy_score
import joblib
import numpy as np

print("Loading dataset...")

df = pd.read_csv("large_attendance_dataset.csv")

df.columns = (
    df.columns.str.lower()
    .str.replace(" ", "")
    .str.replace("_", "")
    .str.replace("%", "")
)

print("Columns:", df.columns.tolist())

# ---- USE FEWER FEATURES TO AVOID OVERFITTING ----
X = df[[
    "dayspresent",
    "latedays",
    "leavestaken"
]]

y = df["attendancerisk"]

risk_map = {
    "Low Risk": 0,
    "Medium Risk": 1,
    "High Risk": 2
}

y = y.map(risk_map)

df = df.dropna()

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# ---- ADD SMALL NOISE TO REDUCE PERFECT LEARNING ----
X_scaled = X_scaled + np.random.normal(0, 0.05, X_scaled.shape)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.3, random_state=42
)

# ---- SIMPLER, WEAKER MODEL ----
model = RandomForestClassifier(
    n_estimators=40,          # very small
    max_depth=4,              # restrict depth
    min_samples_split=25,
    min_samples_leaf=15,
    class_weight="balanced",
    max_features=2,
    random_state=42
)

cv_scores = cross_val_score(model, X_train, y_train, cv=5)

print("Cross Validation Scores:", cv_scores)
print("Average CV Score:", cv_scores.mean())

model.fit(X_train, y_train)

preds = model.predict(X_test)

print("Test Accuracy:", accuracy_score(y_test, preds))
print("\nClassification Report:\n")
print(classification_report(y_test, preds))

joblib.dump(model, "attendance_model.pkl")
joblib.dump(scaler, "scaler.pkl")

print("✅ Model and scaler saved successfully!")
