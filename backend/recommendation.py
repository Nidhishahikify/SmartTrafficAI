def generate_recommendation(prediction, confidence):
    """
    Generate recommendations based on congestion prediction.
    """

    result = {
        "prediction": prediction,
        "confidence": f"{confidence:.2f}%"
    }

    if prediction == "Low Congestion":

        result["traffic_status"] = "Traffic is flowing smoothly."

        result["recommendations"] = [
            "No immediate action required.",
            "Continue monitoring traffic conditions.",
            "Maintain current signal timing."
        ]

    elif prediction == "Medium Congestion":

        result["traffic_status"] = "Moderate traffic detected."

        result["recommendations"] = [
            "Monitor traffic continuously.",
            "Increase green signal duration slightly.",
            "Inform drivers about moderate delays."
        ]

    else:

        result["traffic_status"] = "Heavy traffic congestion detected."

        result["recommendations"] = [
            "Increase green signal duration.",
            "Suggest alternate routes.",
            "Deploy traffic police if required.",
            "Notify nearby drivers.",
            "Restrict heavy vehicle movement during peak hours."
        ]

    return result


# ============================================
# Testing
# ============================================

if __name__ == "__main__":

    sample_prediction = "High Congestion"

    sample_confidence = 96.48

    response = generate_recommendation(
        sample_prediction,
        sample_confidence
    )

    print("\nRecommendation\n")

    print(response)