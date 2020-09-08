# Peakwise

![PEAKWISE](https://res.cloudinary.com/dghpuejpt/image/upload/c_scale,w_325/v1596312050/img/logo-black_a7wlcb.png)

> Practice project with the MERN stack
##
> Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
---

### Table of Contents

- [Peakwise](#peakwise)
  - [> Bootstrapped with Create React App.](#blockquotebootstrapped-with-create-react-appblockquote)
    - [Table of Contents](#table-of-contents)
  - [Description](#description)
      - [Technologies](#technologies)
      - [Libraries used](#libraries-used)
      - [External API Reference](#external-api-reference)
  - [Installation](#installation)
  - [Starting the app](#starting-the-app)
  - [To visit the app](#to-visit-the-app)
  - [React app routes](#react-app-routes)
  - [Server routes and methods](#server-routes-and-methods)
  - [References](#references)
  - [Author Info](#author-info)

---

## Description

What is Peakwise? 
- A simple platform for the climbing enthusiasts to share informative articles about mountain peaks. You can create, modify and delete articles, pick favorites, mark the ones you have conquered.

#### Technologies

- React
- Express
- MongoDB
- Node.js

#### Libraries used
> For the React App
- [create-react-app](https://github.com/facebook/create-react-app)
- [react-router-dom](https://www.npmjs.com/package/react-router-dom)
- [concurrently](https://www.npmjs.com/package/concurrently)
- [mapbox-gl](https://www.npmjs.com/package/mapbox-gl)
- [serialize-error](https://www.npmjs.com/package/serialize-error)

> For the server
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [cors](https://www.npmjs.com/package/cors)
- [dotenv](https://www.npmjs.com/search?q=dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [morgan](https://www.npmjs.com/package/morgan)
- [validator](https://www.npmjs.com/package/validator)


#### External API Reference
- Cloudinary - https://cloudinary.com/
- Mapbox - https://www.mapbox.com/
  
[Back To The Top](#peakwise)

---

## Installation
##
Run **npm install** in root dir and in /api
##
* root dir = React app
* /api = server
##
Create **.env** and **api.env** in the root dir.
##
Use **.env** for the React App env variables. Set up the following:
    
    REACT_APP_MAPBOX_TOKEN= 'Your Default public token from Mapbox'
    REACT_APP_API_URL= 'http://localhost:9999' (if you use the API in /api to communicate with the DB)

##
Use **api.env** for the server env variables. Initial setup:

    NODE_ENV= 'development'
    PORT= 'port number'
    DATABASE= 'mongoDB db url with <PASSWORD> as a placeholder for the password string'
    DB_PASS= 'mongoDB db password'
    SECRET= 'jwt secret key'

**api.env** example:

    NODE_ENV=development
    PORT=9999
    DATABASE=mongodb+srv://foo:<PASSWORD>@cluster0.000bar.mongodb.net/foo?retryWrites=true&w=majority)
    DB_PASS=lorem123
    SECRET=ipsum456
** The React app will run by default on port 3000

---

## Starting the app
Run **npm start** in root dir to start in development mode. Both the React app and the server will be started simultaneously.


## To visit the app

> http://localhost:3000/
##

## React app routes
For regular users:
> http://localhost:3000/login
> ##
> http://localhost:3000/register
> ##
> http://localhost:3000/explore
> ##
> http://localhost:3000/profile/*
> ##
> http://localhost:3000/details/*
##

'admin' users can access the above and:
> http://localhost:3000/create-article
> ##
> http://localhost:3000/edit/*
> ##
> http://localhost:3000/modify
> ##
* To access 'admin' routes, update the respective user's *userAccess* property to 'admin' directly in the databse, or with a PATCH request to http://localhost:9999/api/v1/users/:userid
#
## Server routes and methods

> http://localhost:9999/api/v1/users
> ##
> >/ - GET, POST
> ##
> >/detailed/:id - GET
> ##
> >/:id - GET, PATCH, DELETE
> ##
> >/register - POST
> ##
> >/login - POST
> ##
> >/verify - POST

> http://localhost:9999/api/v1/trips
> ##
> / - GET, POST
> ##
> /:id - GET, PATCH, DELETE
> ##
> /top-trips - GET
> ##
> /trip-stats - GET

##
[Back To The Top](#peakwise)

---

## References
[SoftUni ReactJS Course](https://softuni.bg/trainings/3023/reactjs--june-2020/internal)
##


---

## Author Info

- LinkedIn - [Svetoslav Popov](https://www.linkedin.com/in/s-popov/)

[Back To The Top](#peakwise)
