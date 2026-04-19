# API Testing Guide - LifeSetu

This guide provides sample payloads and commands to test the LifeSetu backend APIs.

## 1. POST /resources
Create a new resource in the system.

### Sample Payload
```json
{
  "type": "Ambulance",
  "quantity": 2,
  "location": {
    "type": "Point",
    "coordinates": [77.2090212, 28.6139391]
  },
  "available": true
}
```

### Curl Command
```bash
curl -X POST http://localhost:5000/resources \
     -H "Content-Type: application/json" \
     -d '{
       "type": "Ambulance",
       "quantity": 2,
       "location": {
         "type": "Point",
         "coordinates": [77.2090, 28.6139]
       }
     }'
```

### Expected Success Response (201 Created)
```json
{
  "success": true,
  "data": {
    "type": "Ambulance",
    "quantity": 2,
    "location": {
      "type": "Point",
      "coordinates": [77.209, 28.6139]
    },
    "available": true,
    "_id": "643e...",
    "createdAt": "2026-04-19T...",
    "updatedAt": "2026-04-19T..."
  }
}
```

---

## 2. POST /requests
Create a new relief request.

### Sample Payload
```json
{
  "type": "Ambulance",
  "severity": "high",
  "location": {
    "type": "Point",
    "coordinates": [77.2100, 28.6150]
  }
}
```

### Curl Command
```bash
curl -X POST http://localhost:5000/requests \
     -H "Content-Type: application/json" \
     -d '{
       "type": "Ambulance",
       "severity": "high",
       "location": {
         "type": "Point",
         "coordinates": [77.2100, 28.6150]
       }
     }'
```

### Expected Success Response (201 Created)
```json
{
  "success": true,
  "data": {
    "type": "Ambulance",
    "severity": "high",
    "location": {
      "type": "Point",
      "coordinates": [77.21, 28.615]
    },
    "status": "pending",
    "assignedResourceId": null,
    "_id": "643f...",
    "createdAt": "2026-04-19T...",
    "updatedAt": "2026-04-19T..."
  }
}
```

---

## Testing with Postman

1. **Open Postman** and create a new request.
2. **Method**: Select `POST`.
3. **URL**: Enter `http://localhost:5000/resources` or `http://localhost:5000/requests`.
4. **Headers**: Add `Content-Type: application/json`.
5. **Body**: 
   - Select the `raw` radio button.
   - Choose `JSON` from the dropdown.
   - Paste the sample JSON payload from above.
6. **Send**: Click the "Send" button and check the response.

## Pro Tip: Proximity Testing
After creating a resource and a request near each other, try the proximity search endpoint I added:
`GET http://localhost:5000/requests/[REQUEST_ID]/nearby-resources?distance=5000` (distance in meters).
