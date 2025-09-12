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

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the client directory and install dependencies:
   ```
   cd client
   npm install
   ```

3. Navigate to the server directory and install dependencies:
   ```
   cd ../server
   npm install
   ```

### Running the Application

1. Start the server:
   ```
   cd server
   npm start
   ```

2. Start the client:
   ```
   cd ../client
   npm start
   ```

The application should now be running on `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.