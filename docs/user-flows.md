# TaskFlow User Flows

This document outlines the user flows for TaskFlow, a Trello-like task management application. The flows are organized by feature area and include both currently implemented and planned functionality.

## Table of Contents

1. [Authentication Flows](#authentication-flows)
2. [Board Management Flows](#board-management-flows)
3. [List Management Flows](#list-management-flows)
4. [Card Management Flows](#card-management-flows)
5. [Collaboration Flows](#collaboration-flows)
6. [User Profile Management Flows](#user-profile-management-flows)
7. [Notification Flows](#notification-flows)
8. [Error Handling Flows](#error-handling-flows)

---

## Authentication Flows

### 1. User Registration Flow

**Actors:** New User
**Preconditions:** None
**Flow:**
1. User visits the landing page (`/`)
2. User clicks "Sign Up" button
3. System navigates to registration page (`/signup`)
4. User enters registration information:
   - Email address (unique, validated)
   - Password (minimum 8 characters, mixed letters/numbers)
   - Username (3-30 characters, alphanumeric and underscores)
   - Display name (optional, max 100 characters)
5. User submits registration form
6. System validates input and creates user account
7. System sends email verification
8. User receives email and clicks verification link
9. System activates account
10. User is redirected to dashboard with welcome message

**Post-conditions:** User account created and activated
**Error Flows:**
- Email already exists → Show error, suggest login
- Invalid password → Show validation errors
- Username taken → Suggest alternatives
- Email verification fails → Resend verification option

### 2. User Login Flow

**Actors:** Registered User
**Preconditions:** User has verified account
**Flow:**
1. User visits login page (`/login`) or clicks "Login" from landing page
2. User enters credentials (email/username and password)
3. System validates credentials
4. If valid:
   - System creates user session
   - System generates JWT tokens (access & refresh)
   - User is redirected to dashboard
5. If invalid:
   - System shows error message
   - System tracks failed login attempts
   - After 5 failed attempts: account temporarily locked (15 minutes)

**Post-conditions:** User authenticated and logged in
**Alternative Flows:**
- Remember me option → Extended session duration
- 2FA enabled → Additional verification step required

### 3. Password Reset Flow

**Actors:** Registered User
**Preconditions:** User has forgotten password
**Flow:**
1. User clicks "Forgot Password" on login page
2. User enters email address
3. System validates email exists
4. System sends password reset email with token (1-hour expiry)
5. User clicks reset link in email
6. System validates token and shows password reset form
7. User enters new password (with confirmation)
8. System updates password and invalidates all existing sessions
9. User is redirected to login page with success message

**Post-conditions:** Password updated, all sessions invalidated

---

## Board Management Flows

### 4. Create New Board Flow

**Actors:** Authenticated User
**Preconditions:** User is logged in
**Flow:**
1. User clicks "Create Board" from dashboard
2. System opens board creation modal/form
3. User enters board details:
   - Board name (1-255 characters, unique per user)
   - Description (optional, max 2000 characters)
   - Visibility setting (Private/Team/Public)
   - Background color/image (optional)
4. User submits form
5. System validates input and creates board
6. System automatically creates default "To Do" list
7. System adds user as board owner
8. System redirects user to new board view
9. System sends confirmation notification

**Post-conditions:** New board created with default list, user is owner
**Error Flows:**
- Board name already exists → Show error, suggest alternatives
- User at board limit → Show upgrade prompt

### 5. View Board Dashboard Flow

**Actors:** Board Member
**Preconditions:** User has access to at least one board
**Flow:**
1. User navigates to dashboard
2. System displays list of user's boards grouped by:
   - Owned boards
   - Member boards
   - Recently viewed
   - Archived boards (if any)
3. Each board shows:
   - Board name and description
   - Last activity timestamp
   - Member count
   - Quick actions (open, archive, settings)
4. User can:
   - Search/filter boards
   - Sort by name, activity, or creation date
   - Create new board
   - Access board settings

**Post-conditions:** User can see and navigate to their boards

### 6. Board Settings Management Flow

**Actors:** Board Owner/Admin
**Preconditions:** User has admin rights on board
**Flow:**
1. User opens board and clicks settings/menu
2. System shows settings panel with sections:
   - General (name, description, background)
   - Members (view, invite, manage roles)
   - Visibility (private/team/public)
   - Advanced (archive, delete, transfer ownership)
3. User makes desired changes
4. User saves settings
5. System validates and applies changes
6. System notifies affected members if applicable
7. System logs settings changes for audit

**Post-conditions:** Board settings updated, members notified if needed

---

## List Management Flows

### 7. Create New List Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** User has edit access to board
**Flow:**
1. User clicks "Add List" button on board
2. System shows inline list creation form
3. User enters list name
4. User presses Enter or clicks save
5. System validates name and creates list
6. System positions list at end of board
7. System updates board view in real-time for all viewers
8. List is ready for adding cards

**Post-conditions:** New list created and visible on board

### 8. Reorder Lists Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** Board has multiple lists
**Flow:**
1. User drags list header to new position
2. System shows visual feedback during drag
3. System validates move permissions
4. On drop:
   - System calculates new position
   - System updates list positions
   - System broadcasts change to other viewers
   - System logs activity
5. Board reflects new list order

**Post-conditions:** Lists reordered, change visible to all viewers

### 9. Edit List Settings Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** User has edit access to board
**Flow:**
1. User clicks list menu (three dots)
2. System shows list options:
   - Rename list
   - Archive list
   - Move all cards
   - Copy list
3. User selects desired action
4. For rename: inline editing mode
5. For archive: confirmation dialog
6. System processes action and updates board
7. System notifies other viewers in real-time

**Post-conditions:** List modified according to user action

---

## Card Management Flows

### 10. Create New Card Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** User has edit access to board
**Flow:**
1. User clicks "Add Card" in any list
2. System shows card creation form (can be inline or modal)
3. User enters card title (required)
4. User optionally adds:
   - Description
   - Due date
   - Labels
   - Assignees
5. User saves card
6. System creates card and adds to list
7. System updates board view for all viewers
8. System logs card creation activity

**Post-conditions:** New card created in specified list

### 11. Move Card Between Lists Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** User has edit access to board, card exists
**Flow:**
1. User drags card from source list
2. System shows visual feedback and valid drop zones
3. User drops card in target list
4. System validates move permissions
5. System updates card's list_id and position
6. System recalculates positions of affected cards
7. System broadcasts move to other viewers
8. System logs movement in card activity
9. System triggers any due date notifications if applicable

**Post-conditions:** Card moved to new list, positions updated

### 12. Edit Card Details Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** User has edit access to board, card exists
**Flow:**
1. User clicks on card to open details modal
2. System displays card details with sections:
   - Title and description
   - Due date and labels
   - Assignees and watchers
   - Comments and activity
   - Attachments and checklists
3. User edits any field
4. System saves changes automatically (or on explicit save)
5. System updates card in real-time for other viewers
6. System logs changes in card activity
7. System sends notifications to watchers if applicable

**Post-conditions:** Card updated with new information

---

## Collaboration Flows

### 13. Invite User to Board Flow

**Actors:** Board Owner/Admin
**Preconditions:** User has admin rights on board
**Flow:**
1. User opens board settings or clicks "Invite" button
2. System shows invitation form
3. User enters invitee's email address
4. User selects role for invitee (Observer/Member/Admin)
5. User adds optional invitation message
6. User sends invitation
7. System validates email and member limits
8. System generates invitation token (24-hour expiry)
9. System sends invitation email to recipient
10. System logs invitation activity
11. Invitee receives email and clicks accept link
12. System adds user to board with specified role
13. System sends welcome notification and updates board member list

**Post-conditions:** New member added to board with specified role

### 14. Assign Card to User Flow

**Actors:** Board Member (Member role or higher)
**Preconditions:** Card exists, target user is board member
**Flow:**
1. User opens card details
2. User clicks on "Assignees" section
3. System shows list of board members
4. User selects one or more members to assign
5. System adds assignees to card
6. System sends notification to newly assigned members
7. System updates card display with assignee avatars
8. System logs assignment activity
9. Assigned users automatically become card watchers

**Post-conditions:** Card assigned to specified users, notifications sent

### 15. Add Comment to Card Flow

**Actors:** Board Member (Observer role or higher)
**Preconditions:** User has access to board, card exists
**Flow:**
1. User opens card details
2. User scrolls to comments section
3. User clicks in comment text area
4. User types comment (supports @mentions and basic formatting)
5. User submits comment
6. System parses comment for @mentions
7. System saves comment and associates with card
8. System sends notifications to mentioned users and watchers
9. System updates card activity feed
10. System displays comment in real-time for other viewers

**Post-conditions:** Comment added to card, notifications sent to relevant users

---

## User Profile Management Flows

### 16. Edit User Profile Flow

**Actors:** Authenticated User
**Preconditions:** User is logged in
**Flow:**
1. User clicks profile menu and selects "Profile Settings"
2. System shows profile editing form with sections:
   - Basic info (display name, username, email)
   - Avatar (upload image)
   - Preferences (theme, notifications, timezone)
   - Security (change password, 2FA)
3. User makes desired changes
4. For email changes: system requires verification of new email
5. User saves changes
6. System validates and applies updates
7. System shows confirmation message
8. System logs profile changes for audit

**Post-conditions:** User profile updated with new information

### 17. Account Deactivation Flow

**Actors:** Authenticated User
**Preconditions:** User is logged in
**Flow:**
1. User navigates to account settings
2. User clicks "Deactivate Account"
3. System shows deactivation confirmation with consequences:
   - Account will be hidden for 90 days
   - Owned boards will need new owners or will be deleted
   - Data can be recovered within 90 days
4. User confirms deactivation and provides reason
5. System begins deactivation process:
   - Transfer or delete owned boards
   - Remove from all board memberships
   - Unassign from all cards
   - Disable login access
   - Schedule data deletion after 90 days
6. System sends deactivation confirmation email
7. System logs deactivation for audit

**Post-conditions:** Account deactivated, data scheduled for deletion

---

## Notification Flows

### 18. Real-time Notification Flow

**Actors:** Board Member
**Preconditions:** User is active on board with notifications enabled
**Flow:**
1. Another user performs an action (moves card, adds comment, etc.)
2. System identifies users who should be notified:
   - Card assignees and watchers
   - Board members (based on notification preferences)
   - Mentioned users
3. System sends real-time notifications via WebSocket
4. Client displays notification (toast, badge, etc.)
5. System logs notification delivery
6. User can click notification to navigate to relevant item
7. System marks notification as read when viewed

**Post-conditions:** Relevant users notified of board activity

### 19. Due Date Notification Flow

**Actors:** System (automated), Card Assignees
**Preconditions:** Cards with due dates exist
**Flow:**
1. System runs scheduled job (hourly) to check due dates
2. System identifies cards with upcoming due dates
3. For each card:
   - Check assignee notification preferences
   - Send email/in-app notifications as configured
   - Mark notification as sent to avoid duplicates
4. For overdue cards:
   - Escalate to board admins
   - Update card visual indicators
5. System logs all notification activities

**Post-conditions:** Users notified of due dates, overdue cards escalated

---

## Error Handling Flows

### 20. Connection Loss Recovery Flow

**Actors:** Active User
**Preconditions:** User is working on board, connection is lost
**Flow:**
1. System detects connection loss
2. Client shows "Connection Lost" indicator
3. Client queues any user actions (moves, edits, etc.)
4. Client attempts to reconnect automatically
5. When reconnected:
   - Client receives missed events from server
   - Client applies missed updates to board view
   - Client replays queued actions
   - Client resolves any conflicts (timestamp-based)
6. System shows "Connection Restored" message
7. If major conflicts: client refreshes entire board view

**Post-conditions:** User session restored with minimal data loss

### 21. Permission Error Flow

**Actors:** Board Member
**Preconditions:** User attempts action they don't have permission for
**Flow:**
1. User attempts restricted action (delete board, remove admin, etc.)
2. System validates user permissions
3. System denies action and shows appropriate error:
   - "You don't have permission to perform this action"
   - "Only board owners can delete boards"
   - "Contact board admin for access"
4. System logs permission violation attempt
5. System provides alternative actions if available
6. For severe violations: system may revoke session

**Post-conditions:** Action denied, user informed of permission requirements

---

## Notes

- **Current Implementation Status**: Authentication flows are partially implemented with basic UI components. Board and card management flows are defined in business rules but not yet implemented.
- **Real-time Features**: All collaborative flows assume WebSocket implementation for real-time updates.
- **Error Handling**: Each flow includes error scenarios and recovery mechanisms.
- **Accessibility**: All flows should be accessible via keyboard navigation and screen readers.
- **Mobile Responsive**: Flows should work on mobile devices with appropriate touch interactions.