package com.jakomo.app.controller;

import com.jakomo.app.dto.NoticeDto;
import com.jakomo.app.service.NoticeService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/support/notice")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class NoticeController {

    private final NoticeService noticeService;

    // 전체 공지 목록 (페이징, 중요 > 최신순)
    @GetMapping
    public ResponseEntity<Page<NoticeDto>> getPaged(
            @PageableDefault(size = 10, sort = {"isImportant", "regdate"}, direction = org.springframework.data.domain.Sort.Direction.DESC)
            Pageable pageable
    ) {
        return ResponseEntity.ok(noticeService.getPagedDtoList(pageable));
    }

    // 전체 공지 목록 (페이징 없이, 만약 필요하다면)
    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return ResponseEntity.ok(noticeService.getAll());
    }

    // 공지 상세
    @GetMapping("/{id}")
    public ResponseEntity<NoticeDto> getNotice(@PathVariable("id") Long id) {
        return ResponseEntity.ok(noticeService.getNoticeDto(id));
    }

    // 공지 등록 (관리자만)
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NoticeDto> createNotice(@RequestBody NoticeDto dto) {
        return ResponseEntity.ok(noticeService.createNoticeAndReturnDto(dto));
    }

    // 공지 수정 (관리자만)
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<NoticeDto> updateNotice(@PathVariable Long id, @RequestBody NoticeDto dto) {
        return ResponseEntity.ok(noticeService.updateNoticeAndReturnDto(id, dto));
    }

    // 공지 삭제 (관리자만)
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteNotice(@PathVariable Long id) {
        noticeService.deleteNotice(id);
        return ResponseEntity.noContent().build();
    }
}
