from flask import Flask, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load ensemble models and label encoder
try:
    model_container = joblib.load("predicted_model.pkl")  # Dictionary of models
    scaler = joblib.load("scaler.pkl")  # Load the scaler used during training
    label_encoder = joblib.load("label_encoder.pkl")  # Label encoder
    print("Models and encoders loaded successfully.")
except FileNotFoundError as e:
    print(f"Error loading model files: {e}. Make sure 'predicted_model.pkl', 'scaler.pkl', and 'label_encoder.pkl' are in the correct directory.")



# Ordered list of all symptoms used during training (case-sensitive)
all_symptoms = [
    "Pimples", "Blackheads", "Whiteheads", "Pustules", "Cysts",
    "Rough Skin", "Scaly Patches", "Itching", "Burning", "Cracked Skin",
    "Inflamed Skin", "Oozing", "Thickened Skin", "Blisters", "Redness",
    "Swelling", "Pain", "Oozing.1", "Warmth", "Fever", "Dryness", "Scaling",
    "Hives", "Ulcers", "Fatigue", "Joint Pain", "Hair Loss", "Asymmetry",
    "Irregular Color", "Diameter Changes", "Evolving", "Rash", "Pitting",
    "Joint Issues", "Growth", "Lump", "Color Change", "Circular Rash",
    "Raised Skin", "Clearing", "Welts", "Blanching", "Red", "Purple",
    "Varied Growth"
]

# MongoDB connection
try:
    client = MongoClient("mongodb://localhost:27017/")
    db = client["skin-disease-detection"]
    collection = db["textanalyses"]
    # Test the connection
    client.admin.command('ping')
    print("Connected to MongoDB successfully!")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    # Consider exiting if database connection is essential
    # import sys
    # sys.exit(1)

@app.route("/predict", methods=["GET"])
def predict():
    # Fetch latest symptoms from MongoDB
    try:
        latest_doc = collection.find_one(sort=[("createdAt", -1)])
        if not latest_doc or "symptoms" not in latest_doc:
            return jsonify({"error": "No recent scan data found in MongoDB."}), 404

        symptoms = latest_doc["symptoms"]

        # Create symptom dictionary: 1 if present, else 0
        symptom_dict = {symptom: 1 if symptom in symptoms else 0 for symptom in all_symptoms}
        symptom_input_df = pd.DataFrame([symptom_dict])

        # Scale the input
        try:
            symptom_input_scaled = scaler.transform(symptom_input_df)
        except Exception as e:
            return jsonify({"error": f"Error during scaling: {e}"}), 500

        # Ensemble prediction
        try:
            predictions = [model.predict(symptom_input_scaled)[0] for model in model_container.values()]
            majority_vote = max(set(predictions), key=predictions.count)
        except Exception as e:
            return jsonify({"error": f"Error during prediction: {e}"}), 500

        # Decode label if needed
        try:
            prediction = label_encoder.inverse_transform([majority_vote])[0]
            print(f"Predicted disease: {prediction}")
            return jsonify({"prediction": prediction})
        except Exception as e:
            return jsonify({"error": f"Error decoding prediction: {e}"}), 500

    except Exception as e:
        return jsonify({"error": f"Error processing prediction request: {e}"}), 500

if __name__ == "__main__":
    print("Starting Flask development server...")
    app.run(debug=True) 