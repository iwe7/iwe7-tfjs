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
        return this.tf.add(res.a, res.b);
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
