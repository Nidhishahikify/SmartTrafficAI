import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# ==================================================
# File Paths
# ==================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

INPUT_PATH = os.path.join(
    BASE_DIR,
    "data",
    "processed",
    "traffic_cleaned.csv"
)

BACKEND_DIR = os.path.join(BASE_DIR, "backend")

SCALER_PATH = os.path.join(BACKEND_DIR, "scaler.pkl")
FEATURES_PATH = os.path.join(BACKEND_DIR, "feature_columns.pkl")
PROCESSED_DATA_PATH = os.path.join(BACKEND_DIR, "processed_data.pkl")

# ==================================================
# Load Dataset
# ==================================================

print("=" * 50)
print("Loading Cleaned Dataset...")
print("=" * 50)

df = pd.read_csv(INPUT_PATH)

print("Dataset Loaded Successfully")
print("Shape :", df.shape)

# ==================================================
# Select Features
# ==================================================

vehicle_cols = [c for c in df.columns if c.startswith("VEHS")]
speed_cols = [c for c in df.columns if c.startswith("SPEED")]
queue_cols = [c for c in df.columns if c.startswith("QUEUE")]
occupancy_cols = [c for c in df.columns if c.startswith("OCCUP")]

time_cols = []

for col in ["Hour", "Minute", "Day", "Month", "DayOfWeek"]:
    if col in df.columns:
        time_cols.append(col)

feature_columns = (
    vehicle_cols +
    speed_cols +
    queue_cols +
    occupancy_cols +
    time_cols
)

print("\nNumber of Features :", len(feature_columns))

joblib.dump(feature_columns, FEATURES_PATH)

print("Feature list saved!")

# ==================================================
# Create Target
# ==================================================

print("\nCreating Congestion Labels...")

df["AverageVehicles"] = df[vehicle_cols].mean(axis=1)

low = df["AverageVehicles"].quantile(0.33)
high = df["AverageVehicles"].quantile(0.66)


def get_congestion(avg):

    if avg <= low:
        return 0

    elif avg <= high:
        return 1

    else:
        return 2


df["Congestion"] = df["AverageVehicles"].apply(get_congestion)

print(df["Congestion"].value_counts())

# ==================================================
# Features & Target
# ==================================================

X = df[feature_columns]

y = df["Congestion"]

print("\nFeature Shape :", X.shape)
print("Target Shape :", y.shape)

# ==================================================
# Train Test Split
# ==================================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

print("\nTraining :", X_train.shape)
print("Testing  :", X_test.shape)

# ==================================================
# Scaling
# ==================================================

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

joblib.dump(scaler, SCALER_PATH)

print("\nScaler Saved")

# ==================================================
# Save Processed Data
# ==================================================

processed_data = {
    "X_train": X_train,
    "X_test": X_test,
    "y_train": y_train,
    "y_test": y_test,
    "feature_columns": feature_columns
}

joblib.dump(processed_data, PROCESSED_DATA_PATH)

print("\nProcessed Data Saved")

print("\nFeature Engineering Completed Successfully!")