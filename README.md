# Robin - Chat App

The objective of this website/project is to provide a platform to all who can just visit and log in to our website 
and they can create their own chat room where they can talk to their friend anywhere from the world, share their location 
(*and pictures, videos, documents - To Be Added Later!)

---

# Project Authors

Check Us Out

[Pijush Konar](https://github.com/pijush-konar-au7) & [Saidul Mondal](https://github.com/saidul-mondal-au7)

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

---

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

```
    $ node -v
    v12.16.2

    $ npm -v
    6.14.4
```
---

## Project Installation
  After installing node, this project will need many NPM Packages, so just run the following command to install all.

    $ git clone Here(https://github.com/attainu/robin-chat-app-two)
    $ cd robin-chat-app-two
    $ npm i

---

## Configuration

Open `robin-chat-app-two\config` then create and dev.env file and edit it with your infos. You will need:

- PORT=`Your Desired Port`
- NAME=`Your Database UserName`:
- PASSWORD=`Your MongoDB Password`
- CLUSTER=`@Your MongoDB Cluster Address`
- SENDGRID_API_KEY=`Enter Your SendGrid Email API Register On Sendgrid`

---

## Running The Project

```sh
    $ npm run dev
```


## NPM Packages Used -

- #### @sendgrid/mail - It’s Mail Service npm for the SendGrid v3 Web Email API. We used it to send signup emails and account deletion emails to the users. You can find it out here - [@sendgrid/mail](https://www.npmjs.com/package/@sendgrid/mail)

- #### bad-words - It is a javascript filter for bad words. It’s an npm module that you can find it out here at [bad-words](https://www.npmjs.com/package/bad-words). We have used this to add as a profanity filter in our chat room, to save our users from abuses/hatered of any sort inside the chat room.

- bcryptjs - We are using bcrypt.js module to hash password of the user.

- connect-flash": "^0.1.1",

- ejs - This is the view engine we used.

- express -

- express-ejs-layouts - 

- express-session - 

- mongoose - We used Mongoose because it provides schema-based solution to model our application data. Which has many features to use example - validation of user's data.

- multer - 

- npm - 

- passport - 

- passport-local - 

- sharp - 

- socket.io - 

- validator - 


---

## Project Demo Website Hosted On Heroku -

#### Visit Here [AttainU Chat](https://attainu-chatapp.herokuapp.com/)

## Project Screenshots

Main Page
<!-- ![](project1.png) -->

Account Details Page
<!-- ![](project2.png) -->

Chat Page
<!-- ![](project3.png) -->

Screenshots To Be Added