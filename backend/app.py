from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# .\.venv\Scripts\activate
# use this command to actiavte the venv environment

# Load ensemble models and label encoder
model_container = joblib.load("predicted_model.pkl")  # Dictionary of models
scaler = joblib.load("scaler.pkl")  # Load the scaler used during training
label_encoder = joblib.load("label_encoder.pkl")  # Label encoder

# Ordered list of all symptoms used during training (case-sensitive)
all_symptoms = [
    "Pimples", "Blackheads", "Whiteheads", "Pustules", "Cysts",
    "Rough Skin", "Scaly Patches", "Itching", "Burning", "Cracked Skin",
    "Inflamed Skin", "Oozing", "Thickened Skin", "Blisters", "Redness",
    "Swelling", "Pain", "Warmth", "Dryness", "Scaling", "Hives", "Ulcers",
    "Joint Pain", "Hair Loss", "Asymmetry", "Irregular Color",
    "Diameter Changes", "Evolving", "Pitting", "Joint Issues", "Growth",
    "Lump", "Color Change", "Circular Rash", "Raised Skin", "Clearing",
    "Welts", "Blanching", "Red", "Purple", "Varied Growth"
]

# MongoDB connection
client = MongoClient("mongodb://localhost:27017/")
db = client["skin-disease-detection"]
collection = db["textanalyses"]

@app.route("/predict", methods=["GET"])
def predict():
    # Fetch latest symptoms from MongoDB
    latest_doc = collection.find_one(sort=[("createdAt", -1)])
    if not latest_doc or "symptoms" not in latest_doc:
        return jsonify({"error": "No recent scan data found."}), 404

    symptoms = latest_doc["symptoms"]

    # Create symptom dictionary: 1 if present, else 0
    symptom_dict = {symptom: 1 if symptom in symptoms else 0 for symptom in all_symptoms}
    symptom_input_df = pd.DataFrame([symptom_dict])

    # Scale the input
    symptom_input_scaled = scaler.transform(symptom_input_df)

    # Ensemble prediction
    predictions = [model.predict(symptom_input_scaled)[0] for model in model_container.values()]
    majority_vote = max(set(predictions), key=predictions.count)

    # Decode label if needed
    prediction = label_encoder.inverse_transform([majority_vote])[0]

    return jsonify({
        "prediction": prediction,
        # "userId": str(latest_doc["_id"]),
        # "symptoms": symptoms
    })

    # # Fetch latest symptoms from MongoDB
    # latest_doc = collection.find().sort("createdAt", -1).limit(1)[0]

    # symptoms = latest_doc["symptoms"]

    # # Create symptom dictionary: 1 if present, else 0
    # symptom_dict = {symptom: 1 if symptom in symptoms else 0 for symptom in all_symptoms}
    # symptom_input_df = pd.DataFrame([symptom_dict])


    # # Scale the input
    # symptom_input_scaled = scaler.transform(symptom_input_df)

    # # Ensemble prediction
    # predictions = [model.predict(symptom_input_scaled)[0] for model in model_container.values()]
    # majority_vote = max(set(predictions), key=predictions.count)

    # # Decode label if needed
    # final_prediction = label_encoder.inverse_transform([majority_vote])[0]

    # return jsonify({"prediction": final_prediction})

if __name__ == "__main__":
    app.run(debug=True)
