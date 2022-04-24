/*
 * @Description: 
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-04-21 14:37:23
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-04-22 17:58:00
 */
import { greet, Diagram } from '../../canvas-rs/pkg'

// greet()


window.onload = function () {
  try {
    console.log(11);
    let d = new Diagram('canvas_box', '#fileUpload', 'inputText')
    setTimeout(() => {
      d.init()
    }, 3000)
  } catch (error) {
    console.log(error);
  }
  // let canvas = document.getElementById("bg_canvas")
  // let text_canvas = document.getElementById("text_canvas")
  // let ctx = canvas.getContext('2d');
  // let text_ctx = text_canvas.getContext('2d');

  // document.getElementById('fileUpload').onchange = (event) => {
  //   let file = event.target.files[0];
  //   let reader = new FileReader()
  //   reader.readAsDataURL(file)
  //   reader.onload = function (e) {
  //     let result = e.target.result
  //     var image = new Image();
  //     image.src = result
  //     image.onload = function () {
  //       ctx.drawImage(image, 0, 0, 500, 500);
  //     }
  //   }
  // }

  // document.getElementById("inputText").oninput = (event) => {
  //   let arr = event.target.value.split('\n')
  //   text_ctx.clearRect(0, 0, text_canvas.clientWidth, text_canvas.clientHeight)
  //   text_ctx.font = "20px 微软雅黑";
  //   text_ctx.textAlign = 'content'
  //   arr.map((v, i) => {
  //     if (v) {
  //       let length = v.length * 5
  //       text_ctx.fillText(v, text_canvas.clientWidth / 2 - length, text_canvas.clientHeight / 2 + (i * 20) - (arr.length / 2 * 20))
  //     }
  //   })
  // }
}
