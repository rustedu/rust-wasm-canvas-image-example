use wasm_bindgen::prelude::*;
use imageproc::drawing::{draw_text_mut};

 use std::io::Cursor;
 use rusttype::{Font, Scale};

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen]
    fn alert(s: &str);

}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}


#[wasm_bindgen]
pub fn process_image(
    image_buffer: Vec<u8>,
    text: String,
    size: f32,
    color: &str,
    x: i32,
    y: i32,
) -> String {

    console_log!("initialize image by load_memory {}", color);
    // just work for png format
    let mut input_image = image::load_from_memory(&image_buffer).unwrap();

    let font = Font::try_from_bytes(include_bytes!("fangzheng.ttf")).unwrap();
    // let font = Font::try_from_bytes(include_bytes!("simhei.ttf")).unwrap();
    // let font = Font::try_from_bytes(include_bytes!("msyahei.ttf")).unwrap();
    let scale = Scale {
        x: size,
        y: size,
    };

   console_log!("drawing text");
   if color == "red" {
       draw_text_mut(&mut input_image, image::Rgba([255u8, 0u8, 0u8, 255u8]), x, y, scale, &font, &text);
   } else if color == "green" {
       draw_text_mut(&mut input_image, image::Rgba([0u8, 255u8, 0u8, 255u8]), x, y, scale, &font, &text);
   } else if color == "blue" {
       draw_text_mut(&mut input_image, image::Rgba([0u8, 0u8, 255u8, 255u8]), x, y, scale, &font, &text);
   } else if color == "white" {
       draw_text_mut(&mut input_image, image::Rgba([255u8, 255u8, 255u8, 255u8]), x, y, scale, &font, &text);
   } else {
       draw_text_mut(&mut input_image, image::Rgba([0u8, 0u8, 0u8, 255u8]), x, y, scale, &font, &text);
   }

   console_log!("writing to buffer, this maybe take long while...");
   let mut bytes: Vec<u8> = Vec::new();
   input_image.write_to(&mut Cursor::new(&mut bytes), image::ImageOutputFormat::Png).unwrap();

   console_log!("encoding base64");
   base64::encode(&bytes)

}
