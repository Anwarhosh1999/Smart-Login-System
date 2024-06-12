let loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

var signInEmail = document.getElementById("signInEmail");
var signInPassword = document.getElementById("signInPassword");
var signInBtn = document.getElementById("signInBtn");

var allUsers;
// ------------------------------------------------ activate localStorage
if (localStorage.getItem("allUsers") == null) {
  allUsers = [];
} else {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

// ------------------------------------------------ you must log out first!
if (localStorage.getItem("currentUser") != null) {
  window.location.href = "../Home/index.html";
  window.alert("you must log out first!");
}

// ------------------------------------------------ signin function
function signIn() {
  if (inputEmpty() == true) {
    var fillMessage = document.getElementById("fillMessage");
    fillMessage.classList.remove("d-none");
    var incorrectMessage = document.getElementById("incorrectMessage");
    incorrectMessage.classList.add("d-none");
    signInEmail.classList.add("is-invalid");
    signInPassword.classList.add("is-invalid");
  } else {
    var fillMessage = document.getElementById("fillMessage");
    fillMessage.classList.add("d-none");
    if (userExist() == true) {
      var incorrectMessage = document.getElementById("incorrectMessage");
      incorrectMessage.classList.add("d-none");
      signInEmail.classList.remove("is-invalid");
      signInPassword.classList.remove("is-invalid");
      window.location.href = "../Home/index.html";
    } else {
      incorrectMessage();
      signInEmail.classList.add("is-invalid");
      signInPassword.classList.add("is-invalid");
    }
  }
  clrForm();
}

//------------------------------------------------ user exist alert
function userExist() {
  for (var i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].email == signInEmail.value &&
      allUsers[i].password == signInPassword.value
    ) {
      localStorage.setItem("currentUser", allUsers[i].name);
      return true;
    }
  }
  return false;
}

//------------------------------------------------ empty inputs alert
function inputEmpty() {
  if (signInEmail.value == "" || signInPassword.value == "") {
    return true;
  }
  return false;
}

//------------------------------------------------ empty inputs alert
function incorrectMessage() {
  var incorrectMessage = document.getElementById("incorrectMessage");
  incorrectMessage.classList.remove("d-none");
}

//------------------------------------------------ clear form
function clrForm() {
  signInEmail.value = "";
  signInPassword.value = "";
}
