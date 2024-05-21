const express = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs");

const collectionUser = require("./LoginModel");
const collectionImage = require("./ImageModel");

// class for User Data
const UserData = {

  _name: '',
  _email: '',
  _UserScore: 0,
  _maxScore: 0,

  get getname() {
    return this._name;
  },

  get getemail() {
    return this._email;
  },

  set setName(name) {
    this._name = name;
  },

  set setEmail(email) {
    this._email = email;
  },


  get getUserScore() {
    return this._UserScore;
  },

  set setUserScore(score) {
    this._UserScore = score;
  },



  get getMaxScore() {
    return this._maxScore;
  },

  set setMaxScore(maxScore) {
    this._maxScore = maxScore;
  },

}


//database connection
const mongoose = require("mongoose");
const { mongodbUri } = require("./config");
mongoose.connect(mongodbUri)
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch(() => {
    console.log("Failed to connect");
  });


const tempelatePath = path.join(__dirname, '../tempelates')  //path of tempelates folder

app.use(express.static('public')); //path of public folder

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)

app.use(express.urlencoded({ extended: false }))


///////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {

  res.render("login")
})

app.get("/login", (req, res) => {

  res.render("login")
})

app.get("/signup", (req, res) => {

  res.render("signup")
})

app.get("/account", (req, res) => {

  res.render('account', returnUserInfo());

})
//////////////////////////////////////////////////////////////////////////////////////
function returnUserInfo() {
  const userinfo = {
    name: UserData.getname,
    email: UserData.getemail
  };

  return userinfo;
}
////////////////////////////////////////////////////////////////////////////////////
app.get("/home", (req, res) => {

  res.render("home", returnData())
})
////////////////////////////////////////////////////////////////////////////////////////////////
function returnData() {

  const data = {
    message: UserData.getname,
    UserScore: UserData.getUserScore,
    MaxScore: UserData.getMaxScore
  };

  return data
}


////////////////////////////////////////////////////////////////////////////////////////////////
//registration
app.post("/signup", async (req, res) => {

  const data = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email,
    score: 0,
  }

  await collectionUser.insertMany([data])

  const message = data.name;
  res.render("login");
})
///////////////////////////////////////////////////////////////////////////

//login 

app.post("/home", async (req, res) => {

  try {
    const check = await collectionUser.findOne({ email: req.body.email })



    if (check.password === req.body.password) {

      //store user data after login
      const message = check.name;
      UserData.setName = check.name;
      UserData.setEmail = check.email;

      //get user score and users best scores
      const UserScore = await findUserScore(UserData.getemail);
      const MaxScore = await findMaxScore();

      UserData.setUserScore = UserScore;
      UserData.setMaxScore = MaxScore;



      const data = {
        message: message,
        UserScore: UserScore,
        MaxScore: MaxScore
      };

      res.render('home', data);

    }

    else {
      const message = "wrong password";
      res.render('login', { message });
    }
  }

  catch {
    const message = "wrong cardinals";
    res.render('login', { message });
  }


})

//////////////////////////////////////////////////////////////////////////////////////////////////
//update user password

// Route to handle form submission (update)
app.post('/account/update', (req, res) => {
  const { newPassword, confirmpassword } = req.body;

  // Check if the new password and confirm new password match
  if (newPassword !== confirmpassword) {
    return res.render('account', { error: 'New passwords do not match' });
  }

  updatePassword(UserData.getname, UserData.getemail, newPassword);

  res.redirect('/home');
});

async function updatePassword(name, email, newpassword) {

  try {

    // Update the password  
    await collectionUser.updateOne(
      { name: name, email: email }, // Filter using name and email
      { $set: { password: newpassword } } // Update the password field

    );

  } catch (err) {
    console.error('Error updating score:', err);
  }
}


///////////////////////////////////////////////////////////////////////////////////////////////////////

//delete user account 
app.post('/account/delete', (req, res) => {
  const id  = req.body.id;
  

  if(id === 100){
      deleteAccount(UserData.getname, UserData.getemail); // using name and email as filters
      res.status(200).json({ message: 'the account deleted successfully' });
      
  }
  

});

async function deleteAccount(name, email) {

  await collectionUser.findOneAndDelete({ name, email });

}


app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');

// Function to count the number of files in img2 folder
function countFilesInFolder(folderPath) {
  try {
    const files = fs.readdirSync(folderPath);
    return files.length;
  } catch (error) {
    console.error('Error reading folder:', error);
    return -1;
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
// return number of files 

app.get('/filescount', (req, res) => {
  const folderPath = './public/img2';
  const number = countFilesInFolder(folderPath);

  res.json({ number });
});
////////////////////////////////////////////////////////////////////////////////////////////////////

//searching for image using image id
app.post('/imgid', async (req, res) => {
  const imgid = req.body.imgid;


  try {
    const result = await searchImageByImgid(imgid);
    if (result) {
      res.json({ imagename: result });
    } else {
      console.log('Image not found');
      res.status(404).json({ error: 'Image not found' });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/score', (req, res) => {
  const { score } = req.body;

  updateScore(UserData.getname, UserData.getemail, score);
  findMaxScore();
  // Send a response back to the client
  res.status(200).json({ message: 'Score received successfully' });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
async function updateScore(name, email, newScore) {

  try {

    // Update the score for user 
    const result = await collectionUser.updateOne(
      { name: name, email: email }, // Filter using name and email
      { $set: { score: newScore } } // Update the score field
    );


  } catch (err) {
    console.error('Error updating score:', err);
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////
async function searchImageByImgid(imgid) {
  try {
    const image = await collectionImage.findOne({ imgid });
    if (image) {

      return image.img;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error searching for image:", err);
    return null;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
// find user score using email
async function findUserScore(email) {
  try {
    const UserScore = await collectionUser.findOne({ email });
    if (UserScore) {

      return UserScore.score;
    } else {
      return null;
    }
  } catch (err) {
    console.error("Error searching for image:", err);
    return null;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////

async function findMaxScore() {

  try {
    // Find the document with the maximum score
    const document = await collectionUser.findOne().sort({ score: -1 }).limit(1); // sort to find the max score

    if (document && document.score !== undefined) {
      const maxScore = document.score;

      return maxScore;
    } else {
      console.log('No users found or scores not available');
    }
  } catch (err) {
    console.error('Error searching for maximum score:', err);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(3000, () => {
  console.log(" connected..")
})