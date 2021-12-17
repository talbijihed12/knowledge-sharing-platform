package com.communication.plateforme.controller;

import com.communication.plateforme.services.impl.SubplateformeService;
import com.communication.plateforme.utils.transferObject.SubplateformeTO;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/subplateforme")
@AllArgsConstructor
@Slf4j
public class SubPlateformeController {
    private final SubplateformeService subplateformeService;

    @PostMapping
    public ResponseEntity<SubplateformeTO> createSubplateforme(@RequestBody SubplateformeTO subplateformeTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(subplateformeService.save(subplateformeTO));


    }

    @GetMapping("/{id}")
    public ResponseEntity<SubplateformeTO> getSubplateforme(@PathVariable Long id) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(subplateformeService.getSubplateforme(id));
    }

    @GetMapping
    public ResponseEntity<List<SubplateformeTO>> getAllSubplateforme() {
        return ResponseEntity.status(HttpStatus.OK).body(subplateformeService.getAll());
    }
}
