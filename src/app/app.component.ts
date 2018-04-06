import { Component } from "@angular/core";
import * as tf from "@tensorflow/tfjs";
import { TfService } from "./tfjs/tf.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";
  constructor(public tf: TfService) {
    console.log(tf);
  }

  ngOnInit() {
    // 创建矩阵

    // this.test5();

    // this.test2();

    // this.test3();

    // this.test4();
  }

  test0() {
    const a = this.tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], [2, 3]);
    a.print();
    // 创建矩阵
    const b = this.tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
    b.print();
    // 创建0矩阵
    const zeros = this.tf.zeros([3, 5]);
    zeros.print();
    // 变量初始化
    const initialValues = this.tf.zeros([5]);
    const biases = this.tf.variable(initialValues); // initialize biases
    biases.print();
    // 变量geinng'x
    const updatedValues = this.tf.tensor1d([0, 1, 0, 1, 0]);
    biases.assign(updatedValues); // update values of biases
    biases.print();
    // 矩阵平方
    const d = this.tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
    const d_squared = d.square();
    d_squared.print();

    // 矩阵相加
    const e = this.tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
    const f = this.tf.tensor2d([[5.0, 6.0], [7.0, 8.0]]);
    const e_plus_f = e.add(f);
    e_plus_f.print();
  }

  test() {
    // Define function
    function predict(input) {
      // y = a * x ^ 2 + b * x + c
      // More on tf.tidy in the next section
      return tf.tidy(() => {
        const x = tf.scalar(input);
        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);
        return y;
      });
    }
    // Define constants: y = 2x^2 + 4x + 8
    const a = tf.scalar(2);
    const b = tf.scalar(4);
    const c = tf.scalar(8);
    // Predict output for input of 2
    const result = predict(2);
    result.print(); // Output: 24
  }

  async test2() {
    const model = tf.sequential();
    model.add(
      tf.layers.simpleRNN({
        units: 20,
        recurrentInitializer: "GlorotNormal",
        inputShape: [80, 4]
      })
    );
    const LEARNING_RATE = 0.2;
    const optimizer = tf.train.sgd(LEARNING_RATE);
    model.compile({ optimizer, loss: "categoricalCrossentropy" });
    const data = this.tf.randomNormal([1, 80, 4]);
    data.print();
    const labels = this.tf.randomNormal([1, 20]);
    labels.print();
    const h = await model.fit(data, labels);
    console.log(h);
  }

  test3() {
    const model = tf.sequential({
      layers: [tf.layers.dense({ units: 1, inputShape: [10] })]
    });
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
    // 测试模式中的损失值和度量值
    const result = model.evaluate(tf.ones([8, 10]), tf.ones([8, 1]), {
      batchSize: 4
    });
    (<any>result).print();
  }

  async test4() {
    const model = tf.sequential({
      layers: [tf.layers.dense({ units: 1, inputShape: [1] })]
    });
    model.compile({ optimizer: "sgd", loss: "meanSquaredError" });
    let x = tf.tensor([[1], [2], [3], [4], [5], [6], [7], [8]]);
    console.log("x shape", x.shape);
    x.print();
    let y = tf.tensor([[1], [2], [3], [4], [5], [6], [7], [8]]);
    y.print();
    const history = await model.fit(x, y, {
      batchSize: 4,
      epochs: 3
    });
    console.log("test4");
    let t = tf.tensor([[1], [2]]);
    t.print();
    (<any>model.predict(t)).print();
  }

  async test5() {
    // A sequential model is a container which you can add layers to.
    const model = tf.sequential();
    // Add a dense layer with 1 output unit.
    model.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Specify the loss type and optimizer for training.
    model.compile({ loss: "meanSquaredError", optimizer: "SGD" });

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
    const ys = tf.tensor2d([[1], [3], [5], [7]], [4, 1]);

    // Train the model.
    await model.fit(xs, ys, { epochs: 500 });
    // Ater the training, perform inference.
    let t = tf.tensor2d([[5], [6]], [2, 1]);
    t.print();
    const output = model.predict(t);
    (<any>output).print();
  }
}
