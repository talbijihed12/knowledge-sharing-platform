package com.communication.plateforme.repositry;

import com.communication.plateforme.model.Subplateforme;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SubPlateformeRepository extends JpaRepository<Subplateforme, Long> {
    Optional<Subplateforme> findByName(String subplateformeName);
}
