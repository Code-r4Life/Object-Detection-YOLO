import React from "react";
import {
  Code,
  Database,
  Layout,
  Users,
  Linkedin,
  Github,
  Cpu,
  Brain,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

// Custom Icons
const ReactIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="-11.5 -10.23174 23 20.46348"
    className={className}
    fill="currentColor"
  >
    <circle cx="0" cy="0" r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const TailwindIcon = ({ size = 24, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
  >
    <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
  </svg>
);

const About = () => {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 space-y-20">
      {/* Hero Section - Redesigned */}
      <section className="grid lg:grid-cols-2 gap-12 items-end min-h-[60vh]">
        {/* Left: Mission Overview */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-12 flex flex-col justify-center h-full"
        >
          <div className="space-y-2">
            <h1 className="text-5xl font-bold text-white">
              About <span className="text-blue-500">ObjectDetect</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Advanced Object Detection Technology
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-white flex items-center">
              Mission Overview
            </h2>
            <p className="text-gray-400 leading-relaxed text-lg">
              ObjectDetect represents the next generation of visual analytics
              technology. Our mission is to enhance operational efficiency and
              safety through intelligent, real-time detection of critical
              objects in any environment.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              Using state-of-the-art{" "}
              <strong className="text-white">YOLOv8 object detection</strong>,
              our system can instantly identify and classify objects with high
              precision, providing crucial information for security, automation,
              and analytics.
            </p>
            <p className="text-gray-400 leading-relaxed text-lg">
              The project combines{" "}
              <strong className="text-white">advanced AI algorithms</strong>{" "}
              with an intuitive web interface, making it accessible to
              developers, researchers, and businesses alike.
            </p>
          </div>
        </motion.div>

        {/* Right: Feature Cards (Visual) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-8 flex flex-col justify-center h-fit"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Real-time Processing
              </h3>
              <p className="text-gray-400 text-sm">
                Instant object detection and classification
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10"></div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
              <Code size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                High Accuracy
              </h3>
              <p className="text-gray-400 text-sm">
                State-of-the-art machine learning models
              </p>
            </div>
          </div>

          <div className="h-px bg-white/10"></div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Secure & Private
              </h3>
              <p className="text-gray-400 text-sm">
                Enterprise-grade security and privacy
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Tech Stack Details */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Technology Stack
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <TechCard
            icon={<ReactIcon size={40} className="text-blue-400" />}
            name="React"
          />
          <TechCard
            icon={<TailwindIcon size={40} className="text-cyan-400" />}
            name="Tailwind CSS"
          />
          <TechCard
            icon={<Code size={40} className="text-white" />}
            name="Flask"
          />
          <TechCard
            icon={<Brain size={40} className="text-orange-400" />}
            name="YOLOv8"
          />
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-white">
          Meet The Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <TeamMember name="Shinjan Saha" role="Developer" linkedin="https://www.linkedin.com/in/shinjan-saha-1bb744319/" github="https://github.com/Code-r4Life/" />
          <TeamMember name="Satyabrata Das Adhikari" role="Developer" linkedin="https://www.linkedin.com/in/satyabrata-das-adhikari-1813a7324/" github="https://github.com/satya-py/" />
          <TeamMember name="Sayan Sk" role="Developer" linkedin="https://www.linkedin.com/in/sayan-sk-092203318/" github="https://github.com/Sayan474/" />
        </div>
      </section>
    </div>
  );
};

const TechCard = ({ icon, name }) => (
  <div className="flex flex-col items-center p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors">
    <div className="mb-4">{icon}</div>
    <span className="font-semibold text-gray-300">{name}</span>
  </div>
);

const TeamMember = ({ name, role, linkedin, github }) => (
  <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:transform hover:-translate-y-1 transition-all duration-300">
    <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white">
      {name.charAt(0)}
    </div>
    <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
    <p className="text-blue-400 text-sm mb-4">{role}</p>
    <div className="flex justify-center gap-4">
      <a
        href={linkedin}
        target="_blank" rel="noopener noreferrer"
        className="text-gray-400 hover:text-blue-500 transition-colors"
      >
        <Linkedin size={20} />
      </a>
      <a href={github} 
      target="_blank" rel="noopener noreferrer"
      className="text-gray-400 hover:text-white transition-colors">
        <Github size={20} />
      </a>
    </div>
  </div>
);

export default About;
