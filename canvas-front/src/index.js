import { greet } from '../../canvas-rs/pkg'

greet()


window.onload = () => {
  let canvas = document.getElementById("bg_canvas")
  let text_canvas = document.getElementById("text_canvas")
  let ctx = canvas.getContext('2d');
  let text_ctx = text_canvas.getContext('2d');

  document.getElementById('fileUpload').onchange = (event) => {
    let file = event.target.files[0];
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      let result = e.target.result
      var image = new Image();
      image.src = result
      image.onload = function () {
        ctx.drawImage(image, 0, 0, 500, 500);
      }
    }
  }

  document.getElementById("inputText").oninput = (event) => {
    let text = event.target.value
    text_ctx.clearRect(0, 0, text_canvas.clientWidth, text_canvas.clientHeight)
    text_ctx.font = "20px 微软雅黑";
    let length = text.length * 5
    text_ctx.fillText(text, text_canvas.clientWidth / 2 - length, 250)
  }
}
