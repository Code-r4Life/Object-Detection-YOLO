import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Zap,
  Shield,
  Eye,
  Activity,
  Layers,
  Box,
} from "lucide-react";
import { motion } from "framer-motion";
import Card from "../components/ui/Card";

const Home = () => {
  return (
    <div className="space-y-32 py-20">
      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-extrabold tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              Next-Gen
            </span>
            <br />
            <span className="text-white">Object Detection</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400 max-w-lg"
          >
            Experience the power of real-time AI object detection. Fast,
            accurate, and seamless integration for your security and analytics
            needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <Link
              to="/detection"
              className="group px-8 py-4 bg-primary hover:bg-blue-600 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Detecting
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:-rotate-45"
              />
            </Link>
          </motion.div>
        </div>

        {/* Hero Window Effect */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-30 animate-pulse-slow"></div>
          <div className="relative bg-[#1e1e1e] rounded-xl border border-white/10 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <div className="ml-4 px-3 py-1 bg-black/20 rounded-md text-xs text-gray-400 font-mono">
                detection_preview.py
              </div>
            </div>
            {/* Window Content */}
            <div className="p-4">
              <div className="relative rounded-lg overflow-hidden aspect-video bg-black/50">
                {/* Using an image from the predictions folder. 
                    Note: In a real Vite app, we'd need to import this or put it in public. 
                    For this environment, I'll assume I can copy it to public or import it.
                    I'll use a relative path assuming the file structure allows it or I'll copy it.
                */}
                <img
                  src="/hero-image.png"
                  alt="Detection Preview"
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />

                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-lg border border-white/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Processing Time</span>
                    <span className="text-green-400 font-mono">12ms</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-300">Objects Detected</span>
                    <span className="text-blue-400 font-mono">8</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Advanced Capabilities
          </h2>
          <p className="text-gray-400">
            Everything you need for powerful object detection
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Zap className="text-yellow-400" />}
            title="Live Detection"
            description="Real-time processing of video streams with minimal latency."
          />
          <FeatureCard
            icon={<Activity className="text-blue-400" />}
            title="Smart Analytics"
            description="Detailed insights and confidence scores for every detection."
          />
          <FeatureCard
            icon={<Layers className="text-purple-400" />}
            title="Visual Overlay"
            description="Clean, accurate bounding boxes and labels drawn directly on images."
          />
          <FeatureCard
            icon={<Eye className="text-green-400" />}
            title="Precision Mode"
            description="High-accuracy configuration for critical detection tasks."
          />
          <FeatureCard
            icon={<Box className="text-orange-400" />}
            title="Pretrained Model"
            description="Powered by the state-of-the-art YOLOv8 architecture."
          />
          <FeatureCard
            icon={<Shield className="text-red-400" />}
            title="Secure Processing"
            description="Enterprise-grade security for your data and images."
          />
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <Card className="hover:bg-white/10 transition-colors group cursor-pointer">
    <div className="mb-4 p-3 bg-white/5 rounded-lg w-fit group-hover:scale-110 transition-transform">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </Card>
);

export default Home;
