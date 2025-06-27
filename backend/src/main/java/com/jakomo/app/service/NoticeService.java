package com.jakomo.app.service;

import com.jakomo.app.dto.NoticeDto;
import com.jakomo.app.entity.Notice;
import com.jakomo.app.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;

    // Notice -> NoticeDto 변환
    private NoticeDto toDto(Notice notice) {
        NoticeDto dto = new NoticeDto();
        dto.setId(notice.getId());
        dto.setTitle(notice.getTitle());
        dto.setContent(notice.getContent());
        dto.setImportant(notice.isImportant());
        dto.setRegdate(notice.getRegdate() != null ? notice.getRegdate().toString() : null);
        return dto;
    }

    // 전체 공지 목록 (중요 > 최신순)
    public List<NoticeDto> getAll() {
        return noticeRepository.findAllByOrderByIsImportantDescRegdateDesc()
                .stream()
                .map(this::toDto)
                .toList();
    }

    // 페이징 공지 목록 (중요 > 최신순)
    public Page<NoticeDto> getPagedDtoList(Pageable pageable) {
        return noticeRepository.findAllByOrderByIsImportantDescRegdateDesc(pageable)
                .map(this::toDto);
    }

    // 단일 공지 조회 (엔티티)
    public Notice getNotice(Long id) {
        return noticeRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("공지사항 없음"));
    }

    // 단일 공지 조회 (DTO)
    public NoticeDto getNoticeDto(Long id) {
        return toDto(getNotice(id));
    }

    // 공지 등록 (엔티티)
    public Notice createNotice(NoticeDto dto) {
        Notice notice = Notice.builder()
                .title(dto.getTitle())
                .content(dto.getContent())
                .isImportant(dto.isImportant())
                .build();
        return noticeRepository.save(notice);
    }

    // 공지 등록 (DTO 반환)
    public NoticeDto createNoticeAndReturnDto(NoticeDto dto) {
        return toDto(createNotice(dto));
    }

    // 공지 수정 (엔티티)
    public Notice updateNotice(Long id, NoticeDto dto) {
        Notice notice = getNotice(id);
        notice.setTitle(dto.getTitle());
        notice.setContent(dto.getContent());
        notice.setImportant(dto.isImportant());
        return noticeRepository.save(notice);
    }

    // 공지 수정 (DTO 반환)
    public NoticeDto updateNoticeAndReturnDto(Long id, NoticeDto dto) {
        return toDto(updateNotice(id, dto));
    }

    // 공지 삭제
    public void deleteNotice(Long id) {
        noticeRepository.deleteById(id);
    }
}
