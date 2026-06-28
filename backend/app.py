# FastAPI/Flask entry point
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from predict import predict_congestion
from recommendation import generate_recommendation
app = FastAPI(
    title="SmartTrafficAI API",
    version="1.0",
    description="Traffic Congestion Prediction API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TrafficInput(BaseModel):
    data: dict


@app.get("/")
def home():
    return {
        "message": "Welcome to SmartTrafficAI 🚦",
        "status": "Running"
    }


@app.post("/predict")
def predict(input: TrafficInput):

    result = predict_congestion(input.data)

    recommendation = generate_recommendation(
        result["prediction"],
        result["confidence"]
    )

    return recommendation