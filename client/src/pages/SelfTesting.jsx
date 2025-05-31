"use client"

import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./css/SelfTesting.css"

const ASLDetector = () => {
  const [prediction, setPrediction] = useState("")
  const [confidence, setConfidence] = useState(null);
  const [handLandmarks, setHandLandmarks] = useState(null);
  const videoRef = useRef(null)
  const canvasRef = useRef(null);
  const [cameraError, setCameraError] = useState(null)

  useEffect(() => {
    // Camera access
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      })
      .catch(err => {
        setCameraError("Unable to access camera. Please allow camera permissions.")
        console.error("Camera error:", err)
      })
    return () => {
      // Stop camera on unmount
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  // Helper to capture frame and send to backend
  const captureAndPredict = async () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    if (video.readyState < 2) return; // Not enough data
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg", 0.8);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData })
      });
      const data = await response.json();
      setPrediction(data.class || "");
      setConfidence(data.confidence !== undefined ? data.confidence : null);
      setHandLandmarks(data.hand_landmarks || null);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  // Helper to draw hand landmarks
  const drawHandLandmarks = (landmarks, canvas, video) => {
    if (!landmarks || !canvas || !video) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#00FF00";
    ctx.lineWidth = 2;
    ctx.fillStyle = "#FF0000";
    // Draw connections (basic, not all connections)
    const connections = [
      [0,1],[1,2],[2,3],[3,4],      // Thumb
      [0,5],[5,6],[6,7],[7,8],      // Index
      [5,9],[9,10],[10,11],[11,12], // Middle
      [9,13],[13,14],[14,15],[15,16], // Ring
      [13,17],[17,18],[18,19],[19,20], // Pinky
      [0,17]
    ];
    // Draw lines
    connections.forEach(([start, end]) => {
      const s = landmarks[start], e = landmarks[end];
      ctx.beginPath();
      ctx.moveTo(s.x * canvas.width, s.y * canvas.height);
      ctx.lineTo(e.x * canvas.width, e.y * canvas.height);
      ctx.stroke();
    });
    // Draw points
    landmarks.forEach(pt => {
      ctx.beginPath();
      ctx.arc(pt.x * canvas.width, pt.y * canvas.height, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndPredict();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Draw landmarks if available
    if (handLandmarks && canvasRef.current && videoRef.current) {
      drawHandLandmarks(handLandmarks, canvasRef.current, videoRef.current);
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  }, [handLandmarks]);

  return (
    <div
      className="asl-detector"
      style={{
        minHeight: "100vh",
        // Gradient background similar to homepage
        background: "linear-gradient(135deg, #18181b 0%, #05505a 100%)",
      }}
    >
      {/* Navbar */}
      <nav className="asl-navbar">
        <div className="asl-container">
          <Link to="/" className="asl-logo">HandsOn</Link>
          <ul className="asl-nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/self-testing">Self Testing</Link></li>
            <li><Link to="/video-calling">Video Calling</Link></li>
            <li><Link to="/learn">Learn ASL</Link></li>
            <li><Link to="/explore">Explore Model</Link></li>
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 70px)",
        padding: "2rem"
      }}>
        <div style={{
          background: "rgba(6, 211, 233, 0.18)", // semi-transparent to blend with gradient
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.8)",
          padding: "2.5rem 2rem",
          maxWidth: 420,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>
          <h1 className="title" style={{
            fontSize: "2rem",
            fontWeight: 700,
            marginBottom: "1.5rem",
            color: "#fff" // White text
          }}>Self Testing: Real-Time ASL Detection</h1>
          <div className="video-wrapper" style={{
            width: "320px",
            height: "240px",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            marginBottom: "1.5rem",
            position: "relative",
            background: "#1e3c72"
          }}>
            {/* Show camera error if any */}
            {cameraError ? (
              <div style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                background: "rgba(229, 62, 62, 0.8)",
                fontWeight: 600,
                fontSize: "1rem"
              }}>
                {cameraError}
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ width: "100%", height: "100%", objectFit: "cover", background: "#2a5298" }}
                  width={320}
                  height={240}
                />
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={240}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    pointerEvents: "none"
                  }}
                />
              </>
            )}
          </div>
          <div className="output-box" style={{
            width: "100%",
            background: "rgba(1, 25, 38, 0.18)",
            borderRadius: "10px",
            padding: "1.2rem 1rem",
            textAlign: "center",
            marginTop: "0.5rem",
            boxShadow: "0 1px 4px rgba(0,0,0,0.03)"
          }}>
            <h2 style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "#fff",
              marginBottom: "0.7rem"
            }}>Detected Sign</h2>
            <div className={`detected-sign ${prediction ? "" : "no-hand"}`} style={{
              fontSize: prediction ? "2.2rem" : "1.2rem",
              fontWeight: 700,
              color: "#fff",
              minHeight: "2.5rem",
              letterSpacing: "0.05em"
            }}>
              {prediction || "Waiting for sign..."}
            </div>
            {confidence !== null && (
              <div style={{
                fontSize: "1rem",
                color: "#ffe066", // Highlighted yellow color
                marginTop: "0.5rem",
                fontWeight: 700,
                textShadow: "0 1px 4px rgba(0,0,0,0.15)"
              }}>
                Accuracy: {(confidence * 100).toFixed(2)}%
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer style={{
        width: "100%",
        padding: "1.2rem 0",
        background: "rgba(1, 25, 38, 0.28)",
        color: "#fff",
        textAlign: "center",
        fontWeight: 500,
        fontSize: "1rem",
        letterSpacing: "0.03em",
        marginTop: "auto"
      }}>
        &copy; {new Date().getFullYear()} HandsOn. All rights reserved.
      </footer>
    </div>
  )
}

export default ASLDetector
