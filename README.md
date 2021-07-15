# SafeChat Project

This project was bootstrapped with Create React App.

It uses React with MapBox to render a world map. The project pulls data from NASA's EONET API and renders world weather events as interactive icons. The app also relies on Turf spatial analysis to correctly display the direction of storm events. Users can navigate the map, filter the events by category, or view more details by clicking on icons.

A [full demo of the app can be found here](https://compassionate-darwin-7d658e.netlify.app/).

## To install

Clone the github repo to your machine.

Execute `cd disaster-tracker` into the terminal to go into the repo folder

Execute `npm install` to download all dependencies

`npm start` to open the project on a development server

Make sure to set up your MapBox and NASA API tokens as environment variables.

## Using the app

Once in the app, you can send explore events or use the sidebar on the left to filter the data.
