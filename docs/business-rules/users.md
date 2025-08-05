# User Business Rules

## User Registration and Authentication

### BR-U-001: User Registration
- Users must provide valid email address
- Email addresses must be unique across the system
- Password must be at least 8 characters with mix of letters/numbers
- Email verification required before account activation

### BR-U-002: User Profile Requirements
- Username must be 3-30 characters, alphanumeric and underscores only
- Username must be unique across the system
- Display name is optional, max 100 characters
- Profile avatar is optional, max 5MB image file

### BR-U-003: Authentication Rules
- Maximum 5 failed login attempts before account lockout
- Account lockout duration: 15 minutes
- Password reset tokens expire after 1 hour
- Session timeout after 7 days of inactivity

## User Permissions and Roles

### BR-U-004: System-Level Roles
- **User**: Standard user with board access based on membership
- **Admin**: Can manage system settings and user accounts
- **Super Admin**: Full system access including billing and configuration

### BR-U-005: Board-Level Roles
- **Observer**: Read-only access, can view cards and comments
- **Member**: Can create/edit cards, add comments, move cards
- **Admin**: Member permissions + manage other members, lists, board settings
- **Owner**: Admin permissions + delete board, transfer ownership

### BR-U-006: Permission Inheritance
- Board permissions override system permissions
- Higher roles include all lower role permissions
- Explicit denials override inherited permissions
- Guest access requires explicit board invitation

## User Account Management

### BR-U-007: Account Deactivation
- Users can deactivate their own accounts
- Deactivated accounts retain data for 90 days
- During deactivation period, account can be reactivated
- After 90 days, account and data permanently deleted

### BR-U-008: Account Deletion
- Immediate permanent deletion on user request
- All owned boards transferred to designated user or deleted
- All comments and activity history anonymized
- File attachments and uploads removed

### BR-U-009: Profile Updates
- Users can update their own profile information
- Email changes require verification of new email
- Username changes limited to once per 30 days
- Display name and avatar can be changed anytime

## User Workspace Management

### BR-U-010: Workspace Creation
- Free users can create 1 workspace
- Premium users can create unlimited workspaces
- Workspace names must be unique per user
- Workspace member limit: 10 (free), unlimited (premium)

### BR-U-011: Workspace Membership
- Workspace owners can invite members by email
- Members can be assigned workspace-level roles
- Members inherit minimum board permissions within workspace
- Members can leave workspace voluntarily

### BR-U-012: Workspace Permissions
- **Workspace Owner**: Full control, billing, member management
- **Workspace Admin**: Manage members, create boards, workspace settings
- **Workspace Member**: Create personal boards, join shared boards
- **Workspace Guest**: Access only specifically shared boards

## User Notifications and Preferences

### BR-U-013: Notification Settings
- Users control notification frequency: immediate, digest, off
- Notification types: assignments, mentions, due dates, comments
- Email notifications can be disabled per notification type
- In-app notifications always enabled for security alerts

### BR-U-014: Privacy Settings
- Profile visibility: public, workspace members only, private
- Activity visibility: full, limited to assigned cards, private
- Online status visibility can be disabled
- Search indexing can be opted out

### BR-U-015: User Preferences
- Default board view: list view, card view, calendar view
- Time zone setting affects due dates and timestamps
- Language preference for interface
- Theme preference: light, dark, auto

## User Activity and Audit

### BR-U-016: Activity Tracking
- All user actions logged for audit purposes
- Activity visible in user's activity feed
- Board-specific activity visible to board members
- System admins can view full user activity

### BR-U-017: Login History
- Last 20 login sessions tracked per user
- Login history shows: timestamp, IP address, device info
- Users can view their own login history
- Suspicious login activity triggers security alerts

### BR-U-018: Data Export
- Users can export their personal data (GDPR compliance)
- Export includes: profile, boards owned, cards created, comments
- Export available in JSON format
- Export processing may take up to 48 hours

## User Limits and Quotas

### BR-U-019: Free Tier Limits
- Maximum 10 boards per user
- Maximum 10 MB file storage
- Maximum 1 workspace
- Standard support only

### BR-U-020: Premium Tier Benefits
- Unlimited boards
- 1 GB file storage per user
- Unlimited workspaces
- Priority support and advanced features

### BR-U-021: API Rate Limiting
- 1000 API requests per hour per user
- Burst limit: 100 requests per minute
- Rate limits higher for premium users
- Rate limit headers included in API responses

## User Security

### BR-U-022: Two-Factor Authentication
- 2FA optional but recommended for all users
- Supports TOTP apps (Google Authenticator, Authy)
- Recovery codes provided during 2FA setup
- 2FA required for workspace owners with 10+ members

### BR-U-023: Session Management
- Multiple concurrent sessions allowed
- Users can view and revoke active sessions
- Session invalidation on password change
- Automatic session cleanup for deactivated accounts