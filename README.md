# TaskFlow

A Trello-like task management application built with modern web technologies and clean architecture principles.

## Features

- **Boards**: Create and manage project boards
- **Lists**: Organize tasks in customizable workflow columns
- **Cards**: Create detailed task cards with descriptions, due dates, and assignments
- **Collaboration**: Multi-user support with role-based permissions
- **Real-time Updates**: Live collaboration features

## Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express.js** web framework
- **MongoDB** with **Mongoose** ODM
- **Jest** and **Supertest** for testing
- **Hexagonal Architecture** for clean code organization

### Frontend (Coming Soon)
- **React** with TypeScript
- Modern UI components and responsive design

## Project Structure

```
TaskFlow/
├── docs/                   # Documentation
│   └── business-rules/     # Comprehensive business rules
├── server/                 # Node.js backend
│   ├── src/
│   │   ├── config/         # Server and database configuration
│   │   └── domains/        # Domain-driven design structure
│   └── tests/              # Test files
└── client/                 # React frontend (coming soon)
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

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

The server will start on `http://localhost:8080` with a health check endpoint at `/health-check`.

## Architecture

TaskFlow follows **Hexagonal Architecture** principles with clear separation of concerns:

- **Domain Layer**: Business logic and entities
- **Application Layer**: Use cases and application services  
- **Infrastructure Layer**: Database, external services, and adapters

Each domain is organized into `application/`, `domain/`, and `infrastructure/` directories.

## Documentation

- [Business Rules](./docs/business-rules/) - Comprehensive rules for boards, lists, cards, users, and workflows

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the established patterns
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License.