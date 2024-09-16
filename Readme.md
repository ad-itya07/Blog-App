# Full-Stack Blog App

A full-stack blog application built with Node.js, Express, Passport.js, Bcrypt, Prisma, Cloudinary, and React.js. This project demonstrates user authentication, CRUD operations for blog posts, image uploads, and a modern front-end interface.

## Features

- **User Authentication**: Signup, login, and profile management using Passport.js and Bcrypt.
- **CRUD Operations**: Create, read, update, and delete blog posts and users.
- **Image Uploads**: Upload profile pictures and post images using Cloudinary.
- **Full-Stack Integration**: A complete end-to-end solution with a React front-end and Node.js backend.

## Technologies Used

- **Backend**: Node.js, Express, Passport.js, Bcrypt, Prisma, Cloudinary
- **Frontend**: React.js, Vite (for development and bundling)
- **Database**: PostgreSQL
- **File Storage**: Cloudinary

## Getting Started

### Prerequisites

- Node.js and npm
- PostgreSQL
- Cloudinary account

### Setup

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. **Backend Setup**

    - Navigate to the backend directory:

      ```bash
      cd backend
      ```

    - Install dependencies:

      ```bash
      npm install
      ```

    - Create a `.env` file in the backend directory and add the following environment variables:

      ```plaintext
      DATABASE_URL=<your-postgresql-database-url>
      SESSION_SECRET=<your-session-secret>
      CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
      CLOUDINARY_API_KEY=<your-cloudinary-api-key>
      CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
      ```

    - Run database migrations:

      ```bash
      npx prisma migrate deploy
      ```

    - Start the backend server:

      ```bash
      nodemon server.js
      ```

3. **Frontend Setup**

    - Navigate to the frontend directory:

      ```bash
      cd frontend
      ```

    - Install dependencies:

      ```bash
      npm install
      ```

    - Start the development server:

      ```bash
      npm run dev
      ```

### Usage

- **Frontend**: Open your browser and go to `http://localhost:3000` to access the React front-end.
- **Backend**: The API server runs on `http://localhost:5000` (or the port specified in your `.env` file).

### API Endpoints

- **User Authentication**
  - `POST /auth/sign-up`: Register a new user.
  - `POST /auth/login`: Log in an existing user.
  - `GET /user`: Get user profile.
  - `PUT /user/update-user/user-name`: Update user username.
  - `PUT /user/update-user/user-password`: Update user password.
  - `PUT /user/update-user/profile-pic`: Update user profile pic.
  - `PUT /user/delete/profile-pic`: Delete user profile pic.
  - `DELETE /user/delete-user`: Delete user account.

- **Blog Posts**
  - `GET /blog`: Get blog dashboard.
  - `POST /blog/all-posts`: List all blog posts.
  - `POST /blog`: Create a new blog post.
  - `GET /blog/:id`: Get a specific blog post by ID.
  - `PUT /blog/:id`: Update a blog post by ID.
  - `DELETE /blog/:id`: Delete a blog post by ID.

### Contributing

Feel free to contribute to this project by submitting issues or pull requests. Make sure to follow the code style and include tests where applicable.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For more detailed information, refer to the project documentation or contact the project maintainers.

