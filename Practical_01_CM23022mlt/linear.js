async function predictWithPretrained() {
    try {
        // Load the model from local storage
        const model = await tf.loadLayersModel('localstorage://my-linear-model');
        
        // If loading from GitHub/Server, use a URL:
        // const model = await tf.loadLayersModel('https://yourname.github.io/model.json');

        const input = tf.tensor2d([10], [1, 1]);
        const prediction = model.predict(input);
        
        console.log("Prediction for 10:", prediction.dataSync()[0]);
    } catch (err) {
        console.error("Model not found! Run the trainer first.");
    }
}