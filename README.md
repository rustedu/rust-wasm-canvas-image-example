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

## 开发实现
### 分支用法
1. main 主分支，用于打包生成网站 html/js 代码
2. gh-pages 分支，该分支只用于提供网站web服务，根目录即为 html/js 代码，不含rust源码
3. dev 开发分支，用于项目开发组成员进行开发，本地测试通过后，可以合并到 main 分支
## How to build
### Clone project
```
$ git clone git@github.com:rustedu/rust-wasm-canvas-image-example.git
$ cd rust-wasm-canvas-image-example
```
### Install wasm-pack
```
// 安装 wasm-pack CLI 工具：
$ cargo install wasm-pack
// 由于 wasm-pack 会在运行时安装 wasm-bindgen，这一步由于国内的网络环境很慢，可以提前手动安装：
$ cargo install wasm-bindgen-cli
// 以上安装只需要执行一次，下面的 build 需要每次修改源码后重新执行
```

### 实现方案1: canvas-image-rs
* 基于 [imageproc](https://github.com/image-rs/imageproc)
* Contributed by [Faith](https://github.com/july-12)
```
$ cd canvas-image-rs
$ yarn install
$ yarn serve

```

### 实现方案2: Rust + Webpack + web-sys
* 基于 canvas-rs 目录下的 rust 库，该库依赖了 web-sys 库来调用 js canvas api
* Contributed by [wulinsheng123](https://github.com/wulinsheng123)

#### Step1: build rust crate
```
$ cd canvas-rs/
$ wasm-pack build
// 成功后在当前目录下生成 pkg 目录，里面包含 canvas_rs_bg.wasm
```

#### Step2: build web front
```
cd canvas-front
npm install
npm run build
// 成功后在当前目录下生成 dist 目录，里面包含 html/js/wasm
```

## 自动部署脚本
目前在 .github/workflows/main.yml 文件中，会进入 canvas-front 和 canvas-image-rs 分别 build
采用了 ./canvas-image-rs/dist 下的 html/js 推送到 gh-pages 分支下进行 demo
```
      - name: install yarn
        run: |
          cd canvas-front
          npm install
          npm run build
          cd ..
          cd canvas-image-rs
          yarn install
          yarn build
          cd ..
      - name: use-git
        run: |
          git config --global user.email "rustwasm@rustedu.com"
          git config --global user.name "gh-pages"
          git subtree push --prefix ./canvas-image-rs/dist origin gh-pages
```
