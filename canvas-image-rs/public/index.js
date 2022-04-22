const wasm = import("../pkg")

let data = {
    file: null,
    text:  {
        value: '想插入的文字中文hello',
        size: 40,
        color: 'red',
        position: { x: 50.0, y: 50.0 }
    },
}
let dom = {
    upload: null,
    inputText: null,
    inputSize: null,
    radios: null ,
    posX: null,
    posY: null
}

const handleUploadFile = function(event) {

    console.log(data.text)
    const { value, size, color, position } = data.text
    if(value && size && color && position.x && position.y ) {

        const fr = new FileReader();
        const file = event.target.files[0]

        fr.addEventListener("load", function(e) {
            let buffer = e.target.result;
            // waiting rust process upload image
            wasm.then(m => {
                let base64result = new Uint8Array(buffer)
                let blob =  m.process_image(base64result, value, size, color, +position.x, +position.y)
                document.getElementById("output").src = "data:image/png;base64, " + blob;
            })
            
        })
        
        fr.readAsArrayBuffer(file)
    } else {
        alert("Please complated text info editing!")
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    dom.upload = document.getElementById('upload');
    dom.inputText = document.getElementById('text-input');
    dom.inputSize = document.getElementById('text-size');
    dom.radios = document.querySelectorAll('input[type=radio][name="color"]');
    dom.posX = document.getElementById('position-x');
    dom.posY = document.getElementById('position-y');


    // upload
    dom.upload.addEventListener('change', handleUploadFile);

    // text
    dom.inputText.value = data.text.value;
    dom.inputText.addEventListener('change', function(event) {
        data.text.value = event.target.value.trim();
    });
    // size
    dom.inputSize.value = data.text.size;
    dom.inputSize.addEventListener('change', function(event) {
        data.text.size = event.target.value.trim();
    });
    
    // color
    function radioChange() {
        data.text.color = this.value
    }
    Array.prototype.forEach.call(dom.radios, function(radio) {
        radio.addEventListener('change', radioChange);
    });

    // position
    dom.posX.value = data.text.position.x;
    dom.posX.addEventListener('change', function(event) {
        data.text.position.x = event.target.value.trim();
    });
    dom.posY.value = data.text.position.y;
    dom.posY.addEventListener('change', function(event) {
        data.text.position.y = event.target.value.trim();
    });
});