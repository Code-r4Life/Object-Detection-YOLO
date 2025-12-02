from ultralytics import YOLO
import cv2
from pathlib import Path
import os
import yaml

# ==================== CONFIGURATION - CHANGE THESE ====================
# Leave these as None to use automatic detection from yolo_params.yaml
MODEL_PATH = None  # Set to specific path or None for auto-detection
IMAGE_PATH = None  # Set to specific path or None to use yaml config
OUTPUT_DIR = "predictions2"
CONFIDENCE = 0.5
RUN_VALIDATION = True  # Set to False to skip validation after predictions
# ======================================================================


def predict_and_save(model, image_path, output_path_img, output_path_txt, conf_threshold=0.5, verbose=True):
    """
    Predict on a single image and save results.
    """
    # Perform prediction
    results = model.predict(image_path, conf=conf_threshold, verbose=False)
    result = results[0]
    
    # Draw boxes on the image
    annotated_img = result.plot()
    
    # Save the annotated image
    cv2.imwrite(str(output_path_img), annotated_img)
    
    # Save labels in YOLO format
    with open(output_path_txt, 'w') as f:
        for box in result.boxes:
            cls_id = int(box.cls[0])  # Fixed bug: extract scalar from tensor
            x_center, y_center, width, height = box.xywhn[0].tolist()
            f.write(f"{cls_id} {x_center:.6f} {y_center:.6f} {width:.6f} {height:.6f}\n")
    
    # Print results if verbose
    if verbose and len(result.boxes) > 0:
        print(f"  ✓ {image_path.name}: Detected {len(result.boxes)} objects")
        for box in result.boxes:
            cls_id = int(box.cls[0])
            conf = float(box.conf[0])
            class_name = model.names[cls_id]
            print(f"    - {class_name} ({conf:.2%})")
    elif verbose:
        print(f"  ✓ {image_path.name}: No objects detected")


def select_model_path(this_dir):
    """
    Auto-detect training folders and let user select if multiple exist.
    """
    detect_path = this_dir / "runs" / "detect"
    
    if not detect_path.exists():
        raise ValueError(f"Detection path {detect_path} does not exist")
    
    train_folders = [f for f in os.listdir(detect_path) 
                     if os.path.isdir(detect_path / f) and f.startswith("train")]
    
    if len(train_folders) == 0:
        raise ValueError("No training folders found in runs/detect/")
    
    idx = 0
    if len(train_folders) > 1:
        print("\n" + "="*60)
        print("Multiple training folders found. Select one:")
        print("="*60)
        for i, folder in enumerate(train_folders):
            print(f"  {i}: {folder}")
        
        choice = -1
        choices = list(range(len(train_folders)))
        while choice not in choices:
            choice = input("\nEnter number: ")
            if not choice.isdigit():
                choice = -1
            else:
                choice = int(choice)
                if choice not in choices:
                    print(f"Invalid choice. Please enter a number between 0 and {len(train_folders)-1}")
        idx = choice
    
    model_path = detect_path / train_folders[idx] / "weights" / "best.pt"
    
    if not model_path.exists():
        raise ValueError(f"Model file not found at {model_path}")
    
    return model_path


def get_images_directory(this_dir):
    """
    Get images directory from yolo_params.yaml
    """
    yaml_path = this_dir / 'yolo_params.yaml'
    
    if not yaml_path.exists():
        raise ValueError(f"yolo_params.yaml not found at {yaml_path}")
    
    with open(yaml_path, 'r') as file:
        data = yaml.safe_load(file)
        
        if 'test' not in data or data['test'] is None:
            raise ValueError("No 'test' field found in yolo_params.yaml. Please add the test field with the path to test images")
        
        images_dir = Path(data['test']) / 'images'
    
    # Validate images directory
    if not images_dir.exists():
        raise ValueError(f"Images directory {images_dir} does not exist")
    
    if not images_dir.is_dir():
        raise ValueError(f"Images directory {images_dir} is not a directory")
    
    if not any(images_dir.iterdir()):
        raise ValueError(f"Images directory {images_dir} is empty")
    
    return images_dir


if __name__ == '__main__':
    this_dir = Path(__file__).parent
    os.chdir(this_dir)
    
    print("="*60)
    print("YOLO PREDICTION SCRIPT")
    print("="*60)
    
    # Determine model path
    if MODEL_PATH is None:
        print("\n📂 Auto-detecting model...")
        model_path = select_model_path(this_dir)
    else:
        model_path = Path(MODEL_PATH)
        if not model_path.exists():
            raise ValueError(f"Specified model path does not exist: {MODEL_PATH}")
    
    print(f"✓ Using model: {model_path}")
    
    # Load model
    print("\n🔄 Loading model...")
    model = YOLO(model_path)
    print("✓ Model loaded successfully")
    
    # Determine images to process
    if IMAGE_PATH is None:
        print("\n📂 Reading images from yolo_params.yaml...")
        images_dir = get_images_directory(this_dir)
        image_paths = [img for img in images_dir.glob('*') 
                      if img.suffix.lower() in ['.png', '.jpg', '.jpeg']]
    else:
        img_path = Path(IMAGE_PATH)
        if not img_path.exists():
            raise ValueError(f"Specified image path does not exist: {IMAGE_PATH}")
        image_paths = [img_path]
    
    if len(image_paths) == 0:
        raise ValueError("No valid images found to process")
    
    print(f"✓ Found {len(image_paths)} image(s) to process")
    
    # Create output directories
    output_path = Path(OUTPUT_DIR)
    images_output_dir = output_path / 'images'
    labels_output_dir = output_path / 'labels'
    images_output_dir.mkdir(parents=True, exist_ok=True)
    labels_output_dir.mkdir(parents=True, exist_ok=True)
    
    # Process images
    print(f"\n🔍 Running predictions (confidence threshold: {CONFIDENCE})...")
    print("="*60)
    
    for img_path in image_paths:
        output_path_img = images_output_dir / img_path.name
        output_path_txt = labels_output_dir / img_path.with_suffix('.txt').name
        predict_and_save(model, img_path, output_path_img, output_path_txt, 
                        conf_threshold=CONFIDENCE, verbose=True)
    
    # Summary
    print("="*60)
    print("PREDICTION COMPLETE")
    print("="*60)
    print(f"✓ Processed {len(image_paths)} image(s)")
    print(f"✓ Annotated images saved in: {images_output_dir}")
    print(f"✓ Labels saved in: {labels_output_dir}")
    
    # Run validation if enabled
    if RUN_VALIDATION:
        yaml_path = this_dir / 'yolo_params.yaml'
        if yaml_path.exists():
            print("\n🔄 Running model validation on test set...")
            print("="*60)
            metrics = model.val(data=yaml_path, split="test")
            print("="*60)
            print("✓ Validation complete")
        else:
            print("\n⚠ Skipping validation: yolo_params.yaml not found")
    
    print("\n✅ All done!")
    print("="*60 + "\n")