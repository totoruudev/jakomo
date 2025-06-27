package com.jakomo.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UploadController {

    @Value("${upload.path}")
    private String uploadPath; // 예: /Users/coy/jakomo/uploads

    @PostMapping("/upload")
    public Map<String, String> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Map<String, String> response = new HashMap<>();

        // 업로드 경로가 비어있는 경우 예외 처리
        if (file.isEmpty()) {
            response.put("error", "파일이 비어 있습니다.");
            return response;
        }

        // 디렉토리 없으면 생성
        File dir = new File(uploadPath);
        if (!dir.exists()) dir.mkdirs();

        // 파일명 유니크하게 변경
        String originalName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String newFileName = uuid + "_" + originalName;

        // 저장할 파일 경로 설정
        File savedFile = new File(dir, newFileName);

        // 실제 저장
        file.transferTo(savedFile);

        // 프론트에 보낼 경로: /uploads/uuid_filename.jpg
        String imageUrl = "/uploads/" + newFileName;
        response.put("url", imageUrl);

        return response;
    }
}
