const wasm = import("../pkg")

const BASE_64_PROXY = "data:image/png;base64, ";
let data = {
    file: null,
    text:  {
        value: 'Rust 开发',
        size: 56,
        color: 'white',
        position: { x: 142.0, y: 138.0 }
    },
}
let currentImageBase64Buffer = null;
let fileName = ''
let dom = {
    upload: null,
    inputText: null,
    inputSize: null,
    radios: null ,
    posX: null,
    posY: null,
    output: null,
    loading: null,
    downloadBtn: null,
    compositeBtn: null
}

// waiting rust composite image with text
const composite = () => {
    const { value, size, color, position } = data.text
    if(currentImageBase64Buffer && value && size && color && position.x && position.y) {

        wasm.then(m => {
            dom.downloadBtn.classList.add('download-btn-hidden')
            dom.output.src = ''
            dom.output.alt = ''
            dom.loading.classList.add('lds-dual-ring')
            setTimeout(() => {
                let blob = m.process_image(currentImageBase64Buffer, value, size, color, +position.x, +position.y)
                dom.output.src = BASE_64_PROXY + blob;
                dom.output.alt = fileName;
                dom.downloadBtn.classList.remove('download-btn-hidden')
                dom.loading.classList.remove('lds-dual-ring')
            }, 10)
        })
    } else {
        alert("lacking of composite parameters!")
    }
}

const handleUploadFile = function(event) {
    const fr = new FileReader();
    const file = event.target.files[0]
    fileName = file.name

    fr.addEventListener("load", function(e) {
        let buffer = e.target.result;
        currentImageBase64Buffer = new Uint8Array(buffer)
    })
    
    fr.readAsArrayBuffer(file)
}

document.addEventListener("DOMContentLoaded", function() { 
    dom.upload = document.getElementById('upload');
    dom.inputText = document.getElementById('text-input');
    dom.inputSize = document.getElementById('text-size');
    dom.radios = document.querySelectorAll('input[type=radio][name="color"]');
    dom.posX = document.getElementById('position-x');
    dom.posY = document.getElementById('position-y');
    dom.output = document.getElementById("output")
    dom.downloadBtn = document.getElementById("download-btn")
    dom.compositeBtn = document.getElementById("composite-btn")
    dom.loading = document.getElementById("loading")


    // upload
    dom.upload.addEventListener('change', handleUploadFile, false);

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

    // composite
    dom.compositeBtn.addEventListener('click', composite)

    // download
    const downloadImage = () => {
        const anchor = document.createElement('a');
        anchor.href = dom.output.src;
        anchor.download = dom.output.alt
        anchor.click();
    }
    dom.downloadBtn.addEventListener('click', downloadImage)
});