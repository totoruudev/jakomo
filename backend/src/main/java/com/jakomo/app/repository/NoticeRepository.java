package com.jakomo.app.repository;

import com.jakomo.app.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
	// 중요공지 먼저 최신 등록일 순 정렬
    List<Notice> findAllByOrderByIsImportantDescRegdateDesc();

    Page<Notice> findAllByOrderByIsImportantDescRegdateDesc(Pageable pageable);
    // 중요 공지만
    // List<Notice> findByIsImportantTrueOrderByRegdateDesc();
    // 일반 공지만
    // List<Notice> findByIsImportantFalseOrderByRegdateDesc();

}
