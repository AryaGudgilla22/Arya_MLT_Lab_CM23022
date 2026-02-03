import * as tf from '@tensorflow/tfjs';

const a = tf.tensor([1, 2, 3]);
const b = tf.tensor([4, 5, 6]);

const c = tf.add(a, b);

a.print();
b.print();
c.print();