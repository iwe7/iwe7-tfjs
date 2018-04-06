import { Component, OnInit } from "@angular/core";
import { TfService } from "../../tfjs/tf.service";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

@Component({
  selector: "add-1d",
  templateUrl: "./add-1d.component.html",
  styleUrls: ["./add-1d.component.scss"]
})
export class Add1dComponent implements OnInit {
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
