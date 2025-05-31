#!/bin/bash

# Start React frontend
cd client
npm start &
CLIENT_PID=$!
cd ..

# Start Node.js backend
cd server
npm install
node index.js &
NODE_PID=$!
cd ..

# Activate Python virtual environment (cross-platform, adjust path if venv is in ./server)
if [ -d "server/venv/Scripts" ]; then
    source server/venv/Scripts/activate
elif [ -d "server/venv/bin" ]; then
    source server/venv/bin/activate
elif [ -d "venv/Scripts" ]; then
    source venv/Scripts/activate
elif [ -d "venv/bin" ]; then
    source venv/bin/activate
else
    echo "Python virtual environment not found."
    exit 1
fi

# Start Python Flask server for video processing
cd server
python server.py &
PY1_PID=$!

# Start Python Flask server for self-testing
python ser.py &
PY2_PID=$!
cd ..

# Wait for all processes
wait $CLIENT_PID $NODE_PID $PY1_PID $PY2_PID
