# Doccit - A Documentation Repository

Doccit is a web-based platform designed to serve as a documentation repository for businesses and teams. It allows users to create and manage documentation in a structured and collaborative environment, similar to the community-driven model of Reddit.

## Features

- **Subreddits**: User-created organizational units for projects, applications, events, or any other topic. Each subreddit has its own dedicated page with a customizable sidebar.
  
- **Posts & Comments**: Documentation articles (posts) and discussions (comments) support a markdown editor for formatting, including bold, underline, italics, tables, code blocks, and in-line image insertion.

- **Flair**: Posts can be categorized using flairs defined by an Administrator, enhancing content organization.

- **Sidebars**: Each subreddit features a persistent sidebar that can be edited by the owner, allowing for important links and project overviews.

## User Roles

Doccit operates on a tiered permission structure:

- **Administrator**: The highest-level role with the ability to manage users and define flairs.
  
- **Creator**: Users who can create new subreddits and become the owners of those subreddits.

- **Read-Only**: Default role for new users, allowing them to view content without creating new subreddits or posts.

## Ownership Model

The creator of a subreddit is designated as its Owner, with full control over the subreddit, including sidebar edits and ownership transfers.

## Getting Started

### Prerequisites

- Docker
## Docker (Recommended)

### Simplified server-rendered UI (no React)

This project now includes a minimal EJS-based UI served by Express. No React build is needed.

Run everything with Docker:
```bash
cd vibeCodeDoccit
docker compose up --build
```

Open:
- Web UI: http://localhost:5000/
- API: http://localhost:5000/api
- MongoDB: mongodb://localhost:27017

Environment variables (server):
```
PORT=5000
DB_URI=mongodb://mongo:27017/doccit
JWT_SECRET=replace_me
JWT_EXPIRATION=1h
```