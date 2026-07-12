<div align="center">

# 🗄️ TransitOps Database

### Database Module for the TransitOps Fleet Management System

**Odoo Hackathon 2026**

---

![Database](https://img.shields.io/badge/Database-SQLite-003B57?logo=sqlite)
![SQL](https://img.shields.io/badge/Language-SQL-blue)
![Status](https://img.shields.io/badge/Status-Completed-success)
![Version](https://img.shields.io/badge/Version-1.0-orange)

</div>

---

# 📖 Overview

The **TransitOps Database Module** serves as the backbone of the Fleet Management System. It is designed using **SQLite** with a focus on scalability, simplicity, and efficient data retrieval.

This module stores and manages information related to:

- 🚚 Vehicles
- 👨‍✈️ Drivers
- 🛣️ Trips
- 🔧 Maintenance
- ⛽ Fuel Logs
- 💰 Expenses
- 👤 User Authentication

---

# 🏗️ Database Architecture

```text
                USERS
                  │
                  │
        ┌─────────┴─────────┐
        │                   │
     DRIVERS           VEHICLES
        │                   │
        └─────────┬─────────┘
                  │
                TRIPS
               /     \
              /       \
      EXPENSES     FUEL_LOGS
                    │
               MAINTENANCE
```

---

# 📂 Folder Structure

```text
database/

├── schema.sql
├── seed.sql
├── indexes.sql
├── views.sql
├── sample_queries.sql
├── er-diagram.md
├── README.md
└── transitops.db
```

---

# 📄 File Description

| File | Description |
|------|-------------|
| `schema.sql` | Creates all database tables |
| `seed.sql` | Inserts sample records |
| `indexes.sql` | Improves query performance |
| `views.sql` | Dashboard and reporting views |
| `sample_queries.sql` | Frequently used SQL queries |
| `er-diagram.md` | Database relationship diagram |
| `transitops.db` | SQLite database file |

---

# 📊 Database Tables

| Table | Purpose |
|--------|----------|
| USERS | Authentication & Roles |
| VEHICLES | Fleet Information |
| DRIVERS | Driver Records |
| TRIPS | Trip Management |
| MAINTENANCE | Vehicle Service Records |
| FUEL_LOGS | Fuel Consumption |
| EXPENSES | Operational Expenses |

---

# ⚡ Performance Optimizations

✔ Database Indexes

✔ Foreign Key Relationships

✔ Dashboard Views

✔ Optimized Search Queries

✔ Relational Database Design

---

# 📈 Dashboard Views

The following SQL Views are available:

- 📊 Dashboard Statistics
- 🚚 Vehicle Status Summary
- 👨‍✈️ Driver Status Summary
- 🛣️ Active Trips

These views simplify analytics and improve dashboard performance.

---

# 🚀 Setup

## Create Database

```bash
sqlite3 transitops.db
```

## Execute Scripts

```sql
.read schema.sql
.read seed.sql
.read indexes.sql
.read views.sql
```

---

# 🧪 Sample Queries

Examples are available inside:

```text
sample_queries.sql
```

Useful for:

- Dashboard Analytics
- Fleet Monitoring
- Driver Availability
- Active Trips
- Reporting

---

# 🔐 Database Features

- SQLite Relational Database
- Primary & Foreign Keys
- Constraints
- Indexing
- SQL Views
- Sample Dataset
- Optimized Queries

---

# 📷 ER Diagram

Refer to:

```text
er-diagram.md
```

for the complete Entity Relationship Diagram.

---

# 👨‍💻 Developed By

## **Lakshya Dogra**

**Database Developer**

Odoo Hackathon 2026

Responsibilities:

- Database Design
- Schema Development
- SQL Optimization
- Views & Indexes
- Seed Data
- Database Documentation
- Query Library

---

# 📌 Notes

- Built using SQLite
- Compatible with the TransitOps Backend
- Optimized for fast dashboard retrieval
- Designed for easy future scalability

---

<div align="center">

### 🚀 TransitOps Database Module

Designed & Developed by **Lakshya Dogra**

⭐ Odoo Hackathon 2026 ⭐

</div>
