# TaskFlow Data Flow Conventions

This document outlines the established data flow patterns for TaskFlow using Hexagonal Architecture (Davi Vieira approach).

## Architecture Overview

**Hexagonal Architecture Components:**
- **Domain Layer**: Entities, value objects, business rules, and use case interfaces
- **Application Layer**: Application services that implement use case interfaces
- **Infrastructure Layer**: Adapters (repositories, controllers, external services)

## Data Flow Pattern

```
HTTP Request → Controller → App Service → Domain → App Service → Controller → HTTP Response
     ↓            ↓           ↓           ↓         ↑           ↑            ↑
   JSON        DTO    try/catch    throws      Result        DTO         JSON
                                 DomainError
```

## Layer Responsibilities

### **1. Controllers (Infrastructure)**
- **Input**: Convert HTTP JSON to DTOs
- **Output**: Convert Result objects to HTTP JSON responses
- **Error Handling**: Transform Result failures to appropriate HTTP status codes

```typescript
export class UserController {
  async register(req: Request, res: Response): Promise<void> {
    const dto = { email: req.body.email, username: req.body.username };
    
    const result = await this.registerUserService.execute(dto);
    
    if (result.isSuccess()) {
      res.status(201).json({
        success: true,
        data: result.getValue()
      });
    } else {
      res.status(400).json({
        success: false,
        error: { message: result.getError() }
      });
    }
  }
}
```

### **2. Application Services (Application)**
- **Input**: Receive DTOs from controllers
- **Output**: Return Result objects (never throw exceptions)
- **Error Handling**: Catch domain exceptions and wrap in Result.fail()
- **Success**: Wrap domain objects in Result.ok() with DTOs

```typescript
export class RegisterUserService implements RegisterUserUseCase {
  async execute(dto: RegisterUserDto): Promise<Result<UserDto, string>> {
    try {
      // Domain operations may throw
      const email = Email.create(dto.email);
      const user = User.create({ email, username: dto.username });
      
      await this.userRepository.save(user);
      
      // Convert domain object to DTO
      return Result.ok({
        id: user.getId(),
        email: user.getEmail(),
        username: user.getUsername()
      });
      
    } catch (error) {
      // Catch domain errors and convert to Result
      return Result.fail(error.message);
    }
  }
}
```

### **3. Use Case Interfaces (Domain)**
- **Purpose**: Define contracts for application services
- **Location**: Domain layer (not application layer)
- **Return**: Result objects for consistency

```typescript
// Domain layer interface
export interface RegisterUserUseCase {
  execute(dto: RegisterUserDto): Promise<Result<UserDto, string>>;
}
```

### **4. Domain Entities & Value Objects (Domain)**
- **Input**: Primitive values or other domain objects
- **Output**: Domain objects on success
- **Error Handling**: Throw custom domain errors on business rule violations
- **No Result Objects**: Domain doesn't know about Result pattern

```typescript
export class Email {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(input: string): Email {
    // Business rule validation
    if (!input?.trim()) {
      throw new DomainError('Email is required');
    }

    const email = input.toLowerCase().trim();
    
    if (!email.includes('@')) {
      throw new DomainError('Invalid email format');
    }

    // Business rule: no disposable emails
    const disposableDomains = ['tempmail.org', '10minutemail.com'];
    const domain = email.split('@')[1];
    if (disposableDomains.includes(domain)) {
      throw new DomainError('Disposable email addresses are not allowed');
    }

    return new Email(email);
  }
}

export class User {
  public static create(props: { email: Email; username: string }): User {
    // Validation and business rules
    if (!props.username?.trim()) {
      throw new DomainError('Username is required');
    }

    return new User(crypto.randomUUID(), props.email, props.username);
  }
}
```

## Error Types

### **Domain Errors**
```typescript
export class DomainError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'DomainError';
  }
}
```

### **Result Type**
```typescript
export class Result<T, E = string> {
  private constructor(
    private readonly success: boolean,
    private readonly value?: T,
    private readonly error?: E
  ) {}

  static ok<T>(value: T): Result<T, string> {
    return new Result(true, value);
  }

  static fail<T>(error: string): Result<T, string> {
    return new Result(false, undefined, error);
  }

  isSuccess(): boolean { return this.success; }
  isFailure(): boolean { return !this.success; }
  getValue(): T { return this.value!; }
  getError(): E { return this.error!; }
}
```

## Data Transfer Objects (DTOs)

### **Request DTOs**
```typescript
export interface RegisterUserDto {
  email: string;
  username: string;
  password: string;
}
```

### **Response DTOs**
```typescript
export interface UserDto {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}
```

## Key Benefits

1. **Clean Domain**: Domain focuses purely on business rules without Result handling
2. **Explicit Errors**: Application layer explicitly handles all domain errors
3. **Type Safety**: Result pattern provides compile-time error handling safety
4. **Testability**: Each layer can be tested in isolation
5. **Consistency**: Same error handling pattern across all use cases

## Rules Summary

- **Domain Layer**: Throw domain errors, return domain objects
- **Application Layer**: Catch domain errors, return Result objects
- **Infrastructure Layer**: Convert Results to HTTP responses
- **Use Case Interfaces**: Defined in domain, implemented in application
- **DTOs**: Used at layer boundaries (Controller ↔ Application)
- **No Exceptions**: Above domain layer (Application/Infrastructure use Results)

This pattern ensures clean separation of concerns while maintaining explicit error handling throughout the application.