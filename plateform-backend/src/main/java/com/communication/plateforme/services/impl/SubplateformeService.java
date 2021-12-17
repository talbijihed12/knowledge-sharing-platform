package com.communication.plateforme.services.impl;

import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.utils.mapper.SubplateformeMapper;
import com.communication.plateforme.repositry.SubPlateformeRepository;
import com.communication.plateforme.utils.transferObject.SubplateformeTO;
import com.communication.plateforme.model.Subplateforme;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static java.util.stream.Collectors.toList;


@AllArgsConstructor
@Service
@Slf4j

public class SubplateformeService {
    private final SubPlateformeRepository subPlateformeRepository;
    private final SubplateformeMapper subplateformeMapper;

    @Transactional
    public SubplateformeTO save(SubplateformeTO subplateformeTO) {
        Subplateforme save = subPlateformeRepository.save(subplateformeMapper.mapTOTosubplateforme(subplateformeTO));
        subplateformeTO.setId(save.getId());
        return subplateformeTO;
    }

    @Transactional(readOnly = true)
    public List<SubplateformeTO> getAll() {
        return subPlateformeRepository.findAll().stream().map(subplateformeMapper::mapSubplatefromeToTO).collect(toList());
    }


    public SubplateformeTO getSubplateforme(Long id) {
        Subplateforme subplateforme = subPlateformeRepository.findById(id)
                .orElseThrow(() -> new SpringPlateformeException("No subplateforme found with id " + id));
        return subplateformeMapper.mapSubplatefromeToTO(subplateforme);
    }
}
