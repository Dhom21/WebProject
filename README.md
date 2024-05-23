# Project Title: Picture Quiz Game
# Description
The Picture Quiz Game is an interactive multiple-choice game where players select images as answers to questions. It aims to provide an engaging and educational experience for users of all ages.


# Notes-NodeJs-CRUD-MongoDB

# Clone the repository
git clone https://github.com/Dhom21/WebProject.git

## You need:
- Database (MongoDB)
- Google Console Account to create the API Auth Key's

## Create .env file
Create a .env file to store your credentials. Example below:

```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
GOOGLE_CLIENT_ID= YOUR_GOOGLE_ID_HERE
GOOGLE_CLIENT_SECRET= YOUR_GOOGLE_CLIENT_SECRET_HERE
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
```

## Installation
To install and run this project - install dependencies using npm and then start your server:

```
$ npm install
$ npm start
```
