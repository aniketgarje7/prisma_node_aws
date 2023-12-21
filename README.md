## Pre-requisites to run this project

1. NeonDB Databse url
2. AWS account
3. AWS S3 bucket


## Steps to run this project

1. Clone the repo
2. Run `npm install` to install all the dependencies
3. Create a `.env'
4. Update `.env` with credentials as given in env.example
5. Run `npm run start` to start the project


### Tech stack
- AWS
- Prisma
- Node JS
- Express JS
- NeonDB


## Design Decisions 
### Backend Development:
Node.js: Chosen for its efficiency, scalability, and suitability for real-time file operations and I/O-intensive tasks.
Express.js: Provides a lightweight and flexible framework for structuring APIs, routing, and middleware, promoting rapid development.

### Database:
PostgreSQL: Selected for its reliability, ACID compliance, robust feature set, and suitability for relational data like user information, file metadata, and folder structures.
Prisma: Simplifies database interactions, reduces boilerplate code, and ensures type safety, enhancing developer productivity and maintainability.

### File Storage:
AWS S3: Offers secure, scalable, and cost-effective object storage, ideal for storing files of varying sizes and managing access permissions effectively.

### File Uploads:
Multer: Manages file uploads efficiently in Node.js, simplifying the process of handling multipart/form-data requests.

### Authentication and Authorization:
JWT: Implements a stateless authentication mechanism, enabling secure user sessions and access control without relying on server-side storage for sessions.

### Key Considerations:
Developer productivity: Express.js and Prisma streamline development and maintainability.
Scalability: Node.js and AWS S3 can handle increased load and data volume.
Security: JWT, input validation, and encryption (if applicable) protect sensitive data.
Cost-effectiveness: AWS S3 offers cost-optimized storage solutions.
Community support: Node.js, Express.js, and PostgreSQL have large and active communities for assistance and resources.

### Additional Benefits:
Clear project structure: Separation of concerns promotes readability and maintainability.
Potential for serverless architecture: AWS integration allows for exploring serverless functions for further scalability and cost optimization.
