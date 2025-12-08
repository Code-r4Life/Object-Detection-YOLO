import os
import cv2
import base64
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from ultralytics import YOLO
from pathlib import Path

app = Flask(__name__)
CORS(app)

# Configuration
# Adjust path to point to the model relative to backend folder or absolute path
# Assuming runs/detect/train/weights/best.pt is in the parent directory of backend
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "runs" / "detect" / "train" / "weights" / "best.pt"

print(f"Loading model from: {MODEL_PATH}")
try:
    model = YOLO(str(MODEL_PATH))
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "model_loaded": model is not None})

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    try:
        # Read image
        file_bytes = np.frombuffer(file.read(), np.uint8)
        img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image"}), 400

        # Run prediction
        results = model.predict(img, conf=0.5)
        result = results[0]

        # Process detections
        detections = []
        for box in result.boxes:
            cls_id = int(box.cls[0])
            class_name = model.names[cls_id]
            conf = float(box.conf[0])
            x, y, w, h = box.xywh[0].tolist() # xywh format
            
            detections.append({
                "class": class_name,
                "confidence": conf,
                "bbox": [x, y, w, h]
            })

        # Generate annotated image
        annotated_img = result.plot()
        
        # Encode image to base64
        _, buffer = cv2.imencode('.jpg', annotated_img)
        img_base64 = base64.b64encode(buffer).decode('utf-8')

        return jsonify({
            "detections": detections,
            "image": f"data:image/jpeg;base64,{img_base64}",
            "summary": f"Detected {len(detections)} objects"
        })

    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
