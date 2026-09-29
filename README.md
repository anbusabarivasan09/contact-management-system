# Contact Management System

## Project Description

The Contact Management System is a REST API developed using Node.js, Express.js, MongoDB and Mongoose. It allows users to create, view, update and delete contact information.

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- Thunder Client

## Contact Details

Each contact contains:

- Contact ID
- Name
- Phone Number
- Email Address

## Validation

- Contact ID is required and unique.
- Name is required.
- Phone number must contain exactly 10 digits.
- Email is required and must be in a valid format.
- Email must be unique.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/contacts` | Create a new contact |
| GET | `/contacts` | Get all contacts |
| GET | `/contacts/:id` | Get a contact by ID |
| PUT | `/contacts/:id` | Update a contact |
| DELETE | `/contacts/:id` | Delete a contact |

## Database

Database Name:

`contact_management`

The project uses MongoDB Atlas for storing contact information.

## How to Run

1. Clone the repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install