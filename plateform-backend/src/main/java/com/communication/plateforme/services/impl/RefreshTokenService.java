package com.communication.plateforme.services.impl;

import com.communication.plateforme.utils.exceptions.SpringPlateformeException;
import com.communication.plateforme.repositry.RefreshTokenRepository;
import com.communication.plateforme.model.RefreshToken;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@AllArgsConstructor
@Transactional
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken generateRefreshToken() {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        return refreshTokenRepository.save(refreshToken);
    }

    void validateRefreshToken(String token) {
        refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new SpringPlateformeException("Invalid refresh token"));

    }


    public void deleteRefreshToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }
}
