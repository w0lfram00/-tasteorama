# Tasteorama
Project to showcase my abilities in developing web sites from scratch, using typescript.

For frontend I used React and Typescript with Vite as bundler. And for back end I used Node.js and MongoDB for handling a Data base.

Displays recipes on main page, which can be filtered with several parameters. After changing filters browser history is updated, so you can navigate with comfort. You can authorize. After what you gain ability to post recipes on site and delete them afterwards. 
Passwords are saved on data base in secure form.

Site uses tokens with session Id to confirm requests. They last for 15 minutes, after what they are automatically refreshed on next request or updating the page
