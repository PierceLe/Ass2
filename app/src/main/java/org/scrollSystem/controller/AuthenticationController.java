package org.scrollSystem.controller;

import jakarta.validation.Valid;
import org.scrollSystem.request.AuthenticationRequest;
import org.scrollSystem.request.RegisterRequest;
import org.scrollSystem.response.AuthenticationResponse;
import org.scrollSystem.response.DefaultResponse;
import org.scrollSystem.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> register(
            @RequestBody @Valid RegisterRequest request
    ) {
        return DefaultResponse.success(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<DefaultResponse<AuthenticationResponse>> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return DefaultResponse.success(authenticationService .authenticate(request));
    }
}
