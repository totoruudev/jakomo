package com.jakomo.app.controller;

import com.jakomo.app.dto.CollabSofaDTO;
import com.jakomo.app.service.CollabSofaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/collabStore")
@CrossOrigin(origins = "*")
public class CollabSofaController {
    private final CollabSofaService collabSofaService;

    @GetMapping
    public List<CollabSofaDTO> getVisibleCollabSofas() {
        return collabSofaService.getVisibleCollabSofas();
    }
}
