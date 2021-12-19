var myInput = document.getElementById("psw");
var mySecondInput = document.getElementById("psww");
var capital = document.getElementById("capital");
var length = document.getElementById("length");

myInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

myInput.onblur = function() {
  document.getElementById("message").style.display = "none";
}


myInput.onkeyup = function() {
  
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }
  
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

mySecondInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
  }
  
  mySecondInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }
  
  
  mySecondInput.onkeyup = function() {
    
    var upperCaseLetters = /[A-Z]/g;
    if(mySecondInput.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }
    
    if(mySecondInput.value.length >= 8) {
      length.classList.remove("invalid");
      length.classList.add("valid");
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  }