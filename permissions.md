# Experiments:
---
## CREATE experiment:
  - basic: *user_id, *name_group_id
  - member: *user_id, *name_group_id, org_group_id
  - moderator: *user_id, *name_group_id, org_group_id

## READ experiment:
### show all experiments of groups with `user_id` in them
  - basic: *user_id, *name_group_id (can read own and public experiments)
  - member: *user_id, *name_group_id, *org_group_id (can read own, org and public experiments)
  - moderator: *user_id, *name_group_id, *org_group_id (can read own, org and public experiments)

## UPDATE experiment:
### allow iff `experiment author_id == user_id`. For moderator, allow iff `experiment group_id == moderator group_id`
  - basic: *user_id, *name_group_id, *org_group_id (can update own experiments)
  - member: *user_id, *name_group_id, *org_group_id (can update own experiments)
  - moderator: *user_id, *name_group_id, *org_group_id (can update own and group's experiments)

## DELETE experiment:
### allow iff `experiment author_id == user_id`. For moderator, allow iff `experiment group_id == moderator group_id`
  - basic: *user_id, *name_group_id, *org_group_id (can update own experiments)
  - member: *user_id, *name_group_id, *org_group_id (can update own experiments)
  - moderator: *user_id, *name_group_id, *org_group_id (can update own and group's experiments)

# GroupContent:
---
## CREATE groupContent:
  - basic: *user_id, *name_group_id
  - member: *user_id, *name_group_id, *org_group_id
  - moderator: *user_id, *name_group_id, *org_group_id

## READ groupContent:
### For basic, show all groups' content with `user_id` in them. For member and moderator, show all group's content iff `user_id` in the group 
  - basic: *user_id, *name_group_id
  - member: *user_id, *name_group_id, *org_group_id
  - moderator: *user_id, *name_group_id, *org_group_id

## UPDATE groupContent:
### For member and moderator, allow iff `group content author_id == user_id` and `user_id` in group 
  - basic: *user_id, *name_group_id
  - member: *user_id, *name_group_id, *org_group_id 
  - moderator: *user_id, *name_group_id, *org_group_id

## DELETE groupContent:
### For member and moderator, allow iff `group content author_id == user_id` and `user_id` in group 
  - basic: *user_id, *name_group_id
  - member: *user_id, *name_group_id, *org_group_id
  - moderator: *user_id, *name_group_id, *org_group_id

# UserProfile:
---
## CREATE userProfile:
  - basic: *user_id
  - member: *user_id
  - moderator: *user_id
## READ userProfile:
  - basic: *user_id
  - member: *user_id
  - moderator: *user_id

## UPDATE userProfile:
  - basic: *user_id
  - member: *user_id
  - moderator: *user_id

## DELETE userProfile:
  - basic: *user_id
  - member: *user_id
  - moderator: *user_id