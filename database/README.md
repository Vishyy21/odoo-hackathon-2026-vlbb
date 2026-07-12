# TransitOps Database Module

## Overview

This folder contains the complete SQLite database implementation for the TransitOps Fleet Management System developed during the Odoo Hackathon 2026.

---

## Database Files

| File | Description |
|------|-------------|
| schema.sql | Database schema with tables, constraints and foreign keys |
| seed.sql | Sample data for development and testing |
| indexes.sql | Performance indexes |
| views.sql | Dashboard and reporting views |
| er-diagram.md | Mermaid ER diagram |

---

## Tables

- Users
- Drivers
- Vehicles
- Trips
- Maintenance
- Fuel Logs
- Expenses

---

## Relationships

- Vehicle → Trips
- Driver → Trips
- Vehicle → Maintenance
- Vehicle → Fuel Logs
- Trip → Expenses

---

## Features

- Foreign Keys
- CHECK Constraints
- UNIQUE Constraints
- Timestamp Tracking
- Dashboard Views
- Indexed Columns

---

## Database

SQLite

---

## Author

Lakshya Dogra