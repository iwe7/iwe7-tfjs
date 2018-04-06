### @tensorflow/tfjs 初探

* [一维张量+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add1D.md)
* [二维张量+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add2D.md)
* [三维张量+标量](https://github.com/iwe7/iwe7-tfjs/blob/master/docs/add3D.md)


- tensor 张量
- scalar 标量

### 封装成自己service

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
  tensor3d,
  Tensor4D,
  tensor4d
} from "@tensorflow/tfjs";
import { Subject } from "rxjs/Subject";

/**
- tensor 张量
- scalar 标量
*/

@Injectable()
export class TfService {
  constructor() {}
  // 生成一维张量
  tensor1d(arr: number[]): Tensor1D {
    return tensor1d(arr);
  }
  // 生成二维张量
  tensor2d(arr: number[][]) {
    return tensor2d(arr);
  }
  // 生成三维张量
  tensor3d(arr: number[][][]) {
    return tensor3d(arr);
  }
  // 生成四维张量
  tensor4d(arr: number[][][][]) {
    return tensor4d(arr);
  }
  // 生成标量
  scalar(n: number): Scalar {
    return scalar(n);
  }
  // 相加
  add(a: Tensor1D | Tensor2D | Tensor3D | Tensor4D, b: Scalar) {
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
