# Movie App

This is a movie search app. It uses the TMDb API to search for movies and display them on screen.

# Fullstack App

This is a fullstack application with a frontend in the `client` directory and a backend in the `server` directory.

This application is using React for the frontend, Redux for state management and Express for the backend all running on Typescript.

## Installation

First, clone the repository

```cd movie-app```

Then install dependencies:

```npm install```

Then to start both backend and frontend concurrently:

```npm run dev```

You may need to install concurrently for this to work

Local

```npm i -D concurrently```

Global

```npm i -g concurrently```

If this does not work, you can navigate to the client and server directory independently and run the same command

Frontend will run on http://localhost:5173

Backend will run on http://localhost:5000

# Live Preview

To see the app go to https://movie-app-pi-pink.vercel.app/ 

## Available Scripts

In the project directory, you can run:

#### `npm run dev`

Runs both the client and server in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view the client in the browser. The server will run on [http://localhost:5000](http://localhost:5000) or another port if specified.

The page will reload if you make edits in the `client` directory.\
You will also see any lint errors in the console.

#### `npm run start:client`

Runs the client in the production mode.\
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run start:server`

Runs the server in the production mode.

#### `npm run dev:client`

Runs the client in the development mode.

#### `npm run dev:server`

Runs the server in the development mode.

#### `npm run build:client`

Builds the client for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

#### `npm run build:server`

Builds the server for production to the `dist` folder.

#### `npm run build`

Builds both the client and server for production.
