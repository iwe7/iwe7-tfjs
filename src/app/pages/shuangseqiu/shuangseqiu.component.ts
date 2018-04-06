import { Component, OnInit } from "@angular/core";
import { data } from "../../data/shuangseqiu";
import * as tf from "@tensorflow/tfjs";

@Component({
  selector: "shuangseqiu",
  templateUrl: "./shuangseqiu.component.html",
  styleUrls: ["./shuangseqiu.component.scss"]
})
export class ShuangseqiuComponent implements OnInit {
  items: any[] = data;
  redResults: number[] = [0, 0, 0, 0, 0, 0];
  blowResults: number[] = [0];

  constructor() {}

  ngOnInit() {
    this.handler();
  }

  handler() {
    let model = tf.sequential();
    model.add(tf.layers.dense({ units: 7, inputShape: [7] }));
    model.compile({ loss: "meanSquaredError", optimizer: "SGD" });
    // 格式化数据
    let r = this.formatData();
    let x = tf.tensor(r.input);
    let y = tf.tensor(r.output);
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
    model.fit(x, y);
    let u = tf.tensor(r.use);
    (<tf.Tensor>model.predict(u)).data().then((res: any) => {
      res.map((r, index) => {
        if (index < 6) {
          let re = Math.abs(parseInt(r));
          if (re === 0) {
            re = 1;
          }
          if (re > 35) {
            re = 35;
          }
          this.redResults[index] = re;
        } else {
          let re = Math.abs(parseInt(r));
          if (re === 0) {
            re = 1;
          }
          if (re > 16) {
            re = 16;
          }
          this.blowResults[0] = re;
        }
      });
      this.redResults.sort((a, b): any => {
        return a > b;
      });
    });
  }

  formatData() {
    let handedXs = [];
    let handedYs = [];
    let use = [];
    this.items.map((res, index) => {
      if (index !== 0) {
        let m = [...res.value[0], ...res.value[1]];
        handedYs.push(m);
      } else {
        let m = [...res.value[0], ...res.value[1]];
      }
      if (index !== this.items.length - 1) {
        let m = [...res.value[0], ...res.value[1]];
        handedXs.push(m);
      } else {
        let m = [...res.value[0], ...res.value[1]];
        use.push(m);
      }
    });
    return {
      input: handedXs,
      output: handedYs,
      use: use
    };
  }
}
