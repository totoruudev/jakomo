package com.jakomo.app.repository;

import com.jakomo.app.entity.Dataroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DataroomRepository extends JpaRepository<Dataroom, Long> {
}
