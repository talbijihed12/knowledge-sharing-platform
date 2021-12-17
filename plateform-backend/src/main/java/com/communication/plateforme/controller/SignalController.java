package com.communication.plateforme.controller;

import com.communication.plateforme.services.impl.SignalService;
import com.communication.plateforme.utils.transferObject.SignalTO;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/signal")
@AllArgsConstructor
public class SignalController {
    private final SignalService signalService;

    @PreAuthorize("hasRole('USER')")
    @PostMapping
    public ResponseEntity<Void> signaler(@RequestBody SignalTO signalTO) {
        signalService.signaler(signalTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/comment")
    public ResponseEntity<Void> signalerComment(@RequestBody SignalTO signalTO) {
        signalService.signalerComment(signalTO);
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
