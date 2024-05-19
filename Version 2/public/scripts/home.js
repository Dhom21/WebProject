
//start button calling starttimer function
document.getElementById("startbtn").addEventListener('click', () => {
  document.getElementById("startbtn").disabled = true;
  timerElement.style.color = "aqua"
  sendImageIdToServer(roll());

  // Start the timer with 30 seconds
  startTimer(15);
})





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



 let filescount = 0; ;
// JavaScript (client-side)
fetch('/filescount')
  .then(response => response.json())
  .then(data => {
    console.log('Received number:', data.number);
    filescount =  data.number ;
  })
  .catch(error => {
    console.error('Error:', error);
  });


//select 4 images
function selectFourImagesRandomly() 
{
  // Call the function to get 4 unique numbers
  const uniqueNumbers = get4UniqueNumbers();
  console.log(uniqueNumbers);

}


// Function to generate a random number between min and max  
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 4 unique random numbers between 1 and filescount
function get4UniqueNumbers() {
  const numbers = new Set();

  while (numbers.size < 4) {
    const randomNumber = getRandomNumber(1, filescount);
    numbers.add(randomNumber);
  }

  return Array.from(numbers);
}

document.getElementById("i1").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)   
  sendImageIdToServer(roll());
})

document.getElementById("i2").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    sendImageIdToServer(roll());
   
})
document.getElementById("i3").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    sendImageIdToServer(roll());
   
})
document.getElementById("i4").addEventListener('click',()=>{ 
  if(document.getElementById("startbtn").disabled)
    sendImageIdToServer(roll());
  
})



function roll(){
  const uniqueNumbers = get4UniqueNumbers();
  document.getElementById('i1').src ="/img2/"+ uniqueNumbers[0] + ".JPG"
  document.getElementById('i2').src ="/img2/"+ uniqueNumbers[1] + ".JPG"
  document.getElementById('i3').src ="/img2/"+ uniqueNumbers[2] + ".JPG"
  document.getElementById('i4').src ="/img2/"+ uniqueNumbers[3] + ".JPG"
  
  return uniqueNumbers[getRandomIndex()]

}


function getRandomIndex() {
  return Math.floor(Math.random() * 4);
}


function changeToQuetionMark(){
  document.getElementById('i1').src ="/img/login/q1.jpg";
  document.getElementById('i2').src ="/img/login/q1.jpg";
  document.getElementById('i3').src ="/img/login/q1.jpg";
  document.getElementById('i4').src ="/img/login/q1.jpg";

}

///////////////////////////////////////////////////////////////////

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
     document.getElementById("answerp").textContent = imgid +"  "+  data.imagename  ;
  })
  .catch(error => {
    console.error('Error:', error);
  });
}
  
