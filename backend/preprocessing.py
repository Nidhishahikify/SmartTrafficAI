import os
import pandas as pd

# ==================================================
# File Paths
# ==================================================

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

RAW_DATA_PATH = os.path.join(
    BASE_DIR,
    "data",
    "raw",
    "Pangyo_14days_lanes_w_arith_adj.csv"
)

PROCESSED_DIR = os.path.join(
    BASE_DIR,
    "data",
    "processed"
)

PROCESSED_DATA_PATH = os.path.join(
    PROCESSED_DIR,
    "traffic_cleaned.csv"
)

# ==================================================
# Load Dataset
# ==================================================

def load_dataset():

    print("=" * 50)
    print("Loading Dataset...")
    print("=" * 50)

    df = pd.read_csv(RAW_DATA_PATH)

    print(f"Dataset Loaded Successfully!")
    print(f"Rows : {df.shape[0]}")
    print(f"Columns : {df.shape[1]}")

    return df


# ==================================================
# Basic Cleaning
# ==================================================

def clean_dataset(df):

    print("\nCleaning Dataset...")

    # Remove duplicates
    duplicates = df.duplicated().sum()

    print(f"Duplicate Rows : {duplicates}")

    df = df.drop_duplicates()

    # Missing Values
    print("\nMissing Values")

    print(df.isnull().sum())

    # Fill numeric missing values
    numeric_columns = df.select_dtypes(include="number").columns

    df[numeric_columns] = df[numeric_columns].fillna(
        df[numeric_columns].median()
    )

    # Fill object columns
    object_columns = df.select_dtypes(include="object").columns

    for col in object_columns:
        df[col] = df[col].fillna("Unknown")

    return df


# ==================================================
# Date Features
# ==================================================

def create_datetime_features(df):

    if "date" not in df.columns:
        print("\nNo date column found.")
        return df

    print("\nCreating Date Features...")

    df["date"] = pd.to_datetime(df["date"])

    df["Year"] = df["date"].dt.year
    df["Month"] = df["date"].dt.month
    df["Day"] = df["date"].dt.day
    df["Hour"] = df["date"].dt.hour
    df["Minute"] = df["date"].dt.minute
    df["DayOfWeek"] = df["date"].dt.dayofweek

    return df


# ==================================================
# Save Dataset
# ==================================================

def save_dataset(df):

    os.makedirs(PROCESSED_DIR, exist_ok=True)

    df.to_csv(PROCESSED_DATA_PATH, index=False)

    print("\nCleaned dataset saved successfully!")

    print(PROCESSED_DATA_PATH)


# ==================================================
# Main
# ==================================================

def main():

    df = load_dataset()

    df = clean_dataset(df)

    df = create_datetime_features(df)

    save_dataset(df)

    print("\nPreprocessing Completed Successfully!")

    print("\nFinal Shape :", df.shape)


if __name__ == "__main__":
    main()