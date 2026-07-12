USERS
------
id
name
email
password_hash
role

           |

VEHICLES
---------
id
plate_number
model
status

           |

TRIPS
------
id
vehicle_id
driver_id
start_location
end_location
status

      |                 |

DRIVERS          EXPENSES
--------         ----------
id               id
name             trip_id
license_no       amount
status           expense_type

VEHICLES
      |

MAINTENANCE
-----------
id
vehicle_id
maintenance_type
cost

VEHICLES
      |

FUEL_LOGS
---------
id
vehicle_id
litres
cost