# Odonto Guardião Backend Service

## 📋 Project Overview

The Odonto Guardião Backend Service is a REST API that supports the Odonto Guardião application, a platform designed to facilitate dental care reports and management of dental health complaints in the community. This service handles complaint submissions, document processing, and provides integration points for the frontend application.

The backend serves as the core processing engine for:
- Complaint submission and validation
- PDF document processing and storage
- Regional council routing based on geographic location
- Protocol generation and tracking
- Integration with external services

## 🚀 Technologies Used

### Core Technologies
- **Node.js** (v18+) - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Multer** - File upload handling
- **UUID** - Unique identifier generation

### Database & Storage
- **PostgreSQL** - Primary database
- **Prisma ORM** - Database ORM and migrations
- **AWS S3** / **Local Storage** - File storage for PDFs

### Development & Testing
- **Jest** - Testing framework
- **Supertest** - API testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Nodemon** - Development server
- **ts-node** - TypeScript execution

### Security & Validation
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Joi** / **Zod** - Request validation
- **Rate limiting** - API protection

### Documentation
- **Swagger/OpenAPI** - API documentation
- **JSDoc** - Code documentation

## 📁 Project Structure

```
backend/
├── src/
│   ├── controllers/         # Route controllers
│   │   ├── complaint.controller.ts
│   │   └── health.controller.ts
│   ├── services/           # Business logic
│   │   ├── complaint.service.ts
│   │   ├── pdf.service.ts
│   │   └── storage.service.ts
│   ├── models/             # Database models
│   │   ├── complaint.model.ts
│   │   └── index.ts
│   ├── middleware/         # Express middleware
│   │   ├── auth.middleware.ts
│   │   ├── validation.middleware.ts
│   │   └── error.middleware.ts
│   ├── routes/             # API routes
│   │   ├── complaint.routes.ts
│   │   ├── health.routes.ts
│   │   └── index.ts
│   ├── config/             # Configuration files
│   │   ├── database.ts
│   │   ├── storage.ts
│   │   └── app.ts
│   ├── types/              # TypeScript type definitions
│   │   ├── complaint.types.ts
│   │   └── common.types.ts
│   ├── utils/              # Utility functions
│   │   ├── logger.ts
│   │   ├── validators.ts
│   │   └── protocol-generator.ts
│   └── app.ts              # Application entry point
├── tests/                  # Test files
│   ├── unit/
│   ├── integration/
│   └── __mocks__/
├── docs/                   # Documentation
│   ├── api.md
│   └── deployment.md
├── scripts/                # Build and deployment scripts
├── prisma/                 # Database schema and migrations
│   ├── schema.prisma
│   └── migrations/
├── uploads/                # Local file storage (dev only)
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
├── jest.config.js
├── docker-compose.yml
├── Dockerfile
└── README.md
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn** package manager
- **PostgreSQL** v12 or higher
- **Git** for version control

### 1. Clone the Repository

```bash
git clone https://github.com/huandrey/odonto-guardiao-app.git
cd odonto-guardiao-app/backend
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using yarn
yarn install
```

### 3. Environment Setup

1. Copy the environment template:
```bash
cp .env.example .env
```

2. Configure environment variables in `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/odonto_guardiao"

# Storage Configuration
STORAGE_TYPE=local  # Options: local, s3
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_REGION=us-east-1
S3_BUCKET_NAME=odonto-guardiao-documents

# Security
JWT_SECRET=your_jwt_secret_key
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=http://localhost:5173

# Logging
LOG_LEVEL=info
```

### 4. Database Setup

1. Start PostgreSQL service
2. Create the database:
```sql
CREATE DATABASE odonto_guardiao;
```

3. Run database migrations:
```bash
npx prisma migrate dev
```

4. Generate Prisma client:
```bash
npx prisma generate
```

### 5. Running the Development Server

```bash
# Using npm
npm run dev

# Using yarn
yarn dev
```

The server will start on `http://localhost:3001` by default.

### 6. Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api/v1
```

### Core Endpoints

#### Health Check
```http
GET /health
```
Response: `200 OK`
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00Z",
  "version": "1.0.0"
}
```

#### Submit Complaint
```http
POST /denuncia
Content-Type: multipart/form-data
```

**Request Body:**
- `protocolo` (string): Unique protocol identifier
- `regiao` (string): Regional area (norte, sul, leste, oeste)
- `pdf` (file): PDF document containing the complaint

**Response:** `201 Created`
```json
{
  "message": "Denúncia enviada com sucesso",
  "protocolo": "ODG-2024-001234"
}
```

**Error Response:** `400 Bad Request`
```json
{
  "error": "Validation error",
  "details": [
    {
      "field": "protocolo",
      "message": "Protocol is required"
    }
  ]
}
```

### Interactive API Documentation

Access the Swagger UI documentation at:
```
http://localhost:3001/api-docs
```

## 🧪 Testing Strategy

### Unit Tests
- Test individual functions and methods
- Mock external dependencies
- Focus on business logic validation

### Integration Tests
- Test API endpoints end-to-end
- Test database interactions
- Test file upload functionality

### Test Commands
```bash
# Run unit tests
npm run test:unit

# Run integration tests
npm run test:integration

# Run specific test file
npm test -- complaint.service.test.ts
```

## 🚀 Deployment

### Docker Deployment

1. Build the Docker image:
```bash
docker build -t odonto-guardiao-backend .
```

2. Run with Docker Compose:
```bash
docker-compose up -d
```

### Production Environment

1. Set production environment variables
2. Run database migrations:
```bash
npx prisma migrate deploy
```

3. Build the application:
```bash
npm run build
```

4. Start the production server:
```bash
npm start
```

## 📚 Additional Resources

### API Documentation
- [Complete API Reference](./docs/api.md)
- [Interactive Swagger Documentation](http://localhost:3001/api-docs)

### Development Guides
- [Database Schema Documentation](./docs/database.md)
- [Deployment Guide](./docs/deployment.md)
- [Contributing Guidelines](./docs/CONTRIBUTING.md)

## 🤝 Contributing

We welcome contributions to the Odonto Guardião Backend Service! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Ensure all tests pass: `npm test`
5. Run linting: `npm run lint`
6. Commit your changes: `git commit -m "Add new feature"`
7. Push to the branch: `git push origin feature/new-feature`
8. Submit a pull request

### Code Style Guidelines
- Follow TypeScript best practices
- Write comprehensive tests for new features
- Document public APIs with JSDoc
- Follow the existing code structure and naming conventions

### Pull Request Process
1. Ensure your code passes all tests and linting
2. Update documentation as needed
3. Add appropriate labels to your PR
4. Request review from maintainers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [existing issues](https://github.com/huandrey/odonto-guardiao-app/issues)
2. Create a new issue with detailed description
3. Contact the development team

## 🏗️ Architecture Overview

### Request Flow
1. Frontend sends multipart form data to `/denuncia` endpoint
2. Multer middleware handles file upload
3. Request validation middleware validates input
4. Complaint service processes the data
5. PDF is stored (locally or S3)
6. Database record is created
7. Response with protocol is sent back

### Error Handling
- Global error middleware catches all errors
- Structured error responses with appropriate HTTP status codes
- Detailed logging for debugging
- Client-safe error messages

### Security Measures
- Rate limiting to prevent abuse
- CORS configuration for frontend integration
- Input validation and sanitization
- Secure file upload handling
- Environment-based configuration