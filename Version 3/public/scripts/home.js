 //class appData
 
 const appData= {
  _filecount:0,
   _img:'',
   _answers:0,
   _correctAnswers:0,


  get getfilescount(){
   return this._filecount ;
  },

  set setfilescount(filescount)
  {
    this._filecount = filescount ;   
  },

  get getImgName(){
    return this._img ;
   },
 
   set setImgName(imgName)
   {
     this._img = imgName ;   
   },

   get getAnswers(){
    return this._answers;
   },
 
   set setAnswers(answers)
   {
     this._answers = answers ;   
   },

   get getcorrectAnswers(){
    return this._correctAnswers;
   },
 
   set setcorrectAnswers(correct)
   {
     this._answers = correct ;   
   },
 

 };



//start button calling starttimer function
document.getElementById("startbtn").addEventListener('click', () => {
  restAppData();
  document.getElementById("startbtn").disabled = true;
  timerElement.style.color = "aqua"
  sendImageIdToServer(roll());

  // Start the timer with 30 seconds
  startTimer(60);
})


//rest appData to default values
function restAppData(){
  appData._img ='';
  appData._answers =0 ;
  appData._correctAnswers =0 ;
}



// Get the timer element
const timerElement = document.getElementById('timer');


// Function to update the timer
function updateTimer(seconds) {
  timerElement.textContent = seconds;
}


// Function to be executed after the timer expires
function timerExpired() {
  timerElement.textContent = 'Time finshed!';
  timerElement.style.color = "rgb(241, 139, 139)"
  document.getElementById("startbtn").disabled = false;
  changeToQuetionMark();
  document.getElementById("answerp").textContent = "Your Score: "+appData._correctAnswers+" out of "+appData._answers ;
  updateScore(appData._correctAnswers);
}


// Function to start the timer
function startTimer(seconds) {
  updateTimer(seconds);

  // Decrease the timer every second
  const timerId = setInterval(() => {
    seconds--;
    updateTimer(seconds);

    // Check if the timer has expired
    if (seconds === 0) {
      clearInterval(timerId);
      timerExpired();
    }
  }, 1000);
}



 
// getting the files count (images numbers)
fetch('/filescount')
  .then(response => response.json())
  .then(data => {
    console.log('Received number:', data.number);
    
    appData.setfilescount = data.number ;
     
  })
  .catch(error => {
    console.error('Error:', error);
  });


//select 4 images
function selectFourImagesRandomly() 
{
  // Call the function to get 4 unique numbers
  const uniqueNumbers = get4UniqueNumbers();
   

}


// Function to generate a random number between min and max  
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 4 unique random numbers between 1 and filescount
function get4UniqueNumbers() {
  const numbers = new Set();
  const filescount = appData.getfilescount ;
  while (numbers.size < 4) {
    const randomNumber = getRandomNumber(1, filescount);  // <--------
    numbers.add(randomNumber);
  }

  return Array.from(numbers);
}
//////////////////////////////////////////////////////////////////////////////

// click on images events

document.getElementById("i1").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)  
    {
      check("i1");
      sendImageIdToServer(roll());
    } 
 
})

document.getElementById("i2").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    {
      check("i2");
      sendImageIdToServer(roll());
    } 
   
})
document.getElementById("i3").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    {
      check("i3");
      sendImageIdToServer(roll());
    } 
   
})
document.getElementById("i4").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    {
      check("i4");
      sendImageIdToServer(roll());
    } 
  
})
//////////////////////////////////////////////////////////////////////////////


//check that user click the right image or not

function check(imgID){
   const imageElement = document.getElementById(imgID);
   const imageSrc = imageElement.src;
   const imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1);  //substracting image name frome image scr path
   
  if(imageName == appData._img){
     
    appData._correctAnswers++ ;
    appData._answers++ ;
  }
    

  else{
    
    appData._answers++ ;
  } 

}
//////////////////////////////////////////////////////////////////////////////
//select 4 random images 

function roll(){
  const ImageNameIndex = get4UniqueNumbers();
  document.getElementById('i1').src ="/img2/"+ ImageNameIndex[0] + ".JPG"
  document.getElementById('i2').src ="/img2/"+ ImageNameIndex[1] + ".JPG"
  document.getElementById('i3').src ="/img2/"+ ImageNameIndex[2] + ".JPG"
  document.getElementById('i4').src ="/img2/"+ ImageNameIndex[3] + ".JPG"
  
  const selectedImage = ImageNameIndex[getRandomIndex()] //select one image for query
  appData._img  = selectedImage + ".JPG" ;

  return selectedImage 

}

/////////////////////////////////////////////////////////////////////////////


//select one from 4 random images

function getRandomIndex() {
  return Math.floor(Math.random() * 4);
}
//////////////////////////////////////////////////////////////////////////////

//the default images before clicking start button

function changeToQuetionMark(){
  document.getElementById('i1').src ="/img/login/q1.jpg";
  document.getElementById('i2').src ="/img/login/q1.jpg";
  document.getElementById('i3').src ="/img/login/q1.jpg";
  document.getElementById('i4').src ="/img/login/q1.jpg";

}

///////////////////////////////////////////////////////////////////

//send image id to node js app for searching in image collection

function sendImageIdToServer(imgid) {
  fetch('/imgid', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imgid: imgid })
  })
  .then(response => response.json())
  .then(data => {
     console.log('Response from server:', data);
     document.getElementById("answerp").textContent = data.imagename  ;
     
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  
//////////////////////////////////////////////////////////////////////////

// sending user score for updating

function updateScore(userScore) {
  // Send the score to the server
fetch('/score', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ score: userScore })
})
.then(response => {
  if (response.ok) {
    console.log('Score sent successfully');
  } else {
    console.error('Error sending score:', response.status);
  }
})
.catch(error => {
  console.error('Error sending score:', error);
});
}
///////////////////////////////////////////////////////////////////////////////////////