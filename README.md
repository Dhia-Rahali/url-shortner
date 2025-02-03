## URL Shortener Project

### Api Documentation 

This project use swagger for api documentation : http://3.76.10.111/api/docs

### Project Description

This document provides an overview of the URL Shortener project, focusing on its purpose, components, frameworks, structure, and how to run the project using Docker.

### Project Purpose

The URL Shortener project is designed to provide a simple and efficient way to shorten long URLs. Users can input a long URL and receive a shortened version that redirects to the original URL. This is useful for sharing links on social media, in emails, or anywhere else where space is limited.

---

## Components and Frameworks

### Components

- **Frontend**: Built with Next.js, the frontend provides the user interface for interacting with the URL shortener service.
- **Backend**: Built with NestJS, the backend handles the API requests for creating and retrieving shortened URLs.
- **Database**: MongoDB is used as the primary data store for storing the original and shortened URLs.
- **Nginx**: Acts as a reverse proxy to route requests to the appropriate frontend and backend services.

### Frameworks

- **Next.js**: A React framework for building server-side rendered and statically generated web applications.
- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **MongoDB**: A NoSQL database known for its flexibility and scalability.
- **Docker**: Used to containerize the application components, ensuring consistency across different environments.
- **Docker Compose**: A tool for defining and running multi-container Docker applications.

---

## Project Structure

### Backend
- The `backend` directory contains the NestJS application, including the source code, configuration files, and `Dockerfile`.

### Frontend
- The `frontend` directory contains the Next.js application, including the source code, configuration files, and `Dockerfile`.

### Nginx
- The `nginx` directory contains the configuration for the Nginx reverse proxy.

### Docker Compose
- The `docker-compose.yml` file defines the services required to run the application, including MongoDB, the backend, the frontend, and Nginx.

---

## Running the Project Using Docker

### Prerequisites

Make sure you have the following installed:

- **Docker**
- **Docker Compose**

### Installation

1. Clone the repository: 
   git clone https://github.com/Dhia-Rahali/url-shortner.git
   cd url-shortner
   

2. Create a `.env` file in the `backend` directory with the following content:
   
   MONGO_DB_LINK="mongodb://root:rootPassword@mongodb:27017/url-shortening?authSource=admin"
   PORT=4000

3. Create a `.env.local` file in the `frontend` directory with the following content:
   
   NEXT_PUBLIC_API_BASE_URL=/api

### Running the Application

Start the application using Docker Compose:

docker-compose up --build


### Accessing the Application

- **Frontend**: Open your browser and navigate to http://localhost.   (deployed version : http://3.76.10.111/)
- **Backend**: The backend service will be running on http://localhost/api/docs.  ( deployed version  : http://3.76.10.111/api/docs)


## Conclusion

The Docker Compose configuration simplifies the setup and management of the development environment for the URL Shortener project. By defining services for MongoDB, the backend, the frontend, and Nginx, the `docker-compose.yml` file ensures that all components of the application are properly configured and can communicate with each other.

