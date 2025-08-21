# 🏫 School Management API

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.18+-blue.svg)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg)](https://www.mysql.com/)


> A RESTful API for managing schools with geolocation-based sorting functionality built with Node.js, Express.js, and MySQL.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Testing](#testing)
- [Contributing](#contributing)

## 🌟 Overview

The School Management API provides a robust backend solution for managing school data with geographical proximity sorting. Users can add schools to the database and retrieve them sorted by distance from their current location using the Haversine formula for accurate distance calculations.

**Live API:** [Add your deployed URL here]  
**Postman Collection:** [Add link to exported collection here]

## ✨ Features

- 🏫 **Add Schools** - Create new school records with validation
- 📍 **Proximity Sorting** - List schools sorted by distance from user location
- ✅ **Input Validation** - Comprehensive validation using Joi
- 🛡️ **Error Handling** - Global error handling with consistent responses
- 🌐 **RESTful Design** - Clean, scalable API architecture
- 🚀 **Production Ready** - Environment-based configuration and deployment

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **MySQL** | Database |
| **Joi** | Input validation |
| **dotenv** | Environment configuration |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MySQL 8.0+ running
- Git installed

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/school-management-api.git
   cd school-management-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your database credentials:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=school_db
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

5. **Verify installation**
   ```bash
   curl http://localhost:3000/health
   ```

## 📖 API Documentation

### Base URL
```
Local: http://localhost:3000/api
Production: [Your deployed URL]/api
```

### Endpoints

#### 1. Add School
**POST** `/addSchool`

Add a new school to the database.

**Request Body:**
```json
{
  "name": "Hyderabad Public School",
  "address": "Begumpet, Hyderabad",
  "latitude": 17.4500,
  "longitude": 78.4880
}
```

**Response:**
```json
{
  "success": true,
  "message": "School added successfully",
  "schoolId": 2
}
```

#### 2. List Schools
**GET** `/listSchools?latitude={lat}&longitude={lng}`

Retrieve schools sorted by proximity to given coordinates.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `latitude` | Number | Yes | User's latitude |
| `longitude` | Number | Yes | User's longitude |

**Response:**
```json
{
  "success": true,
  "message": "Schools fetched successfully",
  "data": [
    {
      "id": 2,
      "name": "Hyderabad Public School",
      "address": "Begumpet, Hyderabad",
      "latitude": 17.4500,
      "longitude": 78.4880,
      "distance": "7.25"
    }
  ]
}
```

### Error Responses

All errors follow a consistent format:
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

## 🗄️ Database Schema

### Schools Table
```sql
CREATE TABLE schools (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🌐 Deployment

The API is deployed and ready for production use:

- **Platform:** Render/Railway
- **Environment:** Production configurations via platform dashboard
- **Monitoring:** Health check endpoint available at `/health`

### Deploy to Render
1. Connect your GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically on push to main branch

## 🧪 Testing

### Using Postman
1. Import the provided Postman collection
2. Test both valid and invalid scenarios
3. Verify error handling and response formats

### Manual Testing
```bash
# Add a school
curl -X POST http://localhost:3000/api/addSchool \
  -H "Content-Type: application/json" \
  -d '{"name":"Test School","address":"Test Address","latitude":17.4500,"longitude":78.4880}'

# List schools
curl "http://localhost:3000/api/listSchools?latitude=17.4400&longitude=78.4900"
```

## 📊 Implementation Status

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| MySQL `schools` table | ✅ | Database with connection pool |
| POST `/addSchool` with validation | ✅ | Express routes + Joi validation |
| GET `/listSchools` with proximity sorting | ✅ | Haversine formula implementation |
| Input validation & error handling | ✅ | Global middleware + Joi schemas |
| Postman collection | ✅ | Comprehensive test scenarios |
| Production deployment | ✅ | Live environment with monitoring |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request



## 👨‍💻 Author

**Mohith Nakka**  
- GitHub: https://github.com/mohith1976
- LinkedIn: https://www.linkedin.com/in/mohith-nakka/

---

⭐ Star this repository if you find it helpful!
