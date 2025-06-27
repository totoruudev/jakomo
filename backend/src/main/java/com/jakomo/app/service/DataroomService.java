package com.jakomo.app.service;

import com.jakomo.app.entity.Dataroom;
import com.jakomo.app.repository.DataroomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class DataroomService {

    private final DataroomRepository dataroomRepository;

    // 업로드 경로 (yml에서 주입, 기본값: uploads/dataroom)
    @Value("${upload.dataroom-path:uploads/dataroom}")
    private String uploadDir;

    // 자료 등록
    public Dataroom save(String title, String content, MultipartFile file) throws IOException {

        // 1) 디렉터리 자동 생성
        Path dir = Paths.get(uploadDir);
        if (Files.notExists(dir)) {
            Files.createDirectories(dir);
            log.info("📁 업로드 디렉터리 생성: {}", dir.toAbsolutePath());
        }

        // 파일명 중복 방지
        String original = file.getOriginalFilename();
        String savedName = UUID.randomUUID() + "_" + original;

        // 실제 파일 저장
        Path dest = dir.resolve(savedName);
        file.transferTo(dest);

        // DB 저장
        Dataroom dataroom = Dataroom.builder()
                .title(title)
                .content(content)
                .originalFilename(original)
                .filename(savedName)          // 서버에 저장된 이름
                .filepath(dest.toString())    // 전체 경로 (옵션)
                .filesize(file.getSize())
                .build();

        return dataroomRepository.save(dataroom);
    }

    // 목록 & 조회
    public List<Dataroom> findAll() {
        return dataroomRepository.findAll();
    }

    public Dataroom findById(Long id) {
        return dataroomRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("자료가 없습니다: " + id));
    }

    // 삭제
    public void delete(Long id) {
        Dataroom dataroom = findById(id);

        // DB 삭제
        dataroomRepository.deleteById(id);

        // 파일 삭제
        Path path = Paths.get(uploadDir).resolve(dataroom.getFilename());
        try {
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.warn("❗ 파일 삭제 실패: {}", path, e);
        }
    }
}
