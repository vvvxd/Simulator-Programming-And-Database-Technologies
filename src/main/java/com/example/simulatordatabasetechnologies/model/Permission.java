package com.example.simulatordatabasetechnologies.model;

public enum Permission {
    STUDY("study"),
    ADMIN_PANEL("admin_panel"),
    ADD_ADMIN("add_admin");

    private final String permission;

    Permission(String permission) {
        this.permission = permission;
    }

    public String getPermission() {
        return permission;
    }
}