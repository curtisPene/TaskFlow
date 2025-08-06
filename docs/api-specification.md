# TaskFlow API Specification

This document defines the complete REST API for TaskFlow, a Trello-like task management application. All endpoints are mapped to specific business rules defined in the [business rules documentation](./business-rules/).

## API Base URL

```
Production: https://api.taskflow.com/api
Development: http://localhost:8080/api
```

## Authentication

All API endpoints except registration, login, and health checks require authentication via Bearer token in the `Authorization` header:

```
Authorization: Bearer <jwt_token>
```

## Rate Limiting

- **Standard Users**: 1000 requests/hour, 100 requests/minute burst (BR-U-021)
- **Premium Users**: Higher limits apply
- Rate limit headers included in all responses

## Error Responses

All errors follow consistent format:
```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {}
  }
}
```

---

## Authentication & Users API

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
```
**Business Rule**: BR-U-001 (User Registration)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "username": "johndoe",
  "displayName": "John Doe"
}
```

**Response**: `201 Created`
```json
{
  "message": "Registration successful. Please verify your email.",
  "userId": "uuid"
}
```

#### Login User
```
POST /api/auth/login
```
**Business Rule**: BR-U-003 (Authentication Rules)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**: `200 OK`
```json
{
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "username": "johndoe",
    "displayName": "John Doe"
  }
}
```

#### Logout User
```
POST /api/auth/logout
```

**Response**: `200 OK`

#### Refresh Token
```
POST /api/auth/refresh
```

**Request Body**:
```json
{
  "refreshToken": "refresh_token"
}
```

#### Forgot Password
```
POST /api/auth/forgot-password
```
**Business Rule**: BR-U-003 (Password reset tokens)

**Request Body**:
```json
{
  "email": "user@example.com"
}
```

#### Reset Password
```
POST /api/auth/reset-password
```

**Request Body**:
```json
{
  "token": "reset_token",
  "newPassword": "newSecurePassword123"
}
```

#### Verify Email
```
POST /api/auth/verify-email
```

**Request Body**:
```json
{
  "token": "verification_token"
}
```

### User Profile Endpoints

#### Get Current User
```
GET /api/users/me
```

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "username": "johndoe",
  "displayName": "John Doe",
  "avatar": "avatar_url",
  "createdAt": "2024-01-01T00:00:00Z",
  "preferences": {
    "theme": "light",
    "timezone": "UTC",
    "language": "en"
  }
}
```

#### Update User Profile
```
PUT /api/users/me
```
**Business Rule**: BR-U-009 (Profile Updates)

**Request Body**:
```json
{
  "displayName": "John Smith",
  "avatar": "new_avatar_url"
}
```

#### Deactivate Account
```
DELETE /api/users/me
```
**Business Rule**: BR-U-007 (Account Deactivation)

#### Get User Activity
```
GET /api/users/me/activity
```
**Business Rule**: BR-U-016 (Activity Tracking)

**Query Parameters**:
- `limit`: Number of activities (default: 20, max: 100)
- `offset`: Pagination offset

#### Get Login History
```
GET /api/users/me/sessions
```
**Business Rule**: BR-U-017 (Login History)

**Response**: `200 OK`
```json
{
  "sessions": [
    {
      "id": "session_id",
      "loginAt": "2024-01-01T00:00:00Z",
      "ipAddress": "192.168.1.1",
      "userAgent": "Mozilla/5.0...",
      "current": true
    }
  ]
}
```

#### Revoke Session
```
DELETE /api/users/me/sessions/:sessionId
```
**Business Rule**: BR-U-023 (Session Management)

#### Export User Data
```
POST /api/users/me/export
```
**Business Rule**: BR-U-018 (Data Export)

**Response**: `202 Accepted`
```json
{
  "exportId": "uuid",
  "status": "processing",
  "estimatedCompletion": "2024-01-01T12:00:00Z"
}
```

### Two-Factor Authentication

#### Enable 2FA
```
POST /api/users/me/2fa/enable
```
**Business Rule**: BR-U-022 (Two-Factor Authentication)

**Response**: `200 OK`
```json
{
  "qrCode": "data:image/png;base64,...",
  "secret": "base32_secret",
  "recoveryCodes": ["code1", "code2", ...]
}
```

#### Disable 2FA
```
POST /api/users/me/2fa/disable
```

**Request Body**:
```json
{
  "token": "123456"
}
```

#### Verify 2FA Token
```
POST /api/users/me/2fa/verify
```

**Request Body**:
```json
{
  "token": "123456"
}
```

---

## Boards API

### Board Management

#### List User's Boards
```
GET /api/boards
```

**Query Parameters**:
- `archived`: Include archived boards (default: false)
- `workspace`: Filter by workspace ID

**Response**: `200 OK`
```json
{
  "boards": [
    {
      "id": "uuid",
      "name": "My Project Board",
      "description": "Project management board",
      "visibility": "private",
      "createdAt": "2024-01-01T00:00:00Z",
      "role": "owner",
      "listsCount": 3,
      "membersCount": 5
    }
  ]
}
```

#### Create Board
```
POST /api/boards
```
**Business Rules**: BR-B-001 (Board Name Requirements), BR-B-002 (Board Creation Permissions), BR-B-003 (Board Initialization)

**Request Body**:
```json
{
  "name": "New Project Board",
  "description": "Description of the board",
  "visibility": "private",
  "workspaceId": "workspace_uuid"
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "name": "New Project Board",
  "description": "Description of the board",
  "visibility": "private",
  "createdAt": "2024-01-01T00:00:00Z",
  "lists": [
    {
      "id": "uuid",
      "name": "To Do",
      "position": 1
    }
  ]
}
```

#### Get Board Details
```
GET /api/boards/:boardId
```

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "name": "My Project Board",
  "description": "Project management board",
  "visibility": "private",
  "background": {
    "type": "color",
    "value": "#0079bf"
  },
  "createdAt": "2024-01-01T00:00:00Z",
  "lists": [
    {
      "id": "uuid",
      "name": "To Do",
      "position": 1,
      "cardsCount": 5
    }
  ],
  "members": [
    {
      "userId": "uuid",
      "username": "johndoe",
      "displayName": "John Doe",
      "role": "owner",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "labels": [
    {
      "id": "uuid",
      "name": "Bug",
      "color": "#eb5a46"
    }
  ]
}
```

#### Update Board
```
PUT /api/boards/:boardId
```
**Business Rules**: BR-B-010 (Board Description), BR-B-011 (Board Background)

**Request Body**:
```json
{
  "name": "Updated Board Name",
  "description": "Updated description",
  "background": {
    "type": "color",
    "value": "#026aa7"
  }
}
```

#### Delete Board
```
DELETE /api/boards/:boardId
```
**Business Rule**: BR-B-006 (Board Deletion)

**Response**: `200 OK`
```json
{
  "message": "Board scheduled for deletion",
  "deletionDate": "2024-02-01T00:00:00Z"
}
```

#### Archive Board
```
POST /api/boards/:boardId/archive
```
**Business Rule**: BR-B-012 (Board Archive)

#### Restore Archived Board
```
POST /api/boards/:boardId/restore
```

### Board Membership

#### List Board Members
```
GET /api/boards/:boardId/members
```

**Response**: `200 OK`
```json
{
  "members": [
    {
      "userId": "uuid",
      "username": "johndoe",
      "displayName": "John Doe",
      "email": "john@example.com",
      "role": "owner",
      "joinedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Invite Board Member
```
POST /api/boards/:boardId/members
```
**Business Rule**: BR-B-007 (Adding Members)

**Request Body**:
```json
{
  "email": "newmember@example.com",
  "role": "member"
}
```

#### Update Member Role
```
PUT /api/boards/:boardId/members/:userId
```
**Business Rule**: BR-B-008 (Member Roles)

**Request Body**:
```json
{
  "role": "admin"
}
```

#### Remove Board Member
```
DELETE /api/boards/:boardId/members/:userId
```
**Business Rule**: BR-B-009 (Removing Members)

#### Transfer Board Ownership
```
POST /api/boards/:boardId/members/:userId/transfer-ownership
```
**Business Rule**: BR-B-004 (Board Ownership)

### Board Settings

#### Change Board Visibility
```
PUT /api/boards/:boardId/visibility
```
**Business Rule**: BR-B-005 (Board Visibility)

**Request Body**:
```json
{
  "visibility": "team"
}
```

#### Update Board Background
```
PUT /api/boards/:boardId/background
```
**Business Rule**: BR-B-011 (Board Background)

**Request Body**:
```json
{
  "type": "image",
  "value": "image_url"
}
```

#### Get Board Activity
```
GET /api/boards/:boardId/activity
```

**Query Parameters**:
- `limit`: Number of activities (default: 20)
- `since`: ISO date for activities since

---

## Lists API

### List Management

#### Get Board Lists
```
GET /api/boards/:boardId/lists
```

**Query Parameters**:
- `archived`: Include archived lists (default: false)

**Response**: `200 OK`
```json
{
  "lists": [
    {
      "id": "uuid",
      "name": "To Do",
      "position": 1,
      "wipLimit": 0,
      "cardsCount": 5,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create List
```
POST /api/boards/:boardId/lists
```
**Business Rules**: BR-L-001 (List Name Requirements), BR-L-002 (List Creation Permissions), BR-L-003 (List Initialization)

**Request Body**:
```json
{
  "name": "In Progress"
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "name": "In Progress",
  "position": 2,
  "wipLimit": 0,
  "cardsCount": 0,
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get List Details
```
GET /api/lists/:listId
```

#### Update List
```
PUT /api/lists/:listId
```
**Business Rule**: BR-L-006 (List Editing)

**Request Body**:
```json
{
  "name": "Updated List Name"
}
```

#### Delete List
```
DELETE /api/lists/:listId
```
**Business Rules**: BR-L-007 (List Deletion Rules), BR-L-008 (List Deletion Process), BR-L-009 (Minimum Lists)

#### Archive List
```
POST /api/lists/:listId/archive
```
**Business Rule**: BR-L-011 (List Archive)

#### Restore Archived List
```
POST /api/lists/:listId/restore
```

### List Operations

#### Reorder List
```
PUT /api/lists/:listId/position
```
**Business Rules**: BR-L-004 (List Ordering), BR-L-005 (List Reordering)

**Request Body**:
```json
{
  "position": 3
}
```

#### Set WIP Limit
```
PUT /api/lists/:listId/wip-limit
```
**Business Rule**: BR-L-017 (List Settings)

**Request Body**:
```json
{
  "wipLimit": 5
}
```

#### Get List Statistics
```
GET /api/lists/:listId/stats
```
**Business Rule**: BR-L-016 (List Statistics)

**Response**: `200 OK`
```json
{
  "cardsCount": 10,
  "completedCardsCount": 3,
  "totalPoints": 25,
  "averageCardAge": 5.2
}
```

---

## Cards API

### Card Management

#### Get List Cards
```
GET /api/lists/:listId/cards
```

**Query Parameters**:
- `archived`: Include archived cards (default: false)
- `assignee`: Filter by assignee user ID
- `label`: Filter by label ID
- `sort`: Sort by position, dueDate, title, or createdAt

**Response**: `200 OK`
```json
{
  "cards": [
    {
      "id": "uuid",
      "title": "Implement user authentication",
      "description": "Add JWT-based authentication",
      "position": 1,
      "dueDate": "2024-01-15T00:00:00Z",
      "assignees": [
        {
          "userId": "uuid",
          "username": "johndoe",
          "displayName": "John Doe"
        }
      ],
      "labels": [
        {
          "id": "uuid",
          "name": "Feature",
          "color": "#61bd4f"
        }
      ],
      "checklistsCount": 1,
      "attachmentsCount": 2,
      "commentsCount": 3,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Create Card
```
POST /api/lists/:listId/cards
```
**Business Rules**: BR-C-001 (Card Title Requirements), BR-C-002 (Card Creation Permissions), BR-C-003 (Card Initialization)

**Request Body**:
```json
{
  "title": "New Task",
  "description": "Task description with **markdown**"
}
```

**Response**: `201 Created`
```json
{
  "id": "uuid",
  "title": "New Task",
  "description": "Task description with **markdown**",
  "position": 1,
  "listId": "uuid",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### Get Card Details
```
GET /api/cards/:cardId
```

**Response**: `200 OK`
```json
{
  "id": "uuid",
  "title": "Implement user authentication",
  "description": "Add JWT-based authentication system",
  "position": 1,
  "listId": "uuid",
  "dueDate": "2024-01-15T00:00:00Z",
  "assignees": [],
  "labels": [],
  "checklists": [],
  "attachments": [],
  "activity": [],
  "watchers": [],
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

#### Update Card
```
PUT /api/cards/:cardId
```
**Business Rule**: BR-C-004 (Card Description)

**Request Body**:
```json
{
  "title": "Updated title",
  "description": "Updated description"
}
```

#### Delete Card
```
DELETE /api/cards/:cardId
```
**Business Rule**: BR-C-018 (Card Deletion)

#### Archive Card
```
POST /api/cards/:cardId/archive
```
**Business Rule**: BR-C-017 (Card Archiving)

#### Restore Archived Card
```
POST /api/cards/:cardId/restore
```

### Card Operations

#### Move Card
```
PUT /api/cards/:cardId/move
```
**Business Rule**: BR-C-009 (Card Movement Between Lists)

**Request Body**:
```json
{
  "listId": "target_list_uuid",
  "position": 2
}
```

#### Reorder Card Within List
```
PUT /api/cards/:cardId/position
```
**Business Rule**: BR-C-008 (Card Position Within List)

**Request Body**:
```json
{
  "position": 3
}
```

#### Set Due Date
```
PUT /api/cards/:cardId/due-date
```
**Business Rule**: BR-C-005 (Card Due Dates)

**Request Body**:
```json
{
  "dueDate": "2024-01-15T23:59:59Z"
}
```

### Card Assignments & Labels

#### Assign Member to Card
```
POST /api/cards/:cardId/assign
```
**Business Rule**: BR-C-007 (Card Assignments)

**Request Body**:
```json
{
  "userId": "uuid"
}
```

#### Unassign Member from Card
```
DELETE /api/cards/:cardId/assign/:userId
```

#### Add Label to Card
```
POST /api/cards/:cardId/labels
```
**Business Rule**: BR-C-006 (Card Labels)

**Request Body**:
```json
{
  "labelId": "uuid"
}
```

#### Remove Label from Card
```
DELETE /api/cards/:cardId/labels/:labelId
```

#### Get Board Labels
```
GET /api/boards/:boardId/labels
```

**Response**: `200 OK`
```json
{
  "labels": [
    {
      "id": "uuid",
      "name": "Bug",
      "color": "#eb5a46"
    }
  ]
}
```

#### Create Board Label
```
POST /api/boards/:boardId/labels
```

**Request Body**:
```json
{
  "name": "New Label",
  "color": "#61bd4f"
}
```

### Card Attachments

#### Get Card Attachments
```
GET /api/cards/:cardId/attachments
```

**Response**: `200 OK`
```json
{
  "attachments": [
    {
      "id": "uuid",
      "name": "document.pdf",
      "url": "secure_url",
      "size": 1024000,
      "type": "file",
      "uploadedAt": "2024-01-01T00:00:00Z",
      "uploadedBy": {
        "userId": "uuid",
        "username": "johndoe"
      }
    }
  ]
}
```

#### Upload Attachment
```
POST /api/cards/:cardId/attachments
```
**Business Rule**: BR-C-011 (File Attachments)

**Request**: Multipart form data
- `file`: File to upload (max 25MB)

#### Delete Attachment
```
DELETE /api/cards/:cardId/attachments/:attachmentId
```

#### Add Link Attachment
```
POST /api/cards/:cardId/links
```
**Business Rule**: BR-C-012 (Link Attachments)

**Request Body**:
```json
{
  "url": "https://example.com",
  "title": "Example Website"
}
```

### Card Checklists

#### Get Card Checklists
```
GET /api/cards/:cardId/checklists
```
**Business Rule**: BR-C-013 (Checklist Management)

**Response**: `200 OK`
```json
{
  "checklists": [
    {
      "id": "uuid",
      "name": "Task Checklist",
      "items": [
        {
          "id": "uuid",
          "text": "Complete design mockups",
          "completed": true,
          "assignee": null,
          "dueDate": null
        }
      ],
      "completedItems": 1,
      "totalItems": 3
    }
  ]
}
```

#### Create Checklist
```
POST /api/cards/:cardId/checklists
```

**Request Body**:
```json
{
  "name": "Development Tasks"
}
```

#### Update Checklist
```
PUT /api/checklists/:checklistId
```

**Request Body**:
```json
{
  "name": "Updated Checklist Name"
}
```

#### Delete Checklist
```
DELETE /api/checklists/:checklistId
```

#### Add Checklist Item
```
POST /api/checklists/:checklistId/items
```
**Business Rule**: BR-C-014 (Checklist Items)

**Request Body**:
```json
{
  "text": "New checklist item",
  "assigneeId": "uuid",
  "dueDate": "2024-01-10T00:00:00Z"
}
```

#### Update Checklist Item
```
PUT /api/checklist-items/:itemId
```

**Request Body**:
```json
{
  "text": "Updated item text",
  "completed": true
}
```

#### Delete Checklist Item
```
DELETE /api/checklist-items/:itemId
```

### Card Comments

#### Get Card Comments
```
GET /api/cards/:cardId/comments
```
**Business Rule**: BR-C-015 (Comment System)

**Query Parameters**:
- `limit`: Number of comments (default: 20)
- `offset`: Pagination offset

**Response**: `200 OK`
```json
{
  "comments": [
    {
      "id": "uuid",
      "text": "This looks great! @johndoe please review.",
      "author": {
        "userId": "uuid",
        "username": "janedoe",
        "displayName": "Jane Doe"
      },
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z",
      "mentions": [
        {
          "userId": "uuid",
          "username": "johndoe"
        }
      ]
    }
  ]
}
```

#### Add Comment
```
POST /api/cards/:cardId/comments
```

**Request Body**:
```json
{
  "text": "This is a comment with @mention"
}
```

#### Edit Comment
```
PUT /api/comments/:commentId
```
**Business Rule**: BR-C-016 (Comment Moderation)

**Request Body**:
```json
{
  "text": "Updated comment text"
}
```

#### Delete Comment
```
DELETE /api/comments/:commentId
```

### Card Watchers

#### Get Card Watchers
```
GET /api/cards/:cardId/watchers
```
**Business Rule**: BR-C-022 (Card Watchers)

**Response**: `200 OK`
```json
{
  "watchers": [
    {
      "userId": "uuid",
      "username": "johndoe",
      "displayName": "John Doe"
    }
  ]
}
```

#### Watch Card
```
POST /api/cards/:cardId/watch
```

#### Unwatch Card
```
DELETE /api/cards/:cardId/watch
```

---

## Search & Filter API

### Search Cards
```
GET /api/search/cards
```
**Business Rule**: BR-C-023 (Card Search)

**Query Parameters**:
- `q`: Search query
- `board`: Limit to specific board ID
- `assignee`: Filter by assignee
- `label`: Filter by label
- `dueDate`: Filter by due date range

**Response**: `200 OK`
```json
{
  "cards": [],
  "totalResults": 25,
  "query": "authentication"
}
```

### Filter Board Cards
```
GET /api/boards/:boardId/cards/filter
```
**Business Rule**: BR-C-024 (Card Filtering)

**Query Parameters**:
- `assignee`: User ID
- `label`: Label ID
- `dueDate`: Date range
- `list`: List ID

### Save Filter Set
```
POST /api/search/save-filter
```

**Request Body**:
```json
{
  "name": "My Assigned Tasks",
  "criteria": {
    "assignee": "me",
    "labels": ["urgent"]
  }
}
```

### Get Saved Filters
```
GET /api/search/saved-filters
```

---

## Notifications API

### Get Notifications
```
GET /api/notifications
```

**Query Parameters**:
- `unread`: Show only unread (default: false)
- `type`: Filter by notification type
- `limit`: Number of notifications

**Response**: `200 OK`
```json
{
  "notifications": [
    {
      "id": "uuid",
      "type": "card_assigned",
      "title": "You were assigned to a card",
      "message": "John assigned you to 'Implement authentication'",
      "read": false,
      "createdAt": "2024-01-01T00:00:00Z",
      "data": {
        "cardId": "uuid",
        "boardId": "uuid"
      }
    }
  ]
}
```

### Mark Notification as Read
```
PUT /api/notifications/:notificationId/read
```

### Update Notification Settings
```
PUT /api/notifications/settings
```
**Business Rule**: BR-U-013 (Notification Settings)

**Request Body**:
```json
{
  "frequency": "immediate",
  "types": {
    "assignments": true,
    "mentions": true,
    "dueDates": true,
    "comments": false
  },
  "email": true
}
```

### Get Notification Digest
```
GET /api/notifications/digest
```

---

## Workspaces API (Premium Feature)

### List Workspaces
```
GET /api/workspaces
```
**Business Rule**: BR-U-010 (Workspace Creation)

### Create Workspace
```
POST /api/workspaces
```

**Request Body**:
```json
{
  "name": "My Company Workspace",
  "description": "Workspace for company projects"
}
```

### Get Workspace
```
GET /api/workspaces/:workspaceId
```

### Update Workspace
```
PUT /api/workspaces/:workspaceId
```

### Delete Workspace
```
DELETE /api/workspaces/:workspaceId
```

### Invite Workspace Member
```
POST /api/workspaces/:workspaceId/members
```
**Business Rule**: BR-U-011 (Workspace Membership)

**Request Body**:
```json
{
  "email": "member@example.com",
  "role": "member"
}
```

---

## Admin API

### List All Users (System Admin Only)
```
GET /api/admin/users
```

**Query Parameters**:
- `status`: active, deactivated, all
- `limit`: Number of users
- `search`: Search by email/username

### List All Boards (System Admin Only)
```
GET /api/admin/boards
```

### System Activity Log (System Admin Only)
```
GET /api/admin/activity
```

### System Statistics (System Admin Only)
```
GET /api/admin/stats
```

**Response**: `200 OK`
```json
{
  "users": {
    "total": 1250,
    "active": 1100,
    "premium": 150
  },
  "boards": {
    "total": 5500,
    "active": 4800
  },
  "cards": {
    "total": 45000,
    "completed": 15000
  }
}
```

---

## Health & Monitoring

### Health Check
```
GET /api/health
```

**Response**: `200 OK`
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00Z",
  "version": "1.0.0"
}
```

### System Status
```
GET /api/status
```

**Response**: `200 OK`
```json
{
  "api": "operational",
  "database": "operational",
  "storage": "operational",
  "notifications": "operational"
}
```

### Rate Limit Status
```
GET /api/rate-limit
```
**Business Rule**: BR-W-018 (API Rate Limiting)

**Response**: `200 OK`
```json
{
  "limit": 1000,
  "remaining": 856,
  "resetTime": "2024-01-01T01:00:00Z"
}
```

---

## WebSocket Events

For real-time collaboration, TaskFlow uses WebSocket connections:

### Connection
```
wss://api.taskflow.com/ws?token=<jwt_token>
```

### Events
- `board:updated` - Board settings changed
- `list:created` - New list added
- `list:updated` - List modified
- `list:deleted` - List removed
- `card:created` - New card added
- `card:updated` - Card modified
- `card:moved` - Card moved between lists
- `card:deleted` - Card removed
- `member:joined` - New member added to board
- `member:left` - Member removed from board

### Event Format
```json
{
  "type": "card:moved",
  "boardId": "uuid",
  "data": {
    "cardId": "uuid",
    "fromListId": "uuid",
    "toListId": "uuid",
    "position": 2
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "userId": "uuid"
}
```

---

## Response Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `202 Accepted` - Request accepted for processing
- `204 No Content` - Request successful, no content returned
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (duplicate, etc.)
- `422 Unprocessable Entity` - Validation errors
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error

---

## Data Models

### User
```json
{
  "id": "uuid",
  "email": "string",
  "username": "string",
  "displayName": "string",
  "avatar": "string",
  "role": "user|admin|super_admin",
  "preferences": {},
  "createdAt": "datetime",
  "lastLoginAt": "datetime"
}
```

### Board
```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "visibility": "private|team|public",
  "background": {},
  "ownerId": "uuid",
  "workspaceId": "uuid",
  "archived": "boolean",
  "createdAt": "datetime"
}
```

### List
```json
{
  "id": "uuid",
  "name": "string",
  "position": "integer",
  "wipLimit": "integer",
  "boardId": "uuid",
  "archived": "boolean",
  "createdAt": "datetime"
}
```

### Card
```json
{
  "id": "uuid",
  "title": "string",
  "description": "string",
  "position": "integer",
  "dueDate": "datetime",
  "listId": "uuid",
  "archived": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

This API specification provides complete coverage of all business rules defined in the TaskFlow business requirements, ensuring a robust and feature-complete task management system.