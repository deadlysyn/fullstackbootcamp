# Final Project

In the bootcamp's final project, we created a very simple Yelp clone using all the front-end goodness
(HTML, CSS, JS), Node.js, Express and MongoDB.

If you want to see it run, you'll need an instance of MongoDB.  I used the [mongo](https://hub.docker.com/_/mongo)
Docker container, then just ran it with ```docker run --name yelpcamp -d -p27017:27017 mongo``` to get
the port exposed on localhost.  You can also use ```docker run -it --link yelpcamp:mongo --rm mongo sh -c 'exec mongo "$MONGO_PORT_27017_TCP_ADDR:$MONGO_PORT_27017_TCP_PORT/test"'``` to launch the client inside the container.  I'll eventually add a Dockerfile for the app to
piece all that together (and load some starting data)...but this should get the curious started!
