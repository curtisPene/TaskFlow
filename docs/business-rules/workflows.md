# Workflow Business Rules

## Cross-Domain Business Processes

### BR-W-001: Board Creation Workflow
1. User initiates board creation
2. Validate board name uniqueness per user
3. Create board with user as owner
4. Create default "To Do" list
5. Add user as first board member
6. Send confirmation notification
7. Log board creation activity

### BR-W-002: User Invitation Workflow
1. Board member/admin initiates invitation
2. Validate email format and member limits
3. Check if user already exists in system
4. Generate invitation token (24-hour expiry)
5. Send invitation email
6. Log invitation activity
7. On acceptance: add user to board, send welcome notification

### BR-W-003: Card Movement Workflow
1. User drags card to new list/position
2. Validate user has move permissions
3. Update card's list_id and position
4. Recalculate positions of affected cards
5. Log movement in card activity
6. Send real-time updates to other board viewers
7. Trigger due date notifications if applicable

## Data Consistency Rules

### BR-W-004: Board Deletion Cascade
1. Verify only board owner can delete
2. Soft delete board (mark as deleted)
3. Hide board from all members immediately
4. Archive all lists and cards within board
5. Remove board from user's board lists
6. Schedule permanent deletion after 30 days
7. Send deletion notification to all members

### BR-W-005: User Deactivation Cascade
1. User initiates account deactivation
2. Transfer ownership of owned boards (or delete if no transfer target)
3. Remove user from all board memberships
4. Unassign user from all cards
5. Hide user's comments but preserve content
6. Disable login access immediately
7. Schedule data deletion after 90 days

### BR-W-006: List Deletion Validation
1. Check list contains no cards
2. Verify user has admin permissions
3. Ensure board has other lists remaining
4. Soft delete list (mark as deleted)
5. Adjust positions of remaining lists
6. Log deletion activity
7. Send real-time updates to board viewers

## Real-Time Collaboration Rules

### BR-W-007: Concurrent Card Editing
1. Multiple users can view same card simultaneously
2. Card edits use optimistic locking
3. Last write wins for simple field updates
4. Comments are append-only (no conflicts)
5. Real-time updates broadcasted to all card viewers
6. Conflict resolution shows latest version

### BR-W-008: Board Synchronization
1. All board changes trigger real-time events
2. Events include: card moves, list changes, member additions
3. Throttle rapid updates (max 10 events/second per board)
4. Batch similar events within 100ms window
5. Handle disconnected users with event replay
6. Maintain event history for 24 hours

### BR-W-009: Multi-User List Reordering
1. Lock list positions during reorder operation
2. Apply position changes atomically
3. Broadcast position changes to all board viewers
4. Handle conflicts with timestamp-based resolution
5. Refresh board view if major conflicts detected

## Notification Workflows

### BR-W-010: Due Date Notification Cascade
1. System checks for upcoming due dates every hour
2. Identify cards due within notification window
3. Send notifications to assigned users
4. Respect user notification preferences
5. Mark notifications as sent to avoid duplicates
6. Escalate overdue cards to board admins

### BR-W-011: Activity Digest Generation
1. Daily job collects user's subscribed activities
2. Group activities by board and type
3. Generate personalized digest email
4. Respect user's digest preferences (frequency, types)
5. Track email delivery and opens
6. Provide unsubscribe mechanisms

### BR-W-012: Real-Time Mention Notifications
1. Parse comments and descriptions for @mentions
2. Validate mentioned users are board members
3. Send immediate notification to mentioned users
4. Log mention activity in card history
5. Add mentioned users as card watchers
6. Highlight mentions in notification emails

## Data Integrity Workflows

### BR-W-013: Orphaned Data Cleanup
1. Daily job identifies orphaned records
2. Cards without valid list_id are archived
3. Lists without valid board_id are deleted
4. Comments without valid card_id are removed
5. Attachments without valid card_id are deleted
6. Log all cleanup activities for audit

### BR-W-014: Position Recalculation
1. Triggered when position conflicts detected
2. Recalculate positions for entire list or board
3. Maintain relative ordering of items
4. Use incremental integers (10, 20, 30, ...)
5. Update all affected records atomically
6. Log position changes for audit trail

### BR-W-015: Member Permission Sync
1. When user's board role changes
2. Recalculate effective permissions
3. Update cached permission data
4. Revoke access to restricted resources
5. Send permission change notification
6. Log permission changes for compliance

## Integration Workflows

### BR-W-016: File Upload Processing
1. Validate file type and size limits
2. Scan file for malware/viruses
3. Generate unique filename and path
4. Upload to secure storage
5. Create attachment record
6. Generate thumbnail for images
7. Send upload completion notification

### BR-W-017: External Calendar Sync
1. Export cards with due dates to iCal format
2. Include card title, description, due date
3. Update calendar when card due dates change
4. Remove calendar entries for completed cards
5. Respect user's calendar sync preferences
6. Handle calendar service authentication

### BR-W-018: API Rate Limiting Workflow
1. Track API requests per user per time window
2. Implement sliding window rate limiting
3. Return rate limit headers in responses
4. Block requests when limits exceeded
5. Log rate limit violations
6. Notify users approaching limits
7. Provide rate limit status endpoint

## Error Handling Workflows

### BR-W-019: System Failure Recovery
1. Detect system failures and errors
2. Log detailed error information
3. Attempt automatic recovery where possible
4. Fallback to read-only mode if necessary
5. Notify system administrators
6. Display user-friendly error messages
7. Track error metrics and patterns

### BR-W-020: Data Backup and Recovery
1. Automated daily backups of all user data
2. Incremental backups every 4 hours
3. Test backup integrity weekly
4. Maintain backups for 90 days
5. Support point-in-time recovery
6. Document recovery procedures
7. Regular disaster recovery testing