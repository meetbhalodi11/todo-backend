## Todo app backend

### Tech stack
1. Node (Express), Mongodb
2. Flowbite (React tailwind UI Library)

### Features
1. Login/Sign up throught JWT
2. Add/Edit/Remove/Update tasks
3. Persistent storage
4. Switch to dark mode as per system preference

### Local setup
1. Clone the repository
2. Create a `.env` file at the root level and add the following content and add the respective values for variables
```
MONGODB_URL=<DB-URL>
SERVER_PORT=3000
JWT_SECRET=<Secret for signing>
```
3. run `npm i` at the root level to install all the dependencies
4. run `npm run start` to start the backend server

### Challanges
1. API error handling and overing all the scenarios

### Demo

### Frontend repo url
https://github.com/meetbhalodi11/todo-frontend
