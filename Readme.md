# 🔥 Safety Equipment Detection Using YOLO (7-Class Model)
### **Team: Byte_Coders**
**Members:**  
- **Shinjan Saha**  
- **Satyabrata Das Adhikari**  
- **Sayan Sk**

This project was developed for the **Duality AI/ML Challenge** as part of the **Cosmohack1 Hackathon**.  
The goal is to detect critical safety equipment (Oxygen Tanks, Fire Alarms, Fire Extinguishers, First Aid Boxes, etc.) using a YOLO-based model trained on a 7-class dataset provided by Duality.

---

# 📌 1. Project Overview
This repository contains the full pipeline for training, evaluating, and running predictions using a YOLOv8 model.  
The system is robust to:

- Occlusion  
- Poor lighting  
- Cluttered industrial environments  

The model outputs bounding boxes, class labels, and confidence scores for **7 object categories**.

---

# ⚙️ 2. Environment Setup

### **Recommended Python Version**
Python 3.8 – 3.10
(⚠️ YOLOv8 does not support Python 3.12 yet)

### **Install Dependencies**
`pip install -r requirements.txt`

Typical requirements include:
- flask
- flask-cors
- ultralytics
- opencv-python
- torch
- torchvision
- numpy
- Pillow

---

# 🔁 3. How to Reproduce Final Results

## **Step 1 — Download the Dataset**
Download the training + validation + test datasets from:  🔗[Dataset link](https://falcon.duality.ai/secure/documentation/7-class-hackathon&utm_source=hackathon&utm_medium=instructions&utm_campaign=cosmohack1)

Place the datasets in the **root folder** of the project.

Example structure:
```
project/
├── train_2/
│ ├── train2/images
│ ├── train2/labels
│ ├── val2/images
│ └──val2/labels
├── test1/
│ ├── images
│ └──labels
├── yolo_params.yaml
```

---

## **Step 2 — Update `yolo_params.yaml` Paths**
```
train: train_2/train2/images
val: train_2/val2/images
test: test1/images
```

These augmentations replicate our final training setup for improved robustness.

## **Step 3 — Train the Model (40 Epochs)**

Run the custom `train.py` script:

`python train.py --epochs 40`

Our training script uses:
- YOLOv8s
- Image size 832
- Batch size 4
- Mosaic augmentation (0.4)
- AdamW optimizer
- Learning rate 1e-4

## **Step 4 — View Training Results**
YOLO automatically creates training outputs in:

runs/detect/train/
Inside this folder, you will find:

📊 Graphs
results.png (loss curves, precision, recall, mAP)
```
BoxF1_curve.png
BoxPR_curve.png
BoxP_curve.png
BoxR_curve.png
results.csv
```

🧠 Model Weights
```
best.pt
last.pt
```

## **Step 5 — Run Single Image Prediction**
Edit the paths in `predict.py`:
```
MODEL_PATH = "runs/detect/train/weights/best.pt"
IMAGE_PATH = "test1/images/000000007_dark_clutter.png"
OUTPUT_DIR = "predictions"
CONFIDENCE = 0.5
```
Run:
`python predict.py`

Outputs will be saved in:
```
predictions/images/
predictions/labels/
```

Example console output:
```
Detected 4 objects:
 - OxygenTank (96%)
 - FireAlarm (92%)
 - NitrogenTank (88%)
 - FireExtinguisher (90%)
```

---

# 🚀 4. Testing the Model on the Full Test Set `predict2.py`
Run the automated batch-testing script: `python predict2.py`

This script:
- Auto-detects the correct best.pt
- Reads the test path from yolo_params.yaml
- Runs inference on every image in test1/images
- Saves outputs to:
```
predictions2/images/
predictions2/labels/
```
Example output:
```
✓ 000000314.png: Detected 3 objects
✓ 000000315.png: No objects detected
.
.
.
============================================================
PREDICTION COMPLETE
============================================================
✓ Processed 300 image(s)
✓ Annotated images saved in: predictions2/images
✓ Labels saved in: predictions2/labels
```

If `RUN_VALIDATION = True`, the script automatically runs:

`model.val(data=yolo_params.yaml, split="test")`

This prints:
- mAP50
- mAP50-95
- Precision
- Recall
- Confusion matrix


---

# 📁 5. Project Structure
```
├── train.py
├── predict.py
├── predict2.py
├── yolo_params.yaml
├── requirements.txt
├── runs/
├── predictions/
├── predictions2/
├── train_2/
├── test1/
└── README.md
```

---

# 📤 6. Expected Outputs & Interpretation
Annotated Predictions (Images) saved to:
```
predictions/images/
predictions2/images/
```

Each image contains:

✔️ Bounding boxes

✔️ Class labels

✔️ Confidence values

✔️ YOLO Label Files

Saved to:
```
predictions/labels/
predictions2/labels/
```

Metric Files:
```
runs/detect/train*/results.csv
runs/detect/train*/results.png
```

Use these to interpret:
- Precision
- Recall
- mAP 50 and mAP 50-95
- Convergence behavior

---

# 📬 Interested in a Similar Project?

I build smart, ML-integrated applications and responsive web platforms. Let’s build something powerful together!

📧 shinjansaha00@gmail.com

🔗 [LinkedIn Profile](https://www.linkedin.com/in/shinjan-saha-1bb744319/)