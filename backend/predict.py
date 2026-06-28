import os
import joblib
import pandas as pd

# =====================================
# Paths
# =====================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")

MODEL_PATH = os.path.join(BACKEND_DIR, "model.pkl")
SCALER_PATH = os.path.join(BACKEND_DIR, "scaler.pkl")
FEATURES_PATH = os.path.join(BACKEND_DIR, "feature_columns.pkl")

# =====================================
# Load Artifacts
# =====================================

print("Loading model...")

model = joblib.load(MODEL_PATH)
scaler = joblib.load(SCALER_PATH)
feature_columns = joblib.load(FEATURES_PATH)

print("Model Loaded Successfully!")

# =====================================
# Prediction Function
# =====================================

def predict_congestion(input_data: dict):

    # Create DataFrame
    df = pd.DataFrame([input_data])

    # Ensure all required columns exist
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0

    # Keep only training columns in the same order
    df = df[feature_columns]

    # Scale
    scaled = scaler.transform(df)

    # Prediction
    prediction = model.predict(scaled)[0]

    # Confidence
    probability = model.predict_proba(scaled).max() * 100

    labels = {
        0: "Low Congestion",
        1: "Medium Congestion",
        2: "High Congestion"
    }

    return {
        "prediction": labels[prediction],
        "confidence": round(probability, 2)
    }


# =====================================
# Example
# =====================================

if __name__ == "__main__":

    sample = {}

    # Fill every feature with 0
    for feature in feature_columns:
        sample[feature] = 0

    # Override a few values
    sample["Hour"] = 8
    sample["Day"] = 5
    sample["Month"] = 7

    # Vehicle counts
    for feature in feature_columns:
        if feature.startswith("VEHS"):
            sample[feature] = 120

        elif feature.startswith("SPEED"):
            sample[feature] = 65

        elif feature.startswith("QUEUE"):
            sample[feature] = 5

        elif feature.startswith("OCCUP"):
            sample[feature] = 40

    result = predict_congestion(sample)

    print("\nPrediction Result")
    print(result)