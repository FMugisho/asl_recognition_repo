
# Real-time ASL Recognition Web Application

This repository contains a web application that allows users to translate American Sign Language (ASL) signs to text in real-time. The application uses the user's webcam to capture video frames and processes them using a deep learning model to recognize ASL signs. The recognized signs are displayed as a list on the web page as they are identified.

## Features

- Real-time ASL sign recognition
- User-friendly interface with video feed, start/stop buttons, and result display
- Front-end built using HTML, CSS, and JavaScript
- Back-end built using Python Flask web framework
- REST API for processing video frames and returning recognized signs

## Prerequisites

- Python 3.6 or higher
- Flask

## Setup

1. Clone this repository and navigate to the project directory.

2. Create a virtual environment and activate it:

   ```
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:

   ```
   pip install Flask
   ```

## Running the Application

1. Run the Flask server:

   ```
   python main.py
   ```

2. Open a web browser and navigate to `http://127.0.0.1:5005`.

3. Click the "Start" button to initiate the webcam stream and start recognizing ASL signs. The recognized signs will be displayed as a list on the web page.

4. Click the "Stop" button to halt the video feed and frame capture process.

