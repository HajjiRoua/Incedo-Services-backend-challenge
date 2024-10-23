# Artist Search API

A simple Node.js application that allows users to search for artists and retrieve their data from the Last.fm API. If no results are found, the application returns a list of random artists.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Project Architecture](#project-architecture)


## Features
- Search for artists by name
- Export search results to CSV
- Returns random artists if no results are found

## Technologies Used
- Node.js
- Express
- Axios
- Zod (for schema validation)
- dotenv (for environment variable management)
- json2csv (for CSV file creation)

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/HajjiRoua/Incedo-Services-backend-challenge.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

To start the server, run:

```bash
npm run dev
```

The server will run on the specified port (default: 3000).

## API Endpoints

### Search Artist

**Endpoint:** `/api/artist/search`  
**Method:** `POST`  
**Request Body:**

```json
{
    "artistName": "Cher",
    "page": 1,
    "filename": "CherFile"
}
```

**Response:**

- **Success (200)**: Returns an object containing the list of artists.
- **Error (400)**: Returns an error message if validation fails.
- **Error (500)**: Returns an unexpected error message.

Here’s a brief overview of each file in your project structure, along with a summary of the overall project architecture:

## Project Structure

#### `output/` : a directory that stores generated CSV files containing artist search results, allowing users to easily access and retrieve their exported data from the application.

#### `api/`

- **`apiService.ts`**: This file contains the logic for making API calls to the Last.fm API. It handles fetching artist data based on user requests.

#### `constants/`

- **`apiConstants.ts`** & **`common.ts`**:  Contains common utility functions or constants that can be reused across the application.

#### `controllers/`

- **`artistController.ts`**: Manages incoming requests related to artist searches. It processes the requests, interacts with the `apiService`, and returns responses to the client.

#### `models/`

- **`ValidationSchemas.ts`**: Defines validation schemas for incoming requests, ensuring that the data adheres to expected formats using the Zod library.

- **`customError.ts`**: Contains the implementation of custom error handling, defining the structure and properties of error objects returned by the API.

- **`searchArtistRequest.ts`**: Specifies the request model for searching artists, including required fields and their types.

#### `routes/`

- **`artistRoutes.ts`**: Defines the routes for artist-related API endpoints. It maps HTTP requests to the appropriate controller functions, organizing the API structure.

#### `assets/`

- **`randomArtistNames.json`**: A JSON file that contains a list of random artist names used when no search results are found. This serves as a fallback mechanism to provide users with interesting alternatives.

#### `server.ts`

- **`server.ts`**: The entry point of the application. It sets up the Express server, initializes middleware, and connects the defined routes.

#### `.env`

- **`.env`**: A configuration file that contains environment-specific variables, such as API keys and port numbers. This file should not be shared publicly for security reasons.

---

## Project Architecture 

The architecture of the **Artist Search API** follows a modular design pattern, separating concerns into distinct layers. This organization enhances maintainability and scalability. The API structure consists of:

- **Controllers**: Handle incoming requests and manage application logic.
- **Routes**: Define endpoint mappings for clear and organized API access.
- **Services**: Encapsulate external API interactions to streamline data retrieval.
- **Models**: Define data validation and error handling mechanisms to ensure data integrity.
- **Constants**: Store reusable values and configurations for easy reference and management.
