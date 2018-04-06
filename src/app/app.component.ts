import { Component } from "@angular/core";
import { TfService } from "./tfjs/tf.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "app";

  res: any;

  form: FormGroup;
  a: FormArray;
  constructor(public tf: TfService, public fb: FormBuilder) {
    this.form = this.fb.group({
      a: this.fb.array([
        this.createFormArray(0),
        this.createFormArray(1),
        this.createFormArray(2)
      ]),
      b: [2]
    });
    this.a = this.form.get("a") as FormArray;
    this.form.valueChanges
      .map(res => ({ a: res.a.map(a => parseInt(a.num)), b: res.b }))
      .map(res => {
        let a = this.tf.tensor1d(res.a);
        let b = this.tf.scalar(res.b);
        return {
          a: a,
          b: b
        };
      })
      .switchMap(res => {
        return this.tf.add1D(res.a, res.b);
      })
      .subscribe(res => {
        this.res = res;
      });
    const a = this.tf.tensor1d([1, 2, 3]);
    const b = this.tf.scalar(2);
    this.tf.add1D(a, b).subscribe(res => {
      console.log(res);
      this.res = res;
    });
  }

  createFormArray(num: number = 0) {
    return this.fb.group({
      num: [num]
    });
  }

  async ngOnInit() {
    // const model = tf.sequential();
    // model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
    // model.compile({ loss: "meanSquaredError", optimizer: "sgd" });
    // const xs = tf.tensor2d([[1], [2], [3], [4]], [4, 1]);
    // const ys = tf.tensor2d([[1], [3], [5], [7]], [4, 1]);
    // await model.fit(xs, ys, { epochs: 500 });
    // const output = model.predict(tf.tensor2d([[5]], [1, 1]));
    // (<any>output).print();
  }
}
