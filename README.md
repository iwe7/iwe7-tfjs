### @tensorflow/tfjs 初探

* [一维数组+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add1D.md)
* [二维数组+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add2D.md)
* [三维数组+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add3D.md)


### 一维数组+标量

* tf.service.ts

```
import { Injectable } from "@angular/core";
import {
  Tensor1D,
  tensor1d,
  scalar,
  Scalar,
  Tensor2D,
  tensor2d,
  Tensor3D,
  tensor3d
} from "@tensorflow/tfjs";
import { Subject } from "rxjs/Subject";

@Injectable()
export class TfService {
  constructor() {}
  // 生成一维tensor
  tensor1d(arr: number[]): Tensor1D {
    return tensor1d(arr);
  }
  // 生成二维tensor
  tensor2d(arr: number[][]) {
    return tensor2d(arr);
  }
  // 生成三维tensor
  tensor3d(arr: number[][][]) {
    return tensor3d(arr);
  }
  // 生成常量
  scalar(n: number): Scalar {
    return scalar(n);
  }
  // 相加
  add(a: Tensor1D | Tensor2D | Tensor3D, b: Scalar) {
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
