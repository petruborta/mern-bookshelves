# BOOKSHELVES

![Bookshelves above the fold section](https://github.com/petruborta/developer-portfolio/blob/master/assets/images/bookshelves-720w.jpg?raw=true)

Full stack web application for managing collections of books.

## Table of contents

* [Demo](#demo)
* [Technologies](#technologies)
* [Setup](#setup)
* [Status](#status)
* [Inspiration](#inspiration)
* [Contact](#contact)

## Demo

Here is a working live demo: <https://my-bookshelves.com/>

## Technologies

* Development
  * [HTML](https://www.w3schools.com/html/)
  * [CSS](https://www.w3schools.com/css/)
  * [JavaScript](https://www.w3schools.com/js/)
  * [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  * [Express.js](https://expressjs.com/)
  * [React.js](https://reactjs.org/)
  * [Node.js](https://nodejs.org/en/)
  * [Google Books API](https://developers.google.com/books/docs/v1/using)
* Production / Hosting
  * [AWS S3](https://aws.amazon.com/s3/)
  * [AWS Route 53](https://aws.amazon.com/route53/)
  * [AWS CloudFront](https://aws.amazon.com/cloudfront/)
  * [ACM (Amazon Certificate Manager)](https://aws.amazon.com/certificate-manager/)

## Setup

* Clone this repository to your local machine

  `$ git clone https://github.com/petruborta/mern-bookshelves`

* Go to MongoDB site and create a free account
* Create a cluster and within this cluster create a database with 2 collections named `books` and `users`
* Add a record to `users` collection following the user schema from `models/User.js`
* Connect the application to cluster by clicking the `CONNECT` button, selecting `Connect your application` option and copying the given link
* In project's main folder create a `.env` file with the following content and replace `YOUR_ATLAS_URI` with the link from the previous step, `secret` with any string you want  and `YOUR_ID` with your user ID from step 4

```env
PORT=5000
ATLAS_URI=YOUR_ATLAS_URI
rootAdminID=YOUR_ID
secretOrKey=secret
```

* Also create `keys.js` file in `config` folder and add the following code to it

```javascript
module.exports = {
  ATLAS_URI: process.env.ATLAS_URI,
  rootAdminID: process.env.rootAdminID,
  secretOrKey: process.env.secretOrKey
};
```

* Go to Google Cloud Platform, add new project that uses Books API and create credentials to use enabled API

* Once you've got the credentials, in `client` folder create a `.env` file and replace `YOUR_GOOGLE_BOOKS_API_KEY` with your actual key's value
  
  `REACT_APP_BOOKS_API_KEY=YOUR_GOOGLE_BOOKS_API_KEY`

* Change working directory `cd client` and run `sudo npm install` to install all the dependencies
* Go back to project's main folder `cd ..` and run `sudo npm install` to install all the dependencies

* Use the command `npm run dev` to see the project live

## Status

Project is: _in progress_ - "suggest a book" feature needs to be implemented and then the app can be extended with even more features

## Inspiration

Followed [this](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669) tutorial to implement user authentication via passport and JWTs.

## Contact

Created by [@petruborta](https://petruborta.com/) - feel free to contact me!
