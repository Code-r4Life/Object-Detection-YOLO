EPOCHS = 10
MOSAIC = 0.4
OPTIMIZER = 'AdamW'
MOMENTUM = 0.9
LR0 = 0.0001
LRF = 0.0001
SINGLE_CLS = False  # MULTICLASS FIX ✔

import argparse
import ultralytics
import os

if __name__ == '__main__': 
    parser = argparse.ArgumentParser()

    parser.add_argument('--epochs', type=int, default=EPOCHS)
    parser.add_argument('--mosaic', type=float, default=MOSAIC)
    parser.add_argument('--optimizer', type=str, default=OPTIMIZER)
    parser.add_argument('--momentum', type=float, default=MOMENTUM)
    parser.add_argument('--lr0', type=float, default=LR0)
    parser.add_argument('--lrf', type=float, default=LRF)
    parser.add_argument('--single_cls', type=bool, default=SINGLE_CLS)

    args = parser.parse_args()
    
    this_dir = os.path.dirname(__file__)
    os.chdir(this_dir)

    model = ultralytics.YOLO("yolov8s.pt")

    results = model.train(
        data="yolo_params.yaml",
        epochs=args.epochs,
        batch=4,
        # device=0,
        single_cls=args.single_cls,  # MUST BE FALSE FOR MULTICLASS
        mosaic=args.mosaic,
        optimizer=args.optimizer,
        lr0=args.lr0,
        lrf=args.lrf,
        momentum=args.momentum,
    )
