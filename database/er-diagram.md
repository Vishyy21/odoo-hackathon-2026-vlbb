# 🗄️ TransitOps Database ER Diagram

The following Entity Relationship Diagram represents the database structure of the **TransitOps Fleet Management System**.

```mermaid
erDiagram

    USERS {
        INTEGER id PK
        TEXT name
        TEXT email
        TEXT password_hash
        TEXT role
    }

    VEHICLES {
        INTEGER id PK
        TEXT plate_number
        TEXT model
        TEXT status
    }

    DRIVERS {
        INTEGER id PK
        TEXT name
        TEXT license_no
        TEXT status
    }

    TRIPS {
        INTEGER id PK
        INTEGER vehicle_id FK
        INTEGER driver_id FK
        TEXT start_location
        TEXT end_location
        DATE start_date
        DATE end_date
        TEXT status
    }

    MAINTENANCE {
        INTEGER id PK
        INTEGER vehicle_id FK
        TEXT maintenance_type
        TEXT description
        REAL cost
        DATE maintenance_date
        TEXT status
    }

    FUEL_LOGS {
        INTEGER id PK
        INTEGER vehicle_id FK
        REAL litres
        REAL cost
        DATE fuel_date
        INTEGER odometer_reading
    }

    EXPENSES {
        INTEGER id PK
        INTEGER trip_id FK
        TEXT expense_type
        REAL amount
        TEXT description
        DATE expense_date
    }

    VEHICLES ||--o{ TRIPS : assigned_to
    DRIVERS ||--o{ TRIPS : drives

    VEHICLES ||--o{ MAINTENANCE : requires
    VEHICLES ||--o{ FUEL_LOGS : consumes

    TRIPS ||--o{ EXPENSES : generates
```

---

## 📌 Relationship Summary

| Parent | Child | Relationship |
|---------|--------|--------------|
| VEHICLES | TRIPS | One Vehicle → Many Trips |
| DRIVERS | TRIPS | One Driver → Many Trips |
| VEHICLES | MAINTENANCE | One Vehicle → Many Maintenance Records |
| VEHICLES | FUEL_LOGS | One Vehicle → Many Fuel Logs |
| TRIPS | EXPENSES | One Trip → Many Expenses |

---

## Database Tables

- 👤 USERS
- 🚚 VEHICLES
- 👨‍✈️ DRIVERS
- 🛣️ TRIPS
- 🔧 MAINTENANCE
- ⛽ FUEL_LOGS
- 💰 EXPENSES

---

### Developed By

**Lakshya Dogra**  
Database Developer • Odoo Hackathon 2026