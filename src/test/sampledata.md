Perfect! Here’s a **set of sample data entries** for your Dereja app models. This will help you **seed the database or test your backend**.

---

## **1. Stop Sample Data**

```json
[
  { "name": "Addis Ababa Central", "lat": 9.03, "lng": 38.74, "code": "AA-CENT" },
  { "name": "Bole Airport", "lat": 8.98, "lng": 38.80, "code": "BOL-AIR" },
  { "name": "Meskel Square", "lat": 9.02, "lng": 38.76, "code": "MSQ" }
]
```

---

## **2. Route Sample Data**

```json
[
  { "name": "Airport Express", "vehicleType": "Bus", "stops": [], "code": "AE-01" },
  { "name": "City Loop", "vehicleType": "Minibus", "stops": [], "code": "CL-01" }
]
```

*(You can later populate the `stops` array with Stop ObjectIds.)*

---

## **3. Trip Sample Data**

```json
[
  { 
    "route": "ROUTE_ID_1", 
    "startTime": "06:00", 
    "endTime": "06:45", 
    "days": ["Mon","Tue","Wed","Thu","Fri"], 
    "vehicleId": "BUS-101" 
  },
  { 
    "route": "ROUTE_ID_2", 
    "startTime": "07:00", 
    "endTime": "08:00", 
    "days": ["Sat","Sun"], 
    "vehicleId": "MINI-201" 
  }
]
```

---

## **4. User Sample Data**

```json
[
  { 
    "name": "Yohans Bekele", 
    "email": "yohans@example.com", 
    "password": "password123", 
    "role": "user",
    "favorites": []
  },
  { 
    "name": "Admin User", 
    "email": "admin@example.com", 
    "password": "adminpass", 
    "role": "admin",
    "favorites": []
  }
]
```

*(Passwords will be hashed by the User model pre-save hook.)*

---

## **5. Ticket Sample Data**

```json
[
  {
    "user": "USER_ID_1",
    "trip": "TRIP_ID_1",
    "type": "one-ride",
    "price": 20,
    "status": "active",
    "validFrom": "2025-09-06T06:00:00Z",
    "validTo": "2025-09-06T23:59:59Z"
  },
  {
    "user": "USER_ID_1",
    "trip": "TRIP_ID_2",
    "type": "monthly",
    "price": 500,
    "status": "active",
    "validFrom": "2025-09-01T00:00:00Z",
    "validTo": "2025-09-30T23:59:59Z"
  }
]
```

---

## **6. Subscription Sample Data**

```json
[
  {
    "user": "USER_ID_1",
    "type": "monthly",
    "startDate": "2025-09-01T00:00:00Z",
    "endDate": "2025-09-30T23:59:59Z",
    "status": "active"
  },
  {
    "user": "USER_ID_2",
    "type": "yearly",
    "startDate": "2025-01-01T00:00:00Z",
    "endDate": "2025-12-31T23:59:59Z",
    "status": "active"
  }
]
```

---

## **7. Payment Sample Data**

```json
[
  {
    "user": "USER_ID_1",
    "ticket": "TICKET_ID_1",
    "subscription": null,
    "amount": 20,
    "method": "card",
    "status": "completed",
    "transactionId": "TXN1001"
  },
  {
    "user": "USER_ID_1",
    "ticket": null,
    "subscription": "SUBS_ID_1",
    "amount": 500,
    "method": "mobile-money",
    "status": "completed",
    "transactionId": "TXN1002"
  }
]
```

---

✅ **Notes:**

* Replace `"USER_ID_1"`, `"TRIP_ID_1"`, `"TICKET_ID_1"`, etc., with the **actual MongoDB ObjectIds** after creating entries.
* You can use these JSON objects with a **seed script** to populate your database quickly.

---


