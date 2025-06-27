package com.jakomo.app.controller;

import com.jakomo.app.entity.Dataroom;
import com.jakomo.app.service.DataroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dataroom")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DataroomController {

    private final DataroomService dataroomService;

    // 자료 등록
    @PostMapping
    public ResponseEntity<Dataroom> uploadDataroom(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("file") MultipartFile file) throws IOException {

        Dataroom saved = dataroomService.save(title, content, file);
        return ResponseEntity.ok(saved);
    }

    // 전체 목록 조회
    @GetMapping
    public ResponseEntity<List<Dataroom>> list() {
        return ResponseEntity.ok(dataroomService.findAll());
    }

    // 상세 조회
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable("id") Long id) {
        Dataroom dataroom = dataroomService.findById(id);
        if (dataroom == null) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "자료를 찾을 수 없습니다.");
            return ResponseEntity.status(404).body(error);
        }
        return ResponseEntity.ok(dataroom);
    }

    // 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable("id") Long id) {
        dataroomService.delete(id);
        Map<String, String> result = new HashMap<>();
        result.put("message", "삭제 완료");
        return ResponseEntity.ok(result);
    }
}
