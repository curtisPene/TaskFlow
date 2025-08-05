# Board Business Rules

## Board Creation

### BR-B-001: Board Name Requirements
- Board names must be between 1-255 characters
- Board names must be unique per user/workspace
- Board names cannot contain only whitespace
- Special characters allowed: letters, numbers, spaces, hyphens, underscores

### BR-B-002: Board Creation Permissions
- Any authenticated user can create a board
- User becomes the board owner upon creation
- New boards are private by default
- A board must have at least one list upon creation

### BR-B-003: Board Initialization
- New boards automatically get a default list named "To Do"
- Board owner is automatically added as the first member
- Board creation timestamp is recorded
- Board gets a unique identifier (UUID)

## Board Management

### BR-B-004: Board Ownership
- Each board has exactly one owner
- Board owner can transfer ownership to another board member
- Board owner cannot leave the board without transferring ownership
- Only board owner can delete the board

### BR-B-005: Board Visibility
- **Private**: Only board members can view/access
- **Team**: All workspace members can view, only members can edit
- **Public**: Anyone with link can view, only members can edit
- Only board owner can change visibility settings

### BR-B-006: Board Deletion
- Only board owner can delete a board
- Board deletion requires confirmation
- Deleted boards are soft-deleted for 30 days
- All lists and cards are deleted with the board
- Board members are notified of deletion

## Board Membership

### BR-B-007: Adding Members
- Board owner and admins can add members
- Members can be added by email invitation
- Invited users receive email notification
- Maximum 50 members per board (configurable)

### BR-B-008: Member Roles
- **Owner**: Full control, can delete board, manage all settings
- **Admin**: Can manage members, lists, and board settings (except deletion)
- **Member**: Can create/edit cards, comment, move cards between lists
- **Observer**: Read-only access, can view but not modify

### BR-B-009: Removing Members
- Board owner can remove any member
- Admins can remove members and other admins (not owner)
- Members can remove themselves (leave board)
- Removed members lose access immediately
- Cards assigned to removed members become unassigned

## Board Settings

### BR-B-010: Board Description
- Board description is optional
- Maximum 2000 characters
- Supports basic markdown formatting
- Visible to all board members

### BR-B-011: Board Background
- Board can have custom background color or image
- Predefined color palette available
- Custom images must be under 5MB
- Only owner and admins can change background

### BR-B-012: Board Archive
- Boards can be archived instead of deleted
- Archived boards are read-only
- Only board owner can archive/unarchive
- Archived boards don't count toward board limits

## Board Constraints

### BR-B-013: Board Limits
- Maximum 100 boards per user (free tier)
- Maximum 1000 boards per user (premium tier)
- Maximum 50 lists per board
- Maximum 1000 cards per board

### BR-B-014: Board Name Validation
- Cannot start or end with whitespace
- Cannot contain profanity (configurable word list)
- Cannot be identical to system reserved names
- Case-insensitive uniqueness check per user