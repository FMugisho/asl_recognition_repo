const batchSize = 3; // The number of frames to send in a batch
const video = document.getElementById("video");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resultDiv = document.getElementById("result");

let stream;
let interval;
let recognizedSigns = [];

startButton.addEventListener("click", async () => {
    startButton.disabled = true;
    stopButton.disabled = false;

    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    interval = setInterval(captureAndSendFrame, 1000); // Send a frame every 1000ms (1 second)
    // TODO for Kenneth, maybe send images every 100 ms then server will just wait until 1 second
    // this will give server 10 images to work with.
});

stopButton.addEventListener("click", () => {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(interval);
    video.srcObject.getTracks().forEach(track => track.stop());
});

async function captureAndSendFrame() {
    let batchFrames = [];

    for (let i = 0; i < batchSize; i++) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg", 0.8).split(",")[1];
        batchFrames.push(imageData);
    }

    try {
        const response = await fetch("/api/recognize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ images: batchFrames })
        });

        const result = await response.json();
        recognizedSigns.push(result.sign);
        updateResultDisplay();
    } catch (error) {
        console.error("Error sending frame to the server:", error);
    }
}

function updateResultDisplay() {
    /* 
     * This function updates the current results that we have ... we'll modify to have a sentence and
     * not bullet points ... 
     */
    resultDiv.innerHTML = "<ul>";
    recognizedSigns.forEach(sign => {
        resultDiv.innerHTML += `<li>${sign}</li>`;
    });
    resultDiv.innerHTML += "</ul>";
}
