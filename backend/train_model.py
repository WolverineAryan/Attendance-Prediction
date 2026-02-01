import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# load dataset
df = pd.read_csv("attendance_dataset.csv")

X = df[["attendance", "late", "leaves", "discipline"]]
y = df["risk"]

# train model
model = RandomForestClassifier(
    n_estimators=200,
    random_state=42
)

model.fit(X, y)

# save model
joblib.dump(model, "attendance_model.pkl")

print("✅ attendance_model.pkl created successfully")
