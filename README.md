# stackoverflow-backend
It is clone of stackoverflow using node.js, express.js, and mongodb 

To setup the project locally:
1. clone the repo make .env file, where you need to provide the environment variables
   ```
   PORT 
   JWT_KEY
   DB_PASSWORD(mongodb atlas cluster password )
   
   please go to the `config/db.js` to change your username of cluster
   ```

2. install all dependecies using
   ```
   npm install
   ```
3. run the command to start the server
   ```
   npm run dev
   ```

Now open the collection in postman which is provided in root directory with name `stackoverflow.postman_collection.json`
- it has all API endpoints which I developed
- you can test it. 
