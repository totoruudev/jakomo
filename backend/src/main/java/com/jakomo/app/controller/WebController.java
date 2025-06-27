package com.jakomo.app.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@CrossOrigin(origins = "*")
public class WebController {
    // 점(.) 없는 모든 경로를 index.html로 포워딩 (정적 파일 및 api 제외)
    @RequestMapping("/")
    public String redirect() {
        return "forward:/index.html";
    }
}
