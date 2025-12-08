from ultralytics import YOLO
import cv2
from pathlib import Path

# ==================== CONFIGURATION - CHANGE THESE ====================
MODEL_PATH = "runs/detect/train/weights/best.pt"  # Your model path
IMAGE_PATH = "test1/images/000000007_dark_clutter.png"                       # Your image to predict
OUTPUT_DIR = "predictions"                          # Where to save results
CONFIDENCE = 0.5                                    # Confidence threshold (0.0 to 1.0)
# ======================================================================


def predict_single_image(model_path, image_path, output_dir, conf_threshold=0.5):
    """
    Simple function to predict on a single image.
    """
    # Load model
    print(f"Loading model from: {model_path}")
    model = YOLO(model_path)
    
    # Check if image exists
    img_path = Path(image_path)
    if not img_path.exists():
        print(f"❌ Error: Image not found at {image_path}")
        return
    
    # Create output directories
    output_path = Path(output_dir)
    images_dir = output_path / 'images'
    labels_dir = output_path / 'labels'
    images_dir.mkdir(parents=True, exist_ok=True)
    labels_dir.mkdir(parents=True, exist_ok=True)
    
    # Run prediction
    print(f"\nPredicting on: {img_path.name}")
    results = model.predict(image_path, conf=conf_threshold, verbose=False)
    result = results[0]
    
    # Save annotated image
    annotated_img = result.plot()
    output_img_path = images_dir / img_path.name
    cv2.imwrite(str(output_img_path), annotated_img)
    
    # Save labels in YOLO format
    output_txt_path = labels_dir / img_path.with_suffix('.txt').name
    with open(output_txt_path, 'w') as f:
        for box in result.boxes:
            cls_id = int(box.cls[0])
            x_center, y_center, width, height = box.xywhn[0].tolist()
            f.write(f"{cls_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n")
    
    # Print results
    print("\n" + "="*60)
    print("RESULTS")
    print("="*60)
    print(f"✓ Detected {len(result.boxes)} objects:")
    
    for i, box in enumerate(result.boxes, 1):
        cls_id = int(box.cls[0])
        conf = float(box.conf[0])
        class_name = model.names[cls_id]
        print(f"  {i}. {class_name} (confidence: {conf:.2%})")
    
    print(f"\n✓ Annotated image saved: {output_img_path}")
    print(f"✓ Labels saved: {output_txt_path}")
    print("="*60 + "\n")


if __name__ == '__main__':
    # Run prediction
    predict_single_image(
        model_path=MODEL_PATH,
        image_path=IMAGE_PATH,
        output_dir=OUTPUT_DIR,
        conf_threshold=CONFIDENCE
    )