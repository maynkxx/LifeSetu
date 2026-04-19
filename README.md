# LifeSetu — Disaster Resource Coordination System

## Overview

LifeSetu is a backend system designed to efficiently coordinate resources during emergencies and disasters. It connects help requests with the nearest available resources using geospatial querying and a priority-based matching system.

---

## Features

### Core Functionality

* Geo-based Matching Engine

  * Uses MongoDB 2dsphere indexing
  * Finds nearest available resources in real-time

* Request Lifecycle Management

  * `pending → matched → in_progress → completed`

* Resource Management

  * Register and track availability of resources (ambulances, beds, etc.)

---

### Advanced Backend Features

* Filtering (`?status=pending`, `?available=true`)
* Pagination (`?page=1&limit=5`)
* Sorting (`?sort=-createdAt`)
* Optimized queries using MongoDB geospatial operators

---

## Tech Stack

* Backend: Node.js, Express.js
* Database: MongoDB (Mongoose)
* Architecture: Controller → Service → Model (Layered Design)

---

## API Endpoints

### Resources

* `POST /resources` → Create resource
* `GET /resources` → Get all resources

  * Supports filtering, pagination, sorting

---

### Requests

* `POST /requests` → Create request
* `GET /requests` → Get all requests

  * Supports filtering, pagination, sorting

---

### Matching

* `POST /match/:requestId`

  * Matches a request with the nearest available resource
  * Updates resource availability and request status

---

## How to Run Locally

```bash
# Clone the repo
git clone <your-repo-url>

# Install dependencies
npm install

# Add environment variables
PORT=5001
MONGO_URI=your_mongodb_connection

# Run server
npm run dev
```

---

## Key Concepts Implemented

* Geospatial Queries (`$geoNear`, `$near`)
* Service Layer Architecture (OOP-style separation)
* REST API Design (filters, pagination, sorting)
* State Management for real-world workflows

---

## Future Improvements

* Real-time updates (WebSockets)
* Authentication (JWT-based)
* Frontend dashboard (React)
* Multi-tenant support for NGOs

---

## Contribution

This project is open for improvements and contributions.

---

## License

MIT License
