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
