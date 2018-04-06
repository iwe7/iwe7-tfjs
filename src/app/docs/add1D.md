### add1D 一维数组+标量

- tf.service.ts
```
import { Injectable } from "@angular/core";
import { Tensor1D, tensor1d, scalar, Scalar } from "@tensorflow/tfjs";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TfService {
  constructor() {}

  tensor1d(arr: number[]): Tensor1D {
    return tensor1d(arr);
  }

  scalar(n: number): Scalar {
    return scalar(n);
  }

  add1D(a: Tensor1D, b: Scalar) {
    let sub: Subject<any> = new Subject();
    let result = a
      .add(b)
      .data()
      .then(res => {
        sub.next(res);
      });
    return sub;
  }
}
```
- app.component.html
```html
<div class="main" [formGroup]="form">
  <div class="flex-row" formArrayName="a">
    一唯数组：
    <div *ngFor="let item of a.controls;index as i;" [formGroupName]="i">
      <input type="number" formControlName="num">
    </div>
  </div>
  <div>
    缩放指标：
    <input type="number" formControlName="b">
  </div>

  <div>
    相加结果：
    <span *ngFor="let i of res">
      {{i}} &nbsp;
    </span>
  </div>
</div>
```
- app.component.ts
```ts
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
}
```
