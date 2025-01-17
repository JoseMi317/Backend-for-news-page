**Backend Service**

This is the backend of the application [GitHub-NoticesPage](https://github.com/JoseMi317/NoticesPage), designed to handle server-side logic, authentication, and database interactions. It uses Express as the main framework and MySQL as the database.
Prerequisites

**About the Framework**

This backend is built using Express, a minimal and flexible Node.js web application framework. It provides robust features for building APIs and simplifies server-side development.


    Node.js (v16 or higher)
    MySQL
    Git (optional, to clone the repository)

**Installation**
    Clone this repository:

    
    git clone <REPOSITORY_URL>
    cd backend
    
    
Install dependencies:

  
      npm install

Main Dependencies

    bcrypt: For password hashing.
    cors: To handle cross-origin requests.
    dotenv: For managing environment variables.
    express: Framework for building the server.
    jsonwebtoken: For handling token-based authentication.
    mysql2: MySQL client.
    sequelize: ORM for managing relational databases.
  

Create a .env file in the root directory with the following variables:


      PORT=3000 <use any port if you want>
      DB_HOST=localhost
      DB_USER=your_user
      DB_PASSWORD=your_password
      DB_NAME=your_database_name
      JWT_SECRET=your_secret_key


Start the server in development mode:

    node server.js

    The server will be available at http://localhost:3000 o in the port selected


Available Scripts

    node server.js: Starts the server in development mode using nodemon.

Key Features

    User registration and authentication.
    Role and permission validation.
    Connection to a MySQL database.
    JWT generation and validation.
    CRUD endpoints for data management.

Next Steps

    Implement unit and integration tests.
    Add additional documentation for each endpoint.
