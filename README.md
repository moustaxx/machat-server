# Machat Server

Machat Server is a backend designed for a real-time chat platform. It is built using modern technologies like TypeScript, Prisma, and GraphQL, ensuring scalability, performance, and developer productivity.

Frontend source: [https://github.com/moustaxx/machat](https://github.com/moustaxx/machat)

## Features

### 1. **Real-Time Messaging**
- Supports real-time communication between users using GraphQL subscriptions.
- Efficiently handles message creation and delivery.

### 2. **User Management**
- User registration and login with secure password hashing using Argon2.
- Session management with cookies and secure sessions.
- Active status tracking for users with automatic status updates after inactivity.

### 3. **Conversations**
- Create and manage group conversations.
- Add or remove participants dynamically.
- Enforce access control to ensure only authorized users can interact with conversations.

### 4. **Last Read Tracking**
- Tracks the last read message for each user in a conversation.
- Provides a seamless experience for users to resume conversations.

### 5. **GraphQL API**
- Fully typed GraphQL API using TypeGraphQL.
- Supports queries, mutations, and subscriptions for all core functionalities.

### 6. **Database Integration**
- PostgreSQL database with Prisma ORM for efficient data modeling and querying.
- Schema migrations and type-safe database access.

### 7. **Testing**
- Comprehensive unit and integration tests using Jest.
- Mocked PubSub for testing real-time features.

### 8. **Developer-Friendly**
- Built with TypeScript for type safety and better developer experience.
- Modular architecture for easy maintenance and scalability.
- Includes ESLint for code quality and consistency.

## Technologies Used

- **TypeScript**: Strongly typed programming language for better code quality.
- **Prisma**: ORM for database management and type-safe queries.
- **GraphQL**: API query language for efficient data fetching.
- **Fastify**: High-performance web framework for Node.js.
- **Jest**: Testing framework for reliable and maintainable tests.

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- `pnpm` package manager

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/moustaxx/machat-server.git
   cd machat-server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and configure the following:
   ```
   DATABASE_URL=your_database_url
   SESSION_SECRET=your_session_secret
   SESSION_SALT=your_session_salt
   COOKIE_TTL=3600
   ```

4. Push the database schema:
   ```bash
   pnpm prisma db push
   ```

5. Start the server:
   ```bash
   pnpm dev
   ```

### Running Tests
Run the test suite using Jest:
```bash
pnpm test
```