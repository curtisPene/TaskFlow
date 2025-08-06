# TaskFlow

A Trello-like task management application built with modern web technologies and clean architecture principles using Hexagonal Architecture.

## Features

- **User Management**: Registration and authentication with secure password handling
- **Boards**: Create and manage project boards with role-based access
- **Lists**: Organize tasks in customizable workflow columns
- **Cards**: Create detailed task cards with descriptions, due dates, and assignments
- **Collaboration**: Multi-user support with role-based permissions
- **Real-time Updates**: Live collaboration features (coming soon)

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** web framework
- **MongoDB** with **Mongoose** ODM
- **Jest** and **Supertest** for testing
- **Hexagonal Architecture** (Davi Vieira approach)
- **Dependency Injection Container** for clean dependency management
- **Zod** for data validation
- **bcrypt** for password hashing
- **dotenv** for environment configuration

### Frontend (Coming Soon)
- **React** with TypeScript
- Modern UI components and responsive design

## Project Structure

```
TaskFlow/
├── docs/                     # Documentation
│   ├── api-specification.md  # Complete REST API documentation
│   ├── data-flow-conventions.md # Architecture patterns and data flow
│   ├── domain-models.md      # Core domain entity definitions
│   └── business-rules/       # Comprehensive business rules
├── server/                   # Node.js backend
│   ├── src/
│   │   ├── Server.ts         # Main application orchestrator
│   │   ├── config/           # Server and database configuration
│   │   ├── domains/          # Hexagonal architecture domains
│   │   │   └── user/         # User domain implementation
│   │   │       ├── application/  # Use cases and app services
│   │   │       ├── domain/       # Business entities and logic
│   │   │       └── infrastructure/ # Adapters and external services
│   │   └── lib/              # Shared utilities and types
│   └── tests/                # Test files
└── CLAUDE.md                 # Development guidelines and context
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Environment Setup

1. Create a `.env` file in the server directory with your MongoDB connection:
   ```env
   MONGODB_URI=mongodb://localhost:27017/TaskFlow
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/TaskFlow
   ```

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Run tests:
   ```bash
   npm test
   ```

5. Run tests in watch mode:
   ```bash
   npm run test:watch
   ```

The server will start on `http://localhost:8080` with a health check endpoint at `/health-check`.

## Architecture

TaskFlow follows **Hexagonal Architecture** (Davi Vieira approach) with clean separation of concerns:

### Layers
- **Domain Layer**: Business entities, value objects, and business rules (pure TypeScript)
- **Application Layer**: Use cases and application services that implement domain interfaces
- **Infrastructure Layer**: Database adapters, web controllers, and external service integrations

### Key Components
- **Dependency Injection Container**: Manages object creation and dependency resolution
- **Result Pattern**: Consistent error handling across layers without exceptions
- **Value Objects**: Rich domain objects with built-in validation
- **Use Case Interfaces**: Domain-defined contracts implemented by application services

### Current Implementation
- **User Domain**: Complete user registration and authentication
- **Server Orchestration**: Clean startup/shutdown lifecycle management
- **Database Connection**: MongoDB with Mongoose, connection pooling, and error handling

## Documentation

- [API Specification](./docs/api-specification.md) - Complete REST API documentation with business rule mapping
- [Data Flow Conventions](./docs/data-flow-conventions.md) - Architecture patterns and data flow guidelines  
- [Domain Models](./docs/domain-models.md) - Core domain entity definitions and relationships
- [Business Rules](./docs/business-rules/) - Comprehensive rules for boards, lists, cards, users, and workflows
- [CLAUDE.md](./CLAUDE.md) - Development guidelines and project context for Claude Code

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.