### @tensorflow/tfjs 初探

* [一维数组+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add1D.md)
* [二维数组+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add2D.md)

### add1D 一维数组+标量

* tf.service.ts

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

* app.component.html

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

* app.component.ts

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

### add2D 二维数组+标量

* tf.service.ts

```ts
tensor2d(arr: number[][]) {
  return tensor2d(arr);
}

add2D(a: Tensor2D, b: Scalar) {
  let sub: Subject<any> = new Subject();
  let result = a
    .add(b)
    .data()
    .then(res => {
      sub.next(res);
    });
  return sub;
}
```

* app.component.html

```html
<div class="row">
  <div class="col">
    <div class="card" [formGroup]="form">
      <div class="card-header">
        add2D 二维维数组+标量
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleInputEmail1">二维唯数组</label>
          <div formArrayName="a">
            <div class="flex-row" *ngFor="let item of a.controls;index as i;" [formGroupName]="i">
              <div *ngFor="let item of item.controls;index as j;" [formGroupName]="j">
                <input class="form-control" type="number" formControlName="num">
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1">缩放指标</label>
          <input class="form-control" type="number" formControlName="b">
        </div>
        <div class="form-group">
          <div class="alert alert-primary" role="alert">
            计算结果&nbsp;
            <span *ngFor="let i of res">
              {{i}} &nbsp;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

* app.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { TfService } from "../../tfjs/tf.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "add-2d",
  templateUrl: "./add-2d.component.html",
  styleUrls: ["./add-2d.component.scss"]
})
export class Add2dComponent implements OnInit {
  res: any;
  form: FormGroup;
  a: FormArray;
  constructor(public tf: TfService, public fb: FormBuilder) {
    this.form = this.fb.group({
      a: this.fb.array([
        this.fb.array([
          this.createFormArray(0),
          this.createFormArray(1),
          this.createFormArray(2)
        ]),
        this.fb.array([
          this.createFormArray(0),
          this.createFormArray(1),
          this.createFormArray(2)
        ])
      ]),
      b: [2]
    });
    this.a = this.form.get("a") as FormArray;
    this.form.valueChanges
      .map((res: { a: any[][]; b: number }) => {
        res.a.map((arr: any[]) => {
          return arr.map(a => parseInt(a.num));
        });
        return {
          a: res.a.map(arr => {
            return arr.map(b => parseInt(b.num));
          }),
          b: res.b
        };
      })
      .map(res => {
        let a = this.tf.tensor2d(res.a);
        let b = this.tf.scalar(res.b);
        return {
          a: a,
          b: b
        };
      })
      .switchMap(res => {
        return this.tf.add2D(res.a, res.b);
      })
      .subscribe(res => {
        this.res = res;
      });
  }

  createFormArray(num: number = 0) {
    return this.fb.group({
      num: [num]
    });
  }

  ngOnInit() {
    this.form.get("b").setValue(2);
  }
}
```
