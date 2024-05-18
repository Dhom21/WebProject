const express  = require("express");
const app = express();
const path = require("path")
const hbs = require("hbs");
const collectionUser = require("./mongodb")

const tempelatePath = path.join(__dirname,'../tempelates')
 

app.use(express.static('public')); 

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", tempelatePath)
 
app.use(express.urlencoded({extended:false}))

app.get("/",(req, res)=>{

    res.render("login")
})

app.get("/login",(req, res)=>{

    res.render("login")
})

app.get("/signup", (req, res)=>{

    res.render("signup")
})

app.post("/signup",async (req,res)=>{

 const data ={
    name:req.body.name,
    password:req.body.password,
    email:req.body.email
 }

  await collectionUser.insertMany([data])

  const message = data.name;  
  res.render("home", { message });
})


app.post("/login",async (req,res)=>{

     try{
         const check = await collectionUser.findOne({email:req.body.email})

         if(check.password ===req.body.password){
            const message = check.name ;  
            res.render("home", { message });
         }

         else{
            const message = "wrong password" ;            
            res.render('login', { message });
         }
     }

     catch{
          const message = "wrong cardinals" ;            
           res.render('login', { message });
     }
     
      
   })

  //////////////////////////////////////////////////////////////////////////////////////////////////

const fs = require('fs');

// Function to count the number of files in a folder
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
 // return number of files to javascript

app.get('/filescount', (req, res) => {
  const folderPath = './public/img2';
  const number = countFilesInFolder(folderPath);
  console.log('Sending number:', number);
  res.json({ number });
});



app.listen(3000,()=>{
    console.log(" connected..")
})