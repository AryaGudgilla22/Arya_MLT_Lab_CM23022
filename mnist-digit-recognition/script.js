const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Canvas setup
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = "white";
ctx.lineWidth = 22;
ctx.lineCap = "round";

let drawing = false;
let lastX = 0;
let lastY = 0;

// Mouse drawing
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});

canvas.addEventListener("mouseup", () => drawing = false);
canvas.addEventListener("mouseleave", () => drawing = false);

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
});

// Clear canvas
function clearCanvas() {
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  document.getElementById("result").innerText = "Cleared. Draw again!";
}

// Load MNIST model
let model;
async function loadModel() {
  model = await tf.loadLayersModel(
    "https://storage.googleapis.com/tfjs-models/tfjs/mnist/model.json"
  );
  document.getElementById("result").innerText =
    "Model loaded. Draw a digit!";
}
loadModel();

// Predict digit
function predict() {
  if (!model) {
    alert("Model still loading");
    return;
  }

  const imageData = ctx.getImageData(0, 0, 280, 280);

  let tensor = tf.browser.fromPixels(imageData, 1)
    .resizeNearestNeighbor([28, 28])
    .toFloat()
    .div(tf.scalar(255))
    .sub(tf.scalar(1))    // invert colors
    .expandDims(0);

  const prediction = model.predict(tensor);
  const result = prediction.argMax(-1).dataSync()[0];

  document.getElementById("result").innerText =
    "Prediction: " + result;
}
