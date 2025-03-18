# iCarros frontend challenge

## About the project 

This repo. contains a Vite + React + TS frontend project. The project has only two pages

- The main page displaying a list cars available to buy that can be filtered by brand 
- The error page displaying a message and allowing user to go back to the main page 

## Architecture overview

The project follows the standards for a React project. Still I'll describe the `src`: 

- `assets` has some SVG icons and illustrations 
- `components` holds the components of the application
  - `components/common` are shared components, used across the entire application
  - `components/layout` are components that compose the application layout
  - `components/pages` are components that belongs to pages. This directory has a child directory for each page and each of these directories has a collection of components that belong to the respective page 
  - `components/util` holds components that have a specific usage
- `domain` holds definitions of the business data that will be driven through the application 
- `hooks` has React custom hooks created to abstract some behaviors
  - `hooks/data` are hooks responsible for interacting with data sources. In this case, just the `json-server`
- `pages` holds the components that represents pages
- `services` has functions grouped by a strategical resource in the application 
- `stores` are a collection of Zustand stores to allow application-wide state management
- `test` has some `vitest`-related code to make the life easier while testing 
- `types` has some type definitions required by the libraries being used
- `utils` has some useful functions to be used across the application 

## Executing the project

One just need to have Docker installed and to run `docker compose up app` to run Vite development server and also a `json-server` that will be used to populate the application with some dummy data 

One can also run the unit and integration tests implemented by executing `docker compose run --rm tests`

Finally, Cypress E2E tests have to be executed locally, in a interactive way with `yarn cypress:open` or in a headless way with `yarn cypress:run`