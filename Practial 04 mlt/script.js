let model;

async function loadModel(){

console.log("Loading MobileNet model...");

model = await mobilenet.load();

console.log("MobileNet loaded successfully");

}

loadModel();



const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");

imageUpload.addEventListener("change", function(){

const file = this.files[0];

if(file){

previewImage.src = URL.createObjectURL(file);

}

});



async function classifyImage(){

if(!model){
alert("Model still loading...");
return;
}

if(!previewImage.src){
alert("Please upload an image first");
return;
}

const predictions = await model.classify(previewImage);

displayResults(predictions);

}



function displayResults(predictions){

const resultsList = document.getElementById("predictions");

resultsList.innerHTML = "";

predictions.forEach(pred => {

const li = document.createElement("li");

li.innerText =
`${pred.className} - ${(pred.probability*100).toFixed(2)}%`;

resultsList.appendChild(li);

});

}