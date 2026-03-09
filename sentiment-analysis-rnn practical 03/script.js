let model;
let metadata;
let wordIndex;
let maxLen;

async function loadModel(){

console.log("Loading model...");

model = await tf.loadLayersModel(
'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json'
);

metadata = await fetch(
'https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json'
);

const meta = await metadata.json();

wordIndex = meta.word_index;
maxLen = meta.max_len;

console.log("Model loaded successfully");

document.getElementById("prediction").innerText =
"Model Loaded. Enter text to analyze.";

}

loadModel();


function preprocess(text){

const cleaned = text
.toLowerCase()
.replace(/[^a-zA-Z\s]/g,"")
.trim();

const words = cleaned.split(/\s+/);

let sequence = [];

for(let i=0;i<words.length;i++){

let word = words[i];

if(wordIndex[word]){
sequence.push(wordIndex[word]);
}else{
sequence.push(2);
}

}

if(sequence.length > maxLen){
sequence = sequence.slice(sequence.length - maxLen);
}

while(sequence.length < maxLen){
sequence.unshift(0);
}

return sequence;

}



async function predictSentiment(){

let text = document.getElementById("textInput").value;

if(text.length === 0){
alert("Please enter text");
return;
}

const sequence = preprocess(text);

const input = tf.tensor2d([sequence]);

const prediction = model.predict(input);

const score = prediction.dataSync()[0];

displayResult(score);

}



function displayResult(score){

let negativeProb = score;
let positiveProb = 1 - score;

let sentiment;
let confidence;

if(positiveProb > negativeProb){
    sentiment = "Positive 😊";
    confidence = (positiveProb * 100).toFixed(2);
    document.getElementById("progress").style.background="#00ff9d";
}else{
    sentiment = "Negative 😡";
    confidence = (negativeProb * 100).toFixed(2);
    document.getElementById("progress").style.background="#ff4d4d";
}

document.getElementById("prediction").innerText =
"Sentiment: " + sentiment;

document.getElementById("confidence").innerText =
"Confidence: " + confidence + "%";

document.getElementById("progress").style.width =
confidence + "%";

}



function clearText(){

document.getElementById("textInput").value="";

document.getElementById("prediction").innerText =
"Enter text to analyze.";

document.getElementById("confidence").innerText="";

document.getElementById("progress").style.width="0%";

}