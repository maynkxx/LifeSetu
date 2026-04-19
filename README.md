# LifeSetu - Disaster Resource Coordination System

LifeSetu is a high-performance **Multi-tenant SaaS Platform** built for real-time disaster relief and resource coordination.

## Technical Architecture
* **Backend:** Node.js & Express.js with a modular controller-route-model architecture.
* **Database:** MongoDB with Mongoose for flexible, geospatial data storage.
* **Geospatial Features:** 2dsphere indexing for efficient proximity-based resource matching.

## Getting Started

### Prerequisites
* Node.js (v14+)
* MongoDB

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Resources
* `POST /resources` - Create a new resource.
* `GET /resources` - Get all resources.

### Requests
* `POST /requests` - Create a new relief request.
* `GET /requests` - Get all requests.
* `GET /requests/:id/nearby-resources` - Find available resources of the same type near the request location.

## Data Models

### Resource
- `type`: String (e.g., "Ambulance", "Water", "Food")
- `quantity`: Number
- `location`: GeoJSON Point [lng, lat]
- `available`: Boolean

### Request
- `type`: String
- `severity`: Enum (low, medium, high)
- `location`: GeoJSON Point [lng, lat]
- `status`: Enum (pending, matched, in_progress, completed)
- `assignedResourceId`: ObjectId (reference to Resource)

---
Built with focus on speed and reliability for humanitarian relief.
