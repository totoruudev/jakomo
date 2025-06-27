package com.jakomo.app.service;

import com.jakomo.app.dto.CollabSofaDTO;
import com.jakomo.app.entity.CollabSofa;
import com.jakomo.app.repository.CollabSofaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CollabSofaService {
    private final CollabSofaRepository collabSofaRepository;

    public List<CollabSofaDTO> getVisibleCollabSofas() {
        List<CollabSofa> sofas = collabSofaRepository.findByVisibleOrderByDisplayOrderAsc(true);
        return sofas.stream().map(this::toDTO).collect(Collectors.toList());
    }

    private CollabSofaDTO toDTO(CollabSofa sofa) {
        CollabSofaDTO dto = new CollabSofaDTO();
        dto.setId(sofa.getId());
        dto.setName(sofa.getName());
        dto.setImage(sofa.getImage());
        dto.setLink(sofa.getLink());
        return dto;
    }
}
