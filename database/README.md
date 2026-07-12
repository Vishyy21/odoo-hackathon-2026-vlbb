# TransitOps Database

SQLite database implementation for the TransitOps Fleet Management System.

## Files

- schema.sql
- seed.sql
- indexes.sql
- views.sql
- sample_queries.sql

## Tables

- USERS
- VEHICLES
- DRIVERS
- TRIPS
- MAINTENANCE
- FUEL_LOGS
- EXPENSES

## Views

- dashboard_stats
- vehicle_status_summary
- driver_status_summary
- active_trips

## Setup

Run in order:

```sql
.read schema.sql
.read seed.sql
.read indexes.sql
.read views.sql
```