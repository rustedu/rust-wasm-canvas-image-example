# rust-wasm-canvas-image-example

**Inspired by https://github.com/inokawa/rust-wasm-example and its demo https://inokawa.github.io/rust-wasm-example/**

## 需求
实现前端读取图片，在特定位置（比如图片居中处）插入文本，生成一张新图片

### JS实现
* 基于Canvas https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Drawing_text

### Rust实现
* canvas 库实现
https://github.com/rust-canvas

* 前端框架
https://github.com/inokawa/rust-wasm-example

## How to build
### Clone
```
git clone git@github.com:rustedu/rust-wasm-canvas-image-example.git
cd rust-wasm-canvas-image-example
```

### build rust crate
```
// 在项目的根目录下执行
$ cargo install wasm-pack
$ wasm-pack build canvas-rs --target web
// 成功后在 canvas-rs 子目录下生成 pkg 目录，
```

### build web front
```
cd canvas-front
npm install
npm run build

```

