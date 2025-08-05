# TaskFlow Business Rules

This directory contains the complete business rules for TaskFlow, a Trello-like task management application.

## Overview

TaskFlow is organized around the following core entities:
- **Boards**: Top-level containers for organizing work
- **Lists**: Columns within boards that represent workflow stages
- **Cards**: Individual tasks that move through lists
- **Users**: People who can access and interact with boards

## Business Rules Structure

- [Boards](./boards.md) - Board creation, management, and permissions
- [Lists](./lists.md) - List organization, ordering, and lifecycle
- [Cards](./cards.md) - Card management, movement, and properties
- [Users](./users.md) - User roles, permissions, and access control
- [Workflows](./workflows.md) - Cross-entity business processes

## Core Principles

1. **Hierarchy**: Boards contain Lists, Lists contain Cards
2. **Ownership**: Clear ownership and permission model
3. **Flexibility**: Support various workflow patterns
4. **Collaboration**: Multiple users can work on shared boards
5. **Traceability**: All changes are tracked and auditable

## Domain Boundaries

Each business rule document corresponds to a domain in our Hexagonal Architecture:
- `src/domains/board/` - Board management
- `src/domains/list/` - List management  
- `src/domains/card/` - Card management
- `src/domains/user/` - User and permissions management