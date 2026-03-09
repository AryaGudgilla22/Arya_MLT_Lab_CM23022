let model;
let video = document.getElementById("webcam");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

async function loadModel(){

console.log("Loading COCO-SSD model...");

model = await cocoSsd.load();

console.log("Model loaded successfully");

}

loadModel();


async function startCamera(){

const stream = await navigator.mediaDevices.getUserMedia({
video:true
});

video.srcObject = stream;

video.onloadedmetadata = () => {

video.play();

canvas.width = video.videoWidth;
canvas.height = video.videoHeight;

detectObjects();

};

}


async function detectObjects(){

const predictions = await model.detect(video);

ctx.clearRect(0,0,canvas.width,canvas.height);

predictions.forEach(pred => {

const [x,y,width,height] = pred.bbox;

ctx.strokeStyle = "red";
ctx.lineWidth = 2;
ctx.strokeRect(x,y,width,height);

ctx.font = "18px Arial";
ctx.fillStyle = "red";

ctx.fillText(
`${pred.class} ${(pred.score*100).toFixed(2)}%`,
x,
y>10?y-5:10
);

});

requestAnimationFrame(detectObjects);

}