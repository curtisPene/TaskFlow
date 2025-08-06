# TaskFlow Domain Models

This document defines the core domain entities for TaskFlow based on the business rules. Each entity represents a key concept in the task management domain.

## Core Entity Hierarchy

```
User
├── owns → Board(s)
└── member of → Board(s) via BoardMembership

Board
├── contains → List(s)
├── has → Label(s)
└── has → BoardMembership(s)

List
├── contains → Card(s)
└── belongs to → Board

Card
├── belongs to → List
├── has → Comment(s)
├── has → Attachment(s)
├── has → Checklist(s)
├── assigned to → User(s) via CardAssignment
└── watched by → User(s) via CardWatcher
```

---

## User Entity

**Purpose**: Represents individuals who can access and interact with the TaskFlow system.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Email**: Unique email address, required for registration
- **Username**: 3-30 characters, alphanumeric + underscores, unique
- **Display Name**: Optional, max 100 characters  
- **Password Hash**: Encrypted password storage
- **Avatar**: Optional profile image, max 5MB
- **Role**: System-level role (User, Admin, Super Admin)
- **Email Verified**: Boolean flag for email verification status
- **Account Status**: Active, Deactivated, or Deleted
- **Created At**: Account creation timestamp
- **Last Login At**: Most recent login timestamp

### Business Rules Applied
- **BR-U-001**: Email uniqueness and validation
- **BR-U-002**: Username requirements and uniqueness  
- **BR-U-003**: Authentication rules (lockout, session timeout)
- **BR-U-004**: System-level roles and permissions
- **BR-U-007**: Account deactivation (90-day retention)
- **BR-U-009**: Profile update restrictions
- **BR-U-019/U-020**: Tier-based limits (free vs premium)
- **BR-U-022**: Two-factor authentication support
- **BR-U-023**: Session management

### Key Relationships
- **Owns Boards**: One-to-many relationship with Board entity
- **Board Memberships**: Many-to-many with Board via BoardMembership
- **Card Assignments**: Many-to-many with Card via CardAssignment
- **Card Watchers**: Many-to-many with Card via CardWatcher
- **Comments**: One-to-many with Comment entity
- **Workspaces**: Many-to-many via WorkspaceMembership (premium feature)

### Domain Invariants
- Email and username must remain unique across system
- Cannot delete account if owns boards without transferring ownership
- Free tier users limited to 10 boards, premium unlimited
- Account deactivation preserves data for 90 days

---

## Board Entity

**Purpose**: Top-level container for organizing work, equivalent to a project workspace.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: 1-255 characters, unique per user/workspace
- **Description**: Optional, max 2000 characters with markdown
- **Visibility**: Private, Team, or Public
- **Background**: Color or image configuration
- **Owner ID**: Reference to User who owns the board
- **Workspace ID**: Optional reference to Workspace (premium feature)
- **Archived**: Boolean flag for soft deletion
- **Created At**: Board creation timestamp
- **Updated At**: Last modification timestamp

### Business Rules Applied
- **BR-B-001**: Name requirements and uniqueness
- **BR-B-002**: Creation permissions (any authenticated user)
- **BR-B-003**: Initialization (default "To Do" list, owner as first member)
- **BR-B-004**: Single owner, ownership transfer rules
- **BR-B-005**: Visibility settings and access control
- **BR-B-006**: Deletion permissions and soft delete (30-day retention)
- **BR-B-010**: Description formatting and length limits
- **BR-B-012**: Archive functionality
- **BR-B-013**: Board limits per user tier
- **BR-B-014**: Name validation rules

### Key Relationships
- **Owner**: Many-to-one with User entity
- **Members**: Many-to-many with User via BoardMembership
- **Lists**: One-to-many with List entity
- **Labels**: One-to-many with Label entity
- **Workspace**: Many-to-one with Workspace (optional)

### Domain Invariants
- Must have exactly one owner at all times
- Must have at least one list (cannot delete last list)
- Only owner can delete board or transfer ownership
- Archived boards are read-only
- Name uniqueness enforced per user/workspace scope

---

## BoardMembership Entity

**Purpose**: Defines user roles and permissions within a specific board.

### Core Properties
- **Board ID**: Reference to Board
- **User ID**: Reference to User
- **Role**: Owner, Admin, Member, or Observer
- **Joined At**: Membership creation timestamp
- **Invited By**: Reference to User who sent invitation
- **Status**: Active, Invited, or Removed

### Business Rules Applied
- **BR-B-007**: Member addition via email invitation
- **BR-B-008**: Role-based permissions hierarchy
- **BR-B-009**: Member removal permissions
- **BR-U-005**: Board-level role definitions

### Role Permissions
- **Owner**: Full control, delete board, manage settings, transfer ownership
- **Admin**: Manage members/lists/settings (except deletion), remove other admins
- **Member**: Create/edit cards, comment, move cards between lists
- **Observer**: Read-only access, view cards and comments

### Domain Invariants
- Each board must have exactly one owner
- Users can have different roles across different boards
- Higher roles include all lower role permissions

---

## List Entity

**Purpose**: Represents workflow stages or categories within a board (e.g., "To Do", "In Progress", "Done").

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: 1-100 characters, unique within board
- **Position**: Integer for left-to-right ordering
- **WIP Limit**: Work-in-progress limit (0 = no limit)
- **Board ID**: Reference to parent Board
- **Archived**: Boolean flag for soft deletion
- **Created At**: List creation timestamp

### Business Rules Applied
- **BR-L-001**: Name requirements and board-level uniqueness
- **BR-L-002**: Creation permissions (members and above)
- **BR-L-003**: Initialization with auto-assigned position
- **BR-L-004**: Position-based ordering system
- **BR-L-005**: Reordering permissions and real-time updates
- **BR-L-007/L-008/L-009**: Deletion rules and minimum list requirement
- **BR-L-010**: List limits (50 per board, 500 cards per list)
- **BR-L-011**: Archive functionality
- **BR-L-017**: WIP limit configuration

### Key Relationships
- **Board**: Many-to-one with Board entity
- **Cards**: One-to-many with Card entity

### Domain Invariants
- Name must be unique within parent board
- Position must be unique within parent board
- Cannot delete list containing cards
- Board must always have at least one list
- Positions automatically adjust when lists are reordered

---

## Card Entity

**Purpose**: Individual tasks or work items that move through workflow stages.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Title**: 1-500 characters, required
- **Description**: Optional, max 10,000 characters with markdown
- **Position**: Integer for top-to-bottom ordering within list
- **Due Date**: Optional datetime with timezone awareness
- **List ID**: Reference to parent List
- **Archived**: Boolean flag for soft deletion
- **Created At**: Card creation timestamp
- **Updated At**: Last modification timestamp

### Business Rules Applied
- **BR-C-001**: Title requirements (only required field)
- **BR-C-002**: Creation permissions (members and above)
- **BR-C-003**: Initialization with auto-assigned position
- **BR-C-004**: Description formatting and length limits
- **BR-C-005**: Due date validation (future dates only)
- **BR-C-008**: Position management within lists
- **BR-C-009**: Movement between lists with activity tracking
- **BR-C-017**: Archive functionality
- **BR-C-018**: Deletion permissions (admins and owner only)
- **BR-C-019**: Card limits (1000 per board, 500 per list)

### Key Relationships
- **List**: Many-to-one with List entity
- **Assignees**: Many-to-many with User via CardAssignment
- **Labels**: Many-to-many with Label via CardLabel
- **Comments**: One-to-many with Comment entity
- **Attachments**: One-to-many with Attachment entity
- **Checklists**: One-to-many with Checklist entity
- **Watchers**: Many-to-many with User via CardWatcher

### Domain Invariants
- Title cannot be empty or only whitespace
- Due dates must be in the future when set
- Position automatically adjusts when cards are moved
- Archived cards hidden from normal board view
- Card movement triggers activity log entries

---

## CardAssignment Entity

**Purpose**: Links users to cards they are responsible for completing.

### Core Properties
- **Card ID**: Reference to Card
- **User ID**: Reference to assigned User
- **Assigned At**: Assignment timestamp
- **Assigned By**: Reference to User who made the assignment

### Business Rules Applied
- **BR-C-007**: Assignment limits (0-5 members per card)
- **BR-C-021**: Notification rules for assignees

### Domain Invariants
- Only board members can be assigned to cards
- Maximum 5 assignees per card
- Assignees automatically receive card notifications

---

## Label Entity

**Purpose**: Categorization and visual organization system for cards within a board.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: Optional label text
- **Color**: Required color value (hex code)
- **Board ID**: Reference to parent Board
- **Created At**: Label creation timestamp

### Business Rules Applied
- **BR-C-006**: Label limits (0-10 per card) and board-specific scope

### Key Relationships
- **Board**: Many-to-one with Board entity
- **Cards**: Many-to-many with Card via CardLabel

### Domain Invariants
- Labels are scoped to individual boards
- Color is required, name is optional
- Cards can have maximum 10 labels

---

## Comment Entity

**Purpose**: Discussion and communication threads attached to cards.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Text**: Comment content with markdown support
- **Card ID**: Reference to parent Card
- **Author ID**: Reference to User who wrote comment
- **Created At**: Comment creation timestamp
- **Updated At**: Last edit timestamp (if edited)
- **Deleted**: Boolean flag for soft deletion

### Business Rules Applied
- **BR-C-015**: Markdown formatting and user mentions
- **BR-C-016**: Edit/delete permissions and moderation rules

### Key Relationships
- **Card**: Many-to-one with Card entity
- **Author**: Many-to-one with User entity
- **Mentions**: Many-to-many with User via CommentMention

### Domain Invariants
- Authors can edit/delete within 24 hours
- Board admins can delete any comment
- Mentions automatically subscribe users to card notifications
- Deleted comments show placeholder but preserve audit trail

---

## Attachment Entity

**Purpose**: Files and links associated with cards for additional context.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: Display name for attachment
- **Type**: File or Link
- **URL**: Secure access URL
- **Size**: File size in bytes (for files)
- **MIME Type**: File type information
- **Card ID**: Reference to parent Card
- **Uploaded By**: Reference to User who added attachment
- **Created At**: Upload timestamp

### Business Rules Applied
- **BR-C-011**: File attachment limits (0-20 per card, 25MB each)
- **BR-C-012**: Link attachment validation and previews

### Key Relationships
- **Card**: Many-to-one with Card entity
- **Uploader**: Many-to-one with User entity

### Domain Invariants
- Maximum 20 attachments per card
- File attachments limited to 25MB each
- Link attachments automatically generate previews when possible
- Secure storage with access control

---

## Checklist Entity

**Purpose**: Sub-task organization within cards for breaking down work.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: Checklist title
- **Card ID**: Reference to parent Card
- **Created At**: Checklist creation timestamp

### Business Rules Applied
- **BR-C-013**: Checklist limits (0-10 per card)

### Key Relationships
- **Card**: Many-to-one with Card entity
- **Items**: One-to-many with ChecklistItem entity

### Domain Invariants
- Maximum 10 checklists per card
- Progress calculated as percentage of completed items

---

## ChecklistItem Entity

**Purpose**: Individual tasks within checklists.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Text**: Item description, max 500 characters
- **Completed**: Boolean completion status
- **Position**: Integer for ordering within checklist
- **Assignee ID**: Optional reference to assigned User
- **Due Date**: Optional item-specific due date
- **Checklist ID**: Reference to parent Checklist
- **Created At**: Item creation timestamp

### Business Rules Applied
- **BR-C-014**: Item limits (1-50 per checklist) and assignee rules

### Key Relationships
- **Checklist**: Many-to-one with Checklist entity
- **Assignee**: Many-to-one with User entity (optional)

### Domain Invariants
- Maximum 50 items per checklist
- Items can be assigned to board members
- Completed items can be hidden/shown based on user preference

---

## CardWatcher Entity

**Purpose**: Subscription system for users to receive notifications about cards.

### Core Properties
- **Card ID**: Reference to Card
- **User ID**: Reference to watching User
- **Subscribed At**: Subscription timestamp

### Business Rules Applied
- **BR-C-022**: Watcher notification rules

### Domain Invariants
- Card creators automatically become watchers
- Assignees automatically become watchers
- Users can manually subscribe/unsubscribe
- Watchers receive same notifications as assignees

---

## Workspace Entity (Premium Feature)

**Purpose**: Higher-level organization container for multiple boards and team management.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Name**: Workspace name, unique per user
- **Description**: Optional workspace description
- **Owner ID**: Reference to User who owns workspace
- **Settings**: Workspace configuration options
- **Created At**: Workspace creation timestamp

### Business Rules Applied
- **BR-U-010**: Creation limits (1 for free, unlimited for premium)
- **BR-U-011**: Member invitation system
- **BR-U-012**: Workspace-level permissions

### Key Relationships
- **Owner**: Many-to-one with User entity
- **Members**: Many-to-many with User via WorkspaceMembership
- **Boards**: One-to-many with Board entity

### Domain Invariants
- Free users limited to 1 workspace
- Premium users have unlimited workspaces
- Workspace names unique per user
- Member limit: 10 (free), unlimited (premium)

---

## Activity Entity

**Purpose**: Audit trail and activity feed for all system actions.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Type**: Action type (card_created, card_moved, etc.)
- **Actor ID**: Reference to User who performed action
- **Target Type**: Type of entity affected (Card, List, Board)
- **Target ID**: ID of affected entity
- **Metadata**: JSON data with action-specific details
- **Board ID**: Reference to Board (for filtering)
- **Created At**: Action timestamp

### Business Rules Applied
- **BR-U-016**: Activity tracking for audit purposes
- **BR-W-007**: Real-time collaboration events

### Key Relationships
- **Actor**: Many-to-one with User entity
- **Board**: Many-to-one with Board entity (optional)

### Domain Invariants
- All user actions logged for audit
- Activity visible based on user permissions
- Real-time events broadcasted to connected users
- Historical activity preserved for reporting

---

## Notification Entity

**Purpose**: System-generated alerts and messages for user engagement.

### Core Properties
- **ID**: Unique identifier (UUID)
- **Type**: Notification category (assignment, mention, due_date, etc.)
- **Title**: Brief notification title
- **Message**: Detailed notification content
- **Recipient ID**: Reference to User receiving notification
- **Related Entity Type**: Type of related entity (Card, Board, etc.)
- **Related Entity ID**: ID of related entity
- **Read**: Boolean flag for read status
- **Created At**: Notification timestamp

### Business Rules Applied
- **BR-U-013**: User notification preferences
- **BR-C-021**: Card-specific notification rules
- **BR-W-010**: Due date notification cascade

### Key Relationships
- **Recipient**: Many-to-one with User entity

### Domain Invariants
- Notifications respect user preferences
- Different types trigger different notification rules
- Read status tracked per user
- Notification frequency controlled by user settings

---

## Domain Services

### BoardService
- Handles board creation workflow (BR-W-001)
- Manages member invitation process (BR-W-002)
- Enforces board limits and permissions

### CardService
- Manages card movement workflow (BR-W-003)
- Handles position recalculation (BR-W-014)
- Coordinates real-time updates

### NotificationService
- Processes notification rules and preferences
- Manages digest generation (BR-W-011)
- Handles mention detection (BR-W-012)

### ActivityService
- Records all user actions for audit trail
- Manages real-time event broadcasting
- Handles event replay for disconnected users

---

## Data Consistency Rules

### Referential Integrity
- Cascade deletions maintain data consistency
- Orphaned records cleaned up by background jobs (BR-W-013)
- Position conflicts resolved automatically (BR-W-014)

### Concurrency Control
- Optimistic locking for card edits (BR-W-007)
- Last-write-wins for simple field updates
- Atomic position updates for drag-and-drop operations

### Business Invariants
- Boards always have at least one list
- Lists without cards can be deleted
- Cards maintain position ordering within lists
- User permissions validated on every operation

This domain model provides the foundation for implementing the TaskFlow system with proper separation of concerns and adherence to all defined business rules.