### 三维数组+标量
- tf.service.ts
```ts
tensor3d(arr: number[][]) {
  return tensor3d(arr);
}

add3D(a: Tensor2D, b: Scalar) {
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
- app.component.html

```html
<div class="row">
  <div class="col">
    <div class="card" [formGroup]="form">
      <div class="card-header">
        add2D 二维维数组+标量 [
          [
            [1,2,3],[1,2,3],[1,2,3]
          ],
          [
            [1,2,3],[1,2,3],[1,2,3]
          ],
          [
            [1,2,3],[1,2,3],[1,2,3]
          ]
        ]
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleInputEmail1">三维唯数组</label>
          <div formArrayName="a">
            <div class="flex-col" *ngFor="let item1 of a.controls;index as i1;" [formGroupName]="i1">
              <div class="flex-row" *ngFor="let item2 of item1.controls;index as i2;" [formGroupName]="i2">
                <div *ngFor="let item3 of item2.controls;index as i3;" [formGroupName]="i3">
                  <input class="form-control" type="number" formControlName="num">
                </div>
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
- app.component.ts

```ts
import { Component, OnInit } from "@angular/core";
import { TfService } from "../../tfjs/tf.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "add-3d",
  templateUrl: "./add-3d.component.html",
  styleUrls: ["./add-3d.component.scss"]
})
export class Add3dComponent implements OnInit {
  res: any;
  form: FormGroup;
  a: FormArray;
  constructor(public tf: TfService, public fb: FormBuilder) {
    this.form = this.fb.group({
      a: this.fb.array([
        this.fb.array([
          this.fb.array([
            this.createFormArray(0),
            this.createFormArray(1),
            this.createFormArray(2)
          ]),
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
        this.fb.array([
          this.fb.array([
            this.createFormArray(0),
            this.createFormArray(1),
            this.createFormArray(2)
          ]),
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
        this.fb.array([
          this.fb.array([
            this.createFormArray(0),
            this.createFormArray(1),
            this.createFormArray(2)
          ]),
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
        ])
      ]),
      b: [2]
    });
    this.a = this.form.get("a") as FormArray;
    console.log(this.a);
    this.form.valueChanges
      .map((res: { a: any[][][]; b: number }) => {
        return {
          a: res.a.map(arr => {
            return arr.map(b => {
              return b.map(c => parseInt(c.num));
            });
          }),
          b: res.b
        };
      })
      .map(res => {
        let a = this.tf.tensor3d(res.a);
        let b = this.tf.scalar(res.b);
        return {
          a: a,
          b: b
        };
      })
      .switchMap(res => {
        return this.tf.add3D(res.a, res.b);
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
