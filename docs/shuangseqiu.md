### 准备数据

```ts
export const data = [
  {
    data: 2018009,
    value: [[5, 10, 17, 23, 26, 32], [7]]
  },
  {
    data: 2018010,
    value: [[1, 8, 17, 20, 21, 22], [3]]
  },
  {
    data: 2018011,
    value: [[3, 10, 21, 23, 27, 33], [11]]
  },
  {
    data: 2018012,
    value: [[11, 12, 13, 19, 26, 28], [12]]
  }
];
```

### 核心代码


```ts
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
    // 创建模型
    let model = tf.sequential();
    model.add(tf.layers.dense({ units: 7, inputShape: [7] }));
    model.compile({ loss: "meanSquaredError", optimizer: "SGD" });
    // 格式化数据
    let r = this.formatData();
    // 输入数据
    let x = tf.tensor(r.input);
    // 输出数据
    let y = tf.tensor(r.output);
    model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
    // 训练模型
    model.fit(x, y);
    let u = tf.tensor(r.use);
    // 预测
    (<tf.Tensor>model.predict(u)).data().then((res: any) => {
      res.map((r, index) => {
        if (index < 6) {
          let re = Math.abs(parseInt(r));
          // 红球 数据二次检测
          if (re === 0) {
            re = 1;
          }
          if (re > 35) {
            re = 35;
          }
          this.redResults[index] = re;
        } else {
           // 蓝球 数据二次检测
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
      // 计算结果排序
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
```

### 建html用于展示数据

```html
<div class="card">
  <div class="card-header">
    双色球预测
    <a style="float:right;color: #fff;" class="btn btn-primary btn-sm">添加</a>
  </div>
  <div class="card-body">
    <table class="table table-hover">
      <thead>
        <tr>
          <th>期号</th>
          <th>红球1</th>
          <th>红球2</th>
          <th>红球3</th>
          <th>红球4</th>
          <th>红球5</th>
          <th>红球6</th>
          <th>篮球</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of items; index as i;">
          <td>{{item.data}}</td>
          <td *ngFor="let it of item.value[0]">
            <span class="red">{{it}}</span>
          </td>
          <td *ngFor="let it of item.value[1]">
            <span class="blow">{{it}}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
<div class="card">
  <div class="card-header">
    预测下期结果
    <a style="float:right;color: #fff;" class="btn btn-primary btn-sm" (click)="handler()">重新计算</a>
  </div>
  <div class="card-body">
    <div class="flex-row">
      <span class="red" *ngFor="let item of redResults">{{item}}</span>
      <span class="blow" *ngFor="let item of blowResults">{{item}}</span>
    </div>
  </div>
</div>
```
