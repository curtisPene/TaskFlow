# List Business Rules

## List Creation

### BR-L-001: List Name Requirements
- List names must be between 1-100 characters
- List names must be unique within a board
- List names cannot contain only whitespace
- Special characters allowed: letters, numbers, spaces, hyphens, underscores

### BR-L-002: List Creation Permissions
- Board members and above can create lists
- Observers cannot create lists
- New lists are added at the rightmost position
- List creation timestamp is recorded

### BR-L-003: List Initialization
- New lists start with zero cards
- Lists get a unique identifier (UUID)
- List position is auto-assigned (highest + 1)
- Lists inherit board visibility settings

## List Management

### BR-L-004: List Ordering
- Lists have a position field (integer)
- Position determines left-to-right display order
- Positions must be unique within a board
- System auto-adjusts positions when lists are reordered

### BR-L-005: List Reordering
- Board members and above can reorder lists
- Drag-and-drop reordering updates all affected positions
- Position changes are immediately persisted
- Real-time updates sent to other board viewers

### BR-L-006: List Editing
- Board members and above can edit list names
- List name changes are immediately visible
- Edit history is tracked for audit purposes
- Concurrent edits use last-write-wins strategy

## List Deletion

### BR-L-007: List Deletion Rules
- Only board admins and owner can delete lists
- Cannot delete a list that contains cards
- Must move or delete all cards before list deletion
- List deletion requires confirmation

### BR-L-008: List Deletion Process
- Soft delete - list marked as deleted but preserved
- Deleted lists hidden from normal view
- Can be restored within 30 days
- After 30 days, permanently deleted

### BR-L-009: Minimum Lists
- Board must have at least one list at all times
- Cannot delete the last remaining list
- System prevents deletion of sole list
- Must create new list before deleting last one

## List Constraints

### BR-L-010: List Limits
- Maximum 50 lists per board
- Maximum 500 cards per list
- List names cannot exceed 100 characters
- Position values must be positive integers

### BR-L-011: List Archive
- Lists can be archived instead of deleted
- Archived lists are hidden but preserve cards
- Only board admins and owner can archive/unarchive
- Archived lists maintain their position for restoration

### BR-L-012: List Templates
- Common list names suggested: "To Do", "In Progress", "Done"
- Template suggestions based on board type
- Users can create custom list templates
- Templates are user-specific, not board-specific

## List Card Management

### BR-L-013: Card Capacity
- Lists can contain 0 to 500 cards
- Cards displayed in chronological order by default
- Users can sort cards by: position, due date, title, assignee
- Large lists show "Load More" pagination

### BR-L-014: Card Movement Between Lists
- Cards can be moved between any lists on same board
- Card movement updates card's list_id and position
- Card history tracks list movements
- Real-time updates for all board viewers

### BR-L-015: List Performance
- Lists with 100+ cards show performance warnings
- Auto-pagination kicks in at 200+ cards
- Search/filter available for large lists
- Archive old cards recommendation at 300+ cards

## List Metadata

### BR-L-016: List Statistics
- Lists track: card count, completed card count, total points
- Statistics updated in real-time
- Statistics visible in list headers
- Historical statistics available for reporting

### BR-L-017: List Settings
- Lists can have WIP (Work In Progress) limits
- WIP limits configurable per list (0 = no limit)
- Visual indicators when WIP limit exceeded
- Only admins and owner can set WIP limits