### this wasm lib can draw text on image base on [imageproc](https://github.com/image-rs/imageproc)

#### usage

```javascript
  wasm.then(m => {
      let blob =  m.process_image(imageBase64Buffer, text, fontSize, color, x, y);
      let imgSrc = "data:image/png;base64, " + blob;
  })
```

### run dev

```
 $ yarn install 

 $ yarn serve
```

it would auto create `pkg` for you after executing `yarn serve`, then you can publish it as npm directly;


### reference

- [rust wasm](https://rustwasm.github.io/book/game-of-life/hello-world.html)
- [bindgen](https://rustwasm.github.io/wasm-bindgen/introduction.html)
- [image](https://docs.rs/image/0.24.1/image/)
- [pass png file to rust](https://github.com/rustwasm/wasm-bindgen/issues/1836)