# Card Business Rules

## Card Creation

### BR-C-001: Card Title Requirements
- Card titles must be between 1-500 characters
- Card titles cannot contain only whitespace
- Special characters allowed: letters, numbers, spaces, punctuation
- Title is the only required field for card creation

### BR-C-002: Card Creation Permissions
- Board members and above can create cards
- Observers cannot create cards
- Cards are created at the bottom of the target list
- Card creation timestamp is recorded

### BR-C-003: Card Initialization
- New cards get a unique identifier (UUID)
- Cards start with no assignees, labels, or due dates
- Card position is auto-assigned (highest in list + 1)
- Creator is automatically subscribed to card notifications

## Card Properties

### BR-C-004: Card Description
- Description is optional, maximum 10,000 characters
- Supports markdown formatting
- Can include checklists, links, and mentions
- Description changes tracked in card activity

### BR-C-005: Card Due Dates
- Due dates are optional
- Must be future dates (cannot set past due dates)
- Time zone aware based on user preferences
- Overdue cards highlighted in red

### BR-C-006: Card Labels
- Cards can have 0-10 labels
- Labels are board-specific (shared across all cards on board)
- Labels have name (optional) and color (required)
- Board admins and owner can create/edit labels

### BR-C-007: Card Assignments
- Cards can be assigned to 0-5 board members
- Only board members can be assigned to cards
- Assignees receive notifications for card changes
- Assignment history tracked in card activity

## Card Movement

### BR-C-008: Card Position Within List
- Cards have position within their list (integer)
- Position determines top-to-bottom display order
- Positions auto-adjust when cards are reordered
- Drag-and-drop updates positions immediately

### BR-C-009: Card Movement Between Lists
- Cards can be moved between any lists on same board
- Movement updates card's list_id and position
- Card activity log records list changes
- Real-time updates for all board viewers

### BR-C-010: Card Ordering Rules
- Default order: creation time (newest at bottom)
- Users can sort by: position, due date, title, assignee
- Custom ordering persisted per user per board
- Bulk operations maintain relative ordering

## Card Attachments

### BR-C-011: File Attachments
- Cards can have 0-20 file attachments
- Maximum 25MB per attachment
- Supported formats: images, documents, PDFs, archives
- Attachments stored securely with access control

### BR-C-012: Link Attachments
- Cards can have unlimited link attachments
- Links automatically generate previews when possible
- Link validation ensures proper URL format
- Broken links flagged in card interface

## Card Checklists

### BR-C-013: Checklist Management
- Cards can have 0-10 checklists
- Each checklist can have 1-50 items
- Checklist items can be marked complete/incomplete
- Checklist progress shown as percentage

### BR-C-014: Checklist Items
- Checklist items have text (required, max 500 chars)
- Items can be assigned to board members
- Items can have due dates
- Completed items can be hidden/shown

## Card Comments

### BR-C-015: Comment System
- Board members can comment on cards
- Comments support markdown formatting
- Comments can mention other users (@username)
- Comment edit/delete permissions based on authorship

### BR-C-016: Comment Moderation
- Board admins and owner can delete any comment
- Original authors can edit/delete their comments within 24 hours
- Deleted comments show "Comment deleted" placeholder
- Comment history preserved for audit

## Card Archives and Deletion

### BR-C-017: Card Archiving
- Board members can archive cards
- Archived cards hidden from board view
- Archived cards searchable in archive view
- Cards can be restored from archive

### BR-C-018: Card Deletion
- Only board admins and owner can permanently delete cards
- Deletion requires confirmation
- Deleted cards cannot be restored
- All card data (comments, attachments) deleted permanently

## Card Constraints

### BR-C-019: Card Limits
- Maximum 1000 cards per board
- Maximum 500 cards per list
- Maximum 50 activity entries per card before pagination
- Maximum 100 mentions per card description/comment

### BR-C-020: Card Templates
- Cards can be created from templates
- Templates include: title, description, labels, checklist
- Templates are board-specific
- Only board admins and owner can create templates

## Card Notifications

### BR-C-021: Notification Rules
- Assignees notified of: due date changes, comments, movements
- Card creators auto-subscribed to all card changes
- Users can manually subscribe/unsubscribe from cards
- Notification frequency: immediate, daily digest, or off

### BR-C-022: Card Watchers
- Users can watch cards without being assigned
- Watchers receive same notifications as assignees
- Board members can add/remove themselves as watchers
- Admins can manage watchers for any card

## Card Search and Filtering

### BR-C-023: Card Search
- Full-text search across titles, descriptions, comments
- Search includes: assignees, labels, due dates
- Search scoped to current board or user's cards
- Advanced search with multiple criteria

### BR-C-024: Card Filtering
- Filter by: assignee, label, due date, list
- Multiple filters can be combined (AND logic)
- Saved filter sets for quick access
- Filter state persisted per user per board