# 🤟 HandTalk - Real-time ASL Detection in Video Calls

## 📝 Overview
HandTalk enables real-time American Sign Language (ASL) gesture recognition during video calls. It translates ASL gestures into text using a fine-tuned MobileNet model, helping bridge communication gaps for ASL users.

## ✨ Features
- 🖐️ Real-time ASL detection and translation in video calls
- 🧑‍🎓 Interactive self-testing and ASL learning module
- 🔗 Seamless integration with video communication

## 🛠️ Technologies
- **Frontend:** React ⚛️
- **Backend:** Node.js (WebRTC, WebSockets) 🟩, Python (Flask, OpenCV, TensorFlow, MediaPipe) 🐍
- **Model:** Custom-trained MobileNet 🤖

## 📁 Project Structure
```
HandTalk/
│── client/            # React frontend
│── server/
│   ├── best_model.keras  # Trained ASL model
│   ├── index.js          # Node.js backend
│   ├── server.py         # Python backend for video processing
│   ├── ser.py            # Python backend for self-testing
│── ModelTrain.ipynb      # Model training notebook
│── startapp.sh           # Startup script
```

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/kanak227/HandsOn.git
cd HandsOn
```

### 2. Create a Python Virtual Environment
```bash
python -m venv venv
```

### 3. Install Python Dependencies
```bash
# Activate venv (Linux/macOS)
source venv/bin/activate
# Or (Windows)
venv\Scripts\activate

pip install flask opencv-python numpy tensorflow mediapipe flask-cors
```

### 4. Start All Services
Use the provided script to start all components (run in bash):
```bash
bash startapp.sh
```

### 5. Access the Application
Open [http://localhost:3000](http://localhost:3000) in your browser. 🌐

## 📡 API Endpoints (Python Backend)
- `/video_feed` – Streams video frames for ASL prediction
- `/process` – Detects hands and extracts frames using MediaPipe
- `/prediction` – Predicts ASL label and sends via WebSockets

## 🏋️ Model Training
The ASL recognition model is based on MobileNet, fine-tuned for high accuracy and real-time performance.





