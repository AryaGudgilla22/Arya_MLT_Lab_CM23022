async function trainAndSave() {
    const model = tf.sequential();
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

    const xs = tf.tensor2d([-1, 0, 1, 2, 3, 4], [6, 1]);
    const ys = tf.tensor2d([-3, -1, 1, 3, 5, 7], [6, 1]);

    console.log("Training...");
    await model.fit(xs, ys, { epochs: 250 });
    
    // Save to Browser Local Storage
    await model.save('localstorage://my-linear-model');
    
    // OR: Trigger a download of model.json and weights.bin
    // await model.save('downloads://my-linear-model');
    
    console.log("Model saved to LocalStorage!");
}