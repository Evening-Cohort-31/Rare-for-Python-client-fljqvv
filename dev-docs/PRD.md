<!-- Last updated: 2026-05-03 -->
<!-- Last change: Initial PRD creation -->

# Rare: The Publishing Platform for the Discerning Writer - Product Requirements Document

## Problem Statement
Rare was built as the first group project in the backend curriculum at Nashville Software
School (Evening Cohort 31). The goal was to apply Python fundamentals by building a
functioning full-stack publishing platform. Students implemented a REST-like API using
Python's built-in `http.server` module with hand-written CRUD operations, paired with a
React frontend. The project ran across five sprints using a kanban-style board with story
points, sprint planning, and sprint retrospectives.

## Target Users
- **Writers/Authors:** Users who create and publish posts on topics of their choosing,
  using tags, categories, and images.
- **Readers:** Users who browse posts, react to content, comment on posts, and follow
  authors whose work they enjoy.
- **Administrators:** Users with elevated privileges who manage the platform by
  moderating users, content, and taxonomy.

## Core Requirements

### Authentication
- Users can register, log in, and log out.

### Posts
- Authenticated users can create, edit, and delete their own posts.
- Posts support tags, categories, and images.
- Admins can delete any post.

### Comments
- Users can comment on posts.
- Users can edit and delete their own comments.

### Reactions
- Users can react to posts made by other users.

### Author Profiles
- Users can view any author's public profile.
- Users can follow or subscribe to an author.

### Profile Management
- Users can edit select details on their own profile.

### Admin Controls
- Admins can promote or demote users.
- Admins can add new categories and tags.
- Admins can mark authors as inactive.

## Technical Stack

### Stack Decisions
- **Frontend:** React with Bulma CSS. React was the cohort's primary frontend framework;
  Bulma provided utility-first styling without requiring a heavy build setup.
- **Backend:** Python with `http.server`. No framework was used; the cohort hand-wrote
  all routing and CRUD logic to build foundational understanding of how HTTP and data
  persistence work before introducing a framework like Django.
- **Database:** SQLite. A lightweight file-based database suited to a local development
  project at this scale.
- **Version Control:** Git and GitHub with a PR-based branch review workflow.

## Scope

### In Scope (Completed across Sprints 1-5)
- User registration, login, and logout
- Post creation, editing, and deletion (author or admin)
- Post tagging, categorization, and image association
- Reactions to posts
- Comments on posts (create, edit, delete)
- Author profile viewing and follow/subscribe
- User profile self-editing
- Admin: promote/demote users, add categories/tags, deactivate authors, delete any post

### Out of Scope
- Notifications
- Search or advanced filtering beyond tag/category
- Mobile-specific design
- Deployment to a production environment

## Success Criteria
- All five sprint deliverables completed and merged.
- Core user flows (register, post, comment, react, follow, admin actions) function
  without errors.
- Frontend and backend integrate correctly via the hand-written Python API.

## Learning Goals
- Build foundational understanding of HTTP request/response cycles by implementing
  routing and CRUD without a framework.
- Practice React component architecture and state management across a multi-feature app.
- Develop team collaboration habits: branching, PR reviews, and sprint-based delivery.
- Understand full-stack integration by connecting a React frontend to a custom Python
  backend.
- Experience an agile workflow end-to-end: kanban board, sprint planning, story point
  estimation, self-selected tickets, and sprint retrospectives.
