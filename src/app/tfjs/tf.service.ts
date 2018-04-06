import { Injectable } from "@angular/core";
import {
  scalar,
  Scalar,
  Tensor,
  tensor,
  Tensor1D,
  tensor1d,
  Tensor2D,
  tensor2d,
  Tensor3D,
  tensor3d,
  Tensor4D,
  tensor4d,
  buffer,
  TensorBuffer,
  fill,
  fromPixels,
  linspace,
  oneHot,
  ones,
  onesLike,
  print,
  randomNormal,
  randomUniform,
  range,
  truncatedNormal,
  Rank,
  variable,
  Variable,
  zeros,
  zerosLike,
  cast,
  expandDims,
  pad,
  reshape,
  squeeze,
  concat,
  gather,
  reverse,
  slice,
  stack,
  tile,
  Sequential,
  sequential,
  SequentialConfig,
  model,
  Model,
  SymbolicTensor,
  input,
  loadModel
} from "@tensorflow/tfjs";
import { Subject } from "rxjs/Subject";
import { DType } from "@tensorflow/tfjs-layers/dist/types";
import { LayersService } from "./layers.service";
import { ImageService } from "./image.service";
export declare type Shape = number[];
export interface InputConfig {
  shape?: Shape;
  batchShape?: Shape;
  name?: string;
  dtype?: DType;
  sparse?: boolean;
}
export interface ContainerConfig {
  inputs: SymbolicTensor | SymbolicTensor[];
  outputs: SymbolicTensor | SymbolicTensor[];
  name?: string;
}
export interface ShapeMap {
  R0: number[];
  R1: [number];
  R2: [number, number];
  R3: [number, number, number];
  R4: [number, number, number, number];
}
export interface DataTypeMap {
  float32: Float32Array;
  int32: Int32Array;
  bool: Uint8Array;
}
export declare type DataType = keyof DataTypeMap;

/**
- tensor 张量
- scalar 标量
tf.constraints.maxNorm
tf.initializers.constant
tf.regularizers.L1L2
*/

@Injectable()
export class TfService {
  constructor(public layers: LayersService, public image: ImageService) {}
  tensor(values: any, shape?: number[], dtype?: DType): Tensor {
    return tensor(values, shape, dtype);
  }
  // 生成一维张量
  tensor1d(arr: any[], dtype?: DType): Tensor1D {
    return tensor1d(arr, dtype);
  }
  // 生成二维张量
  tensor2d(arr: any[][], shape?: [number, number], dtype?: DType): Tensor2D {
    return tensor2d(arr, shape, dtype);
  }
  // 生成三维张量
  tensor3d(
    arr: any[][][],
    shape?: [number, number, number],
    dtype?: DType
  ): Tensor3D {
    return tensor3d(arr, shape, dtype);
  }
  // 生成四维张量
  tensor4d(
    arr: number[][][][],
    shape?: [number, number, number, number],
    dtype?: DType
  ): Tensor4D {
    return tensor4d(arr, shape, dtype);
  }
  // 生成标量
  scalar(
    value: number | boolean,
    dtype?: "float32" | "int32" | "bool"
  ): Scalar {
    return scalar(value);
  }
  // 缓冲区
  buffer(shape: number[], dtype?: DType, values?: any): TensorBuffer<any> {
    return buffer(shape, dtype, values);
  }
  // 复制一个 张量
  clone(x: Tensor): Tensor {
    return x.clone();
  }
  // 填充获取 张量
  fill(shape: number[], value: number, dtype?: DType): Tensor {
    return fill(shape, value, dtype);
  }
  // 通过图片创建一个 3D张量
  fromPixels(
    pixels: ImageData | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement,
    numChannels?: number
  ): Tensor3D {
    return fromPixels(pixels, numChannels);
  }
  // 制定区间返回一个均匀分布的一维张量
  linspace(start, stop, num): Tensor1D {
    return linspace(start, stop, num);
  }
  // 在制定位置放置制定数值 创建一个二维张量
  oneHot(
    indices: Tensor1D,
    depth: number,
    onValue?: number,
    offValue?: number
  ): Tensor2D {
    return oneHot(indices, depth, onValue, offValue);
  }
  // 制定形状填充1
  ones(shape: number[], dtype?: DType): Tensor {
    return ones(shape, dtype);
  }
  // 创建一个与之相同形状的填充为1的张量
  onesLike(x: Tensor): Tensor {
    return onesLike(x);
  }
  // 打印数据
  print(x: Tensor, verbose?: boolean): void {
    return print(x, verbose);
  }
  // 根据参数随机填充张量
  randomNormal(
    shape: number[],
    mean?: number,
    stdDev?: number,
    dtype?: "float32" | "int32",
    seed?: number
  ): Tensor {
    return randomNormal(shape, mean, stdDev, dtype, seed);
  }
  // 制定范围填充张量
  randomUniform<R extends Rank>(
    shape: ShapeMap[R],
    minval?: number,
    maxval?: number,
    dtype?: DataType
  ): Tensor<R> {
    return randomUniform(shape, minval, maxval, dtype);
  }
  // 在所提供的范围内填充数字
  range(
    start: number,
    stop: number,
    step?: number,
    dtype?: "float32" | "int32"
  ): Tensor1D {
    return range(start, stop, step, dtype);
  }

  // 具有截断正态分布的采样值
  truncatedNormal<R extends Rank>(
    shape: ShapeMap[R],
    mean?: number,
    stdDev?: number,
    dtype?: "float32" | "int32",
    seed?: number
  ): Tensor<R> {
    return truncatedNormal(shape, mean, stdDev, dtype, seed);
  }
  // 用所提供的初始值创建一个新变量
  variable<R extends Rank>(
    initialValue: Tensor<R>,
    trainable?: boolean,
    name?: string,
    dtype?: DataType
  ): Variable<R> {
    return variable(initialValue, trainable, name, dtype);
  }
  // 创建一个所有元素设置为0的张量
  zeros<R extends Rank>(shape: ShapeMap[R], dtype?: DataType): Tensor<R> {
    return zeros(shape, dtype);
  }
  // 创建一个张量，所有元素设置为0，其形状与给定的张量相同
  zerosLike<T extends Tensor>(x: T): T {
    return zerosLike(x);
  }

  // 投射到一个新的张量。
  cast<T extends Tensor>(x: T, dtype: DataType): T {
    return cast(x, dtype);
  }

  // 通过在张量的形状中插入一个维度来扩展秩
  expandDims<R2 extends Rank>(x: Tensor, axis?: number): Tensor<R2> {
    return expandDims(x, axis);
  }

  // 铺垫
  pad<T extends Tensor>(
    x: T,
    paddings: Array<[number, number]>,
    constantValue?: number
  ): T {
    return pad(x, paddings, constantValue);
  }
  // 改变形状
  reshape<R2 extends Rank>(x: Tensor, shape: ShapeMap[R2]): Tensor<R2> {
    return reshape(x, shape);
  }
  // 消除尺寸
  squeeze<T extends Tensor>(x: Tensor, axis?: number[]): T {
    return squeeze(x, axis);
  }

  // 合并
  concat<T extends Tensor>(tensors: T[], axis?: number): T {
    return concat(tensors, axis);
  }
  // 根据指数收集切片
  gather<T extends Tensor>(x: T, indices: Tensor1D, axis?: number): T {
    return gather(x, indices, axis);
  }
  // 反转
  reverse<T extends Tensor>(x: T, axis?: number | number[]): T {
    return reverse(x, axis);
  }
  // 分割
  slice<R extends Rank, T extends Tensor<R>>(
    x: T,
    begin: ShapeMap[R],
    size: ShapeMap[R]
  ): T {
    return slice(x, begin, size);
  }
  // 堆砌
  stack<T extends Tensor>(tensors: T[], axis?: number): Tensor {
    return stack(tensors, axis);
  }
  // 重复
  tile<T extends Tensor>(x: T, reps: number[]): T {
    return tile(x, reps);
  }

  // sequential模型
  sequential(config?: SequentialConfig): Sequential {
    return sequential(config);
  }
  // 创建模型
  model(config: ContainerConfig): Model {
    return model(config);
  }
  // 输入
  input(config: InputConfig): SymbolicTensor {
    return input(config);
  }
  // 加载模型
  loadModel(modelConfigPath: string): Promise<Model> {
    return loadModel(modelConfigPath);
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
