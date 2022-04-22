/*
 * @Description: 绘图实例
 * @Version: 1.0
 * @Autor: jiajun wu
 * @Date: 2022-04-22 15:25:15
 * @LastEditors: jiajun wu
 * @LastEditTime: 2022-04-22 18:13:44
 */
use super::*;
use std::{cell::RefCell, collections::HashMap, fmt::format, rc::Rc};
use wasm_bindgen::JsCast;
use web_sys::{
    window, CanvasRenderingContext2d, DomRect, Event, FileReader, HtmlCanvasElement,
    HtmlImageElement, HtmlInputElement,
};

#[wasm_bindgen]
pub struct Diagram {
    id_name: String,
    /// 上传控件id
    upload_name: String,
    /// 文本控件id
    text_name: String,
    canvas_dom: Option<HtmlCanvasElement>,
    context: Option<CanvasRenderingContext2d>,
    canvas_dom_rect: Option<DomRect>,
    child_ctx: HashMap<String, CanvasRenderingContext2d>,
}

#[wasm_bindgen]
impl Diagram {
    /// js 构造函数
    #[wasm_bindgen(constructor)]
    pub fn new(id_name: String, upload_name: String, text_name: String) -> Self {
        Self {
            id_name,
            canvas_dom: None,
            context: None,
            canvas_dom_rect: None,
            child_ctx: HashMap::new(),
            upload_name,
            text_name,
        }
    }

    /// 初始化画布
    pub fn init(&mut self) {
        let document = window().unwrap().document().unwrap();
        let dom_element = document.get_element_by_id(&self.id_name);
        if dom_element.is_none() {
            error(&format!("界面中暂无id为{:?}的元素", &self.id_name));
        }

        let dom_element = dom_element.unwrap();
        let canvas_dom_rect = dom_element.get_bounding_client_rect();

        let canvas = document.create_element("canvas").unwrap();

        let canvas_dom: HtmlCanvasElement = canvas
            .dyn_into::<HtmlCanvasElement>()
            .map_err(|_| ())
            .unwrap();
        canvas_dom.set_width(canvas_dom_rect.width() as u32);
        canvas_dom.set_height(canvas_dom_rect.height() as u32);
        canvas_dom.set_class_name("canvas");
        canvas_dom.set_text_content(Some("您的浏览器不支持canvasDom标签。"));

        if self.canvas_dom.is_some() {
            dom_element
                .remove_child(&self.canvas_dom.as_ref().unwrap())
                .unwrap();
        }
        dom_element.append_child(&canvas_dom).unwrap();

        let context = canvas_dom
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();

        self.canvas_dom = Some(canvas_dom);
        self.canvas_dom_rect = Some(canvas_dom_rect);
        self.context = Some(context);

        let canvas_dom_rect = &self.canvas_dom_rect.as_ref().unwrap();
        let context = &self.context.as_ref().unwrap();

        // 清除绘图
        context.clear_rect(0.0, 0.0, canvas_dom_rect.width(), canvas_dom_rect.height());

        self.init_upload();
    }

    /// 初始化上传控件事件
    pub fn init_upload(&mut self) {
        let document = window().unwrap().document().unwrap();
        let dom_element = document.query_selector(&self.upload_name).unwrap();
        if dom_element.is_none() {
            error(&format!("界面中暂无id为{:?}的元素", &self.upload_name));
        }
        let dom_element: HtmlInputElement = dom_element.unwrap().dyn_into().unwrap();

        let context = Rc::new(self.context.clone().unwrap());

        let closure = Closure::wrap(Box::new(move |event: web_sys::Event| {
            let element = event
                .target()
                .unwrap()
                .dyn_into::<HtmlInputElement>()
                .unwrap();
            let context = context.clone();
            let file_list = element.files().unwrap();

            let _file = file_list.get(0).expect("should have a file handle.");
            let file_reader = FileReader::new().unwrap().dyn_into::<FileReader>().unwrap();
            let onload = Closure::wrap(Box::new(move |event: Event| {
                let context = context.clone();

                let element = event.target().unwrap().dyn_into::<FileReader>().unwrap();
                let data = element.result().unwrap();

                let image = HtmlImageElement::new().unwrap();
                image.set_src(data.as_string().unwrap().as_str());

                let _image = Rc::new(image.clone());

                let onload = Closure::wrap(Box::new(move |_event: Event| {
                    log(&format!("{:?}", _image));
                    context
                        .draw_image_with_html_image_element_and_dw_and_dh(
                            &_image.clone(),
                            0.0,
                            0.0,
                            500.0,
                            500.0,
                        )
                        .unwrap();

                    log(&format!("{:?}", context));
                }) as Box<dyn FnMut(_)>);
                image.set_onload(Some(onload.as_ref().unchecked_ref()));
                onload.forget();
            }) as Box<dyn FnMut(_)>);

            file_reader.read_as_data_url(&_file).unwrap();
            file_reader.set_onloadend(Some(onload.as_ref().unchecked_ref()));
            onload.forget();
        }) as Box<dyn FnMut(_)>);

        dom_element
            .add_event_listener_with_callback("change", closure.as_ref().unchecked_ref())
            .unwrap();

        closure.forget();
    }
}
