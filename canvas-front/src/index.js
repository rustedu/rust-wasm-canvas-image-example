import greet from '../../canvas-rs/pkg'
function v() {
  greet().then(res => {
    console.log(res.greet())
  })
};
v()