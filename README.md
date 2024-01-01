
# Pane Notes

## Overview
Pane Notes is a simple web OneNote alternative that provides user a free pane note creation experience. It's built using a ReactJS frontend and an ExpressJS backend.

## Technical Details
- **Frontend**: The frontend is built with ReactJS. It communicates with the backend via RESTful APIs.
- **Backend**: The backend is an ExpressJS server which handles API requests from the frontend. It stores notes in memory.

## Local Development Setup
1. Clone the repository.
2. Navigate to the `frontend` directory and run `npm install` to install dependencies.
3. Start the frontend development server with `npm start`.
4. In a separate terminal, navigate to the `backend` directory and run `npm install`.
5. Start the backend server with `node server.js`.

## Environment Variables
- `REACT_APP_BACKEND_URL`: The URL for the backend API (default is `http://localhost:5000`).

## Deployment
Instructions for deploying the application on an EC2 instance are available in the deployment guide.

## Contributing
Contributions are welcome! Please fork the repository and open a pull request with your changes.

## License
Pane Notes is open-source software licensed under the MIT license.
