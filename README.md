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
- **JWT** (jsonwebtoken) for authentication tokens
- **dotenv** for environment configuration

### Frontend
- **React 19** with TypeScript
- **Vite** for fast development and building
- **React Router** for client-side routing
- **Tailwind CSS v4** with OKLCH color system
- **shadcn/ui** component library with Radix UI
- **Lucide React** for icons
- **Redux Toolkit** for state management
- **TanStack Query** for server state management
- **Axios** for HTTP client
- **Zod** for client-side validation
- **Bulletproof React** architecture

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
└── client/                   # React frontend
    ├── src/
    │   ├── app/              # App-level configuration & providers
    │   ├── components/       # Shared UI components & layouts
    │   ├── features/         # Feature-based modules
    │   │   └── auth/         # Authentication features
    │   ├── assets/           # Static assets and images
    │   ├── lib/              # Library configurations and wrappers
    │   └── hooks/            # Shared React hooks
    └── public/               # Static public assets
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm

### Environment Setup

1. Create a `.env` file in the server directory with your MongoDB connection and JWT secrets:
   ```env
   MONGODB_URI=mongodb://localhost:27017/TaskFlow
   # or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/TaskFlow
   
   JWT_SECRET=your-secret-key-here
   JWT_REFRESH_SECRET=your-refresh-secret-key-here
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

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Run linting:
   ```bash
   npm run lint
   ```

The client will start on `http://localhost:5173` with hot reload enabled.

## Architecture

TaskFlow follows **Hexagonal Architecture** for the backend and **Bulletproof React** architecture for the frontend with clean separation of concerns:

### Backend Architecture

### Layers
- **Domain Layer**: Business entities, value objects, and business rules (pure TypeScript)
- **Application Layer**: Use cases and application services that implement domain interfaces
- **Infrastructure Layer**: Database adapters, web controllers, and external service integrations

### Key Components
- **Dependency Injection Container**: Manages object creation and dependency resolution
- **Result Pattern**: Consistent error handling across layers without exceptions
- **Value Objects**: Rich domain objects with built-in validation
- **Use Case Interfaces**: Domain-defined contracts implemented by application services

### Frontend Architecture

The client application follows **Bulletproof React** patterns:

- **Feature-Based Organization**: Self-contained feature modules with their own components, hooks, and API calls
- **Shared Components**: Reusable UI components built with shadcn/ui and Radix primitives
- **Layered Architecture**: Clear separation between presentation, business logic, and data access
- **Type Safety**: Full TypeScript coverage with Zod validation

### Current Implementation

**Backend:**
- **User Domain**: Complete user registration and login with JWT authentication
- **JWT Authentication**: Access and refresh token support with configurable expiration times
- **Server Orchestration**: Clean startup/shutdown lifecycle management
- **Database Connection**: MongoDB with Mongoose, connection pooling, and error handling

**Frontend:**
- **Public Layout**: Landing page, login, and registration forms
- **Authentication UI**: Complete login/signup flow with form validation
- **Component Library**: shadcn/ui components with Tailwind CSS styling
- **Routing**: React Router with layout-based routing structure

## Documentation

- [API Specification](./docs/api-specification.md) - Complete REST API documentation with business rule mapping
- [Data Flow Conventions](./docs/data-flow-conventions.md) - Architecture patterns and data flow guidelines  
- [Domain Models](./docs/domain-models.md) - Core domain entity definitions and relationships
- [Business Rules](./docs/business-rules/) - Comprehensive rules for boards, lists, cards, users, and workflows

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.