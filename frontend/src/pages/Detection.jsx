import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Camera, Upload, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { BentoGrid, BentoGridItem } from '../components/ui/BentoGrid';
import { motion } from 'framer-motion';

const Detection = () => {
  const [mode, setMode] = useState('upload'); // 'upload' or 'camera'
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [resultImage, setResultImage] = useState(null);
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResultImage(null);
      setDetections([]);
      setError(null);
    }
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setError(null);
    } catch (err) {
      setError("Could not access camera. Please allow permissions.");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResultImage(null);
        setDetections([]);
        stopCamera();
        setMode('preview');
      }, 'image/jpeg');
    }
  };

  const handleDetect = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setResultImage(response.data.image);
      setDetections(response.data.detections);
    } catch (err) {
      setError("Detection failed. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setResultImage(null);
    setDetections([]);
    setError(null);
    if (mode === 'camera' || mode === 'preview') {
      setMode('camera');
      startCamera();
    }
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Object Detection Studio
        </h1>
        <p className="text-gray-400 mt-2">Upload an image or use your camera to detect objects in real-time.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Controls */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-white mb-6">Input Source</h3>
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => { setMode('upload'); stopCamera(); }}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  mode === 'upload' 
                    ? 'bg-primary text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Upload className="inline-block mr-2" size={18} /> Upload
              </button>
              <button
                onClick={() => { setMode('camera'); startCamera(); }}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                  mode === 'camera' || mode === 'preview'
                    ? 'bg-primary text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                <Camera className="inline-block mr-2" size={18} /> Camera
              </button>
            </div>

            {mode === 'upload' && !previewUrl && (
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-10 h-10 mb-4 text-gray-500" />
                  <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span></p>
                  <p className="text-xs text-gray-500">JPG, PNG (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}

            {mode === 'camera' && (
               <div className="flex flex-col gap-4">
                  <button
                    onClick={captureImage}
                    className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-colors shadow-lg shadow-red-500/20"
                  >
                    Capture Photo
                  </button>
               </div>
            )}

            {(previewUrl || resultImage) && (
               <div className="space-y-4">
                  <button
                    onClick={handleDetect}
                    disabled={loading || resultImage}
                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-500/20 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin mr-2" /> Detecting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="mr-2" /> {resultImage ? 'Detection Complete' : 'Start Detection'}
                      </>
                    )}
                  </button>
                  <button
                    onClick={reset}
                    className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-colors"
                  >
                    Reset / New Image
                  </button>
               </div>
            )}
          </div>
        </div>

        {/* Right Column: Viewport */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-1 h-[600px] flex items-center justify-center relative overflow-hidden">
             {/* Grid Background */}
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
             
             {error && (
                <div className="absolute top-4 left-4 right-4 z-10 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center">
                   <AlertCircle className="mr-2" /> {error}
                </div>
             )}

             {mode === 'camera' && (
                <div className="relative w-full h-full flex items-center justify-center">
                   <video ref={videoRef} autoPlay playsInline className="max-w-full max-h-full rounded-lg shadow-2xl" />
                   <canvas ref={canvasRef} className="hidden" />
                </div>
             )}

             {(mode === 'upload' || mode === 'preview') && previewUrl && (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                   <img 
                      src={resultImage || previewUrl} 
                      alt="Preview" 
                      className="max-w-full max-h-full rounded-lg shadow-2xl object-contain" 
                   />
                   {loading && (
                      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-lg z-20">
                         <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
                         <p className="text-xl font-bold text-white animate-pulse">Analyzing Image...</p>
                      </div>
                   )}
                </div>
             )}

             {!previewUrl && mode !== 'camera' && (
                <div className="text-center text-gray-500">
                   <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload size={32} />
                   </div>
                   <p className="text-lg">No image selected</p>
                </div>
             )}
          </div>
        </div>
      </div>

      {/* Results Box */}
      {detections.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center">
             <CheckCircle className="mr-2 text-emerald-500" /> Detection Results
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
             <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
                <p className="text-gray-400 text-sm mb-1">Total Objects</p>
                <p className="text-3xl font-bold text-white">{detections.length}</p>
             </div>
             {detections.map((det, index) => (
                <div key={index} className="bg-white/5 p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                   <p className="text-emerald-400 font-bold capitalize truncate" title={det.class}>{det.class}</p>
                   <div className="w-full bg-white/10 rounded-full h-1.5 mt-3">
                      <div 
                         className="bg-emerald-500 h-1.5 rounded-full" 
                         style={{ width: `${det.confidence * 100}%` }}
                      ></div>
                   </div>
                   <p className="text-right text-xs text-gray-400 mt-1">{(det.confidence * 100).toFixed(0)}%</p>
                </div>
             ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Detection;
