# Pager Test

For this test, I want to use VueJS. To handle the build process, I used Parcel because it gave the flexibility to create the build process. I added some unit tests built with Jest.

## Folder Structure

I used the next folder structure:
````
|--- src
|	|--- components
|	|	|--- Component
|	|		|--- index.js
|	|		|--- Component.vue
|	|		|--- __tests__
|	|		|	|--- Component.spec.js
|	|--- plugins
|	|	|--- plugin.js
|	|--- router
|	|	|--- index.js
|	|--- store
|	|	|--- actions.js
|	|	|--- mutations.js
|	|	|--- state.js
|	|	|--- index.js
|	|--- styles
|	|	|--- parts
|	|	|	|--- _part.scss
|	|	|--- globals.scss
|	|--- utils
|	|	|--- __tests__
|	|	|	|--- util.spec.js
|	|	|--- util.js
|	|--- views
|	|	|--- View
|	|	|	|--- View.vue
|	|	|	|--- index.js
````

 - Components: In this folder, you can find all the reusable components of the app. It should have his unit test inside the folder `__tests__`.
 - Plugins: This folder has all the custom plugins created for the app; in this case, I created one to handle the socket connection.
 - Store: For this specific project, I created one file to control the global state, but if those files start to get bigger, I would prefer to breaking actions, mutations, and state for functionalities.
 - Styles: it has all the variables and shared styles in the app.
 - Views: Should have all the components set in the router file.

## Setup
To run this project locally, I recommend using node version 12. Next is the command to run it in your local machine:

 1. `npm install`
2. `npm run dev`

If you want to run a test, you can do it with `npm test`