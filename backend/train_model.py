import os
import joblib

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==================================================
# File Paths
# ==================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

BACKEND_DIR = os.path.join(BASE_DIR, "backend")

PROCESSED_DATA_PATH = os.path.join(
    BACKEND_DIR,
    "processed_data.pkl"
)

MODEL_PATH = os.path.join(
    BACKEND_DIR,
    "model.pkl"
)

# ==================================================
# Load Processed Data
# ==================================================

print("=" * 50)
print("Loading Processed Data...")
print("=" * 50)

data = joblib.load(PROCESSED_DATA_PATH)

X_train = data["X_train"]
X_test = data["X_test"]
y_train = data["y_train"]
y_test = data["y_test"]

print("Processed data loaded successfully!")

# ==================================================
# Train Model
# ==================================================

print("\nTraining Random Forest Model...")

model = RandomForestClassifier(
    n_estimators=200,
    max_depth=15,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Training Completed!")

# ==================================================
# Prediction
# ==================================================

print("\nMaking Predictions...")

y_pred = model.predict(X_test)

# ==================================================
# Evaluation
# ==================================================

accuracy = accuracy_score(y_test, y_pred)

print("\n==============================")
print(f"Accuracy : {accuracy * 100:.2f}%")
print("==============================")

print("\nClassification Report:\n")

print(classification_report(y_test, y_pred))

print("\nConfusion Matrix:\n")

print(confusion_matrix(y_test, y_pred))

# ==================================================
# Save Model
# ==================================================

joblib.dump(model, MODEL_PATH)

print("\nModel Saved Successfully!")

print(MODEL_PATH)