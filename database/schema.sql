-- =====================================================
-- TransitOps Database Schema
-- Odoo Hackathon 2026
-- Database: SQLite
-- Author: Lakshya Dogra
-- =====================================================

PRAGMA foreign_keys = ON;

-- =====================================================
-- USERS
-- =====================================================

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    full_name TEXT NOT NULL,

    email TEXT NOT NULL UNIQUE,

    password_hash TEXT NOT NULL,

    role TEXT NOT NULL
        CHECK(role IN ('Admin', 'Manager')),

    created_at TEXT DEFAULT CURRENT_TIMESTAMP,

    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);