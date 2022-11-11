# simple-penulum


## Project setup
Go to `pendulums_api` directory and install all dependencies:

```
npm install
```
Once all dependencies are installed, you can run the application:
```
node app.js
```
For dev purposes and hot reload use this command:
```
{path-to-your-node-module}/nodemon/bin/nodemon.js app.js
```
Once the server is running you should see workers logging the initiation like so:
> Primary 494675 is running
Worker 494706 started
worker process 494706 is listening on port 8000
Worker 494708 started
Worker 494707 started
worker process 494708 is listening on port 8002
worker process 494707 is listening on port 8001
Worker 494715 started
worker process 494715 is listening on port 8004
Worker 494714 started
worker process 494714 is listening on port 8003

NOTE: This application uses ports 8000 to 8004.

Once the server is running successfully, navigate to `pendulums_frontend` and open `index.html`.

You should see pendulums running already configured. You can change the configuration and restart by pressing `submit`.

## Some context
Go to `pendulums_api` directory and install all dependencies:


