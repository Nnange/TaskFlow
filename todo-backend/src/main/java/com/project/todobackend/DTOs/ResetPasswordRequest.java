package com.project.todobackend.DTOs;

public class ResetPasswordRequest {
    private String token;
    private String newPassword;

    public String getToken() {
        return token;
    }
    public String getNewPassword() {
        return newPassword;
    }
}
