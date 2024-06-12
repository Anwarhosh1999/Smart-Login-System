var userNameInput = document.getElementById("signUpName");
var userEmailInput = document.getElementById("signUpEmail");
var userPasswordInput = document.getElementById("signUpPassword");

var allUsers;

// ------------------------------------------------ activate preloader
let loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// ------------------------------------------------ activate localStorage
if (localStorage.getItem("allUsers") == null) {
  allUsers = [];
} else {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

// ------------------------------------------------ you must log out first!
if (localStorage.getItem("currentUser") != null) {
  window.location.href = "Home/index.html";
  window.alert("you must log out first!");
}
// ------------------------------------------------ signup function
function signUp() {
  userExist();
  userInputsValidation();
  inputEmpty();
  nameNotValid();
  emailNotValid();
  passwordNotValid();

  if (userInputsValidation() == true && userExist() == false) {
    var user = {
      name: userNameInput.value,
      email: userEmailInput.value,
      password: userPasswordInput.value,
    };
    allUsers.push(user);

    localStorage.setItem("allUsers", JSON.stringify(allUsers));

    var successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("d-none");
    var existMessage = document.getElementById("existMessage");
    existMessage.classList.add("d-none");
  } else if (userInputsValidation() == true && userExist() == true) {
    var existMessage = document.getElementById("existMessage");
    existMessage.classList.remove("d-none");
    userNameInput.classList.remove("is-valid");
    userEmailInput.classList.remove("is-valid");
    userNameInput.classList.add("is-invalid");
    userEmailInput.classList.add("is-invalid");
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  } else {
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  }
  clrForm();
}

// ------------------------------------------------ userInputsValidation
function nameIsValid() {
  var regex = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/;
  if (regex.test(userNameInput.value) == true && userNameInput.value != "") {
    userNameInput.classList.add("is-valid");
    userNameInput.classList.remove("is-invalid");
    return true;
  } else {
    userNameInput.classList.add("is-invalid");
    userNameInput.classList.remove("is-valid");
    return false;
  }
}

function emailIsValid() {
  var regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
  if (regex.test(userEmailInput.value) == true && userEmailInput.value != "") {
    userEmailInput.classList.add("is-valid");
    userEmailInput.classList.remove("is-invalid");
    return true;
  } else {
    userEmailInput.classList.add("is-invalid");
    userEmailInput.classList.remove("is-valid");
    return false;
  }
}

function passwordIsValid() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  if (
    regex.test(userPasswordInput.value) == true &&
    userPasswordInput.value != ""
  ) {
    userPasswordInput.classList.add("is-valid");
    userPasswordInput.classList.remove("is-invalid");
    return true;
  } else {
    userPasswordInput.classList.add("is-invalid");
    userPasswordInput.classList.remove("is-valid");
    return false;
  }
}

function userInputsValidation() {
  nameIsValid();
  emailIsValid();
  passwordIsValid();

  if (
    nameIsValid() == true &&
    emailIsValid() == true &&
    passwordIsValid() == true
  ) {
    return true;
  } else {
    return false;
  }
}

//------------------------------------------------ not valid inputs alerts
function nameNotValid() {
  var regex = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._@]+(?<![_.])$/;

  if (regex.test(userNameInput.value) == false && userNameInput.value != "") {
    var incorrectNameMessage = document.getElementById("incorrectNameMessage");
    incorrectNameMessage.classList.remove("d-none");
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  } else {
    var incorrectNameMessage = document.getElementById("incorrectNameMessage");
    incorrectNameMessage.classList.add("d-none");
  }
}

function emailNotValid() {
  var regex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;

  if (regex.test(userEmailInput.value) == false && userEmailInput.value != "") {
    var incorrectEmailMessage = document.getElementById(
      "incorrectEmailMessage"
    );
    incorrectEmailMessage.classList.remove("d-none");
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  } else {
    var incorrectEmailMessage = document.getElementById(
      "incorrectEmailMessage"
    );
    incorrectEmailMessage.classList.add("d-none");
  }
}

function passwordNotValid() {
  var regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  if (
    regex.test(userPasswordInput.value) == false &&
    userPasswordInput.value != ""
  ) {
    var incorrectPasswordMessage = document.getElementById(
      "incorrectPasswordMessage"
    );
    incorrectPasswordMessage.classList.remove("d-none");
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  } else {
    var incorrectPasswordMessage = document.getElementById(
      "incorrectPasswordMessage"
    );
    incorrectPasswordMessage.classList.add("d-none");
  }
}

//------------------------------------------------ empty inputs alert
function inputEmpty() {
  if (
    userNameInput.value == "" ||
    userEmailInput.value == "" ||
    userPasswordInput.value == ""
  ) {
    var fillMessage = document.getElementById("fillMessage");
    fillMessage.classList.remove("d-none");
    var successMessage = document.getElementById("successMessage");
    successMessage.classList.add("d-none");
  } else {
    var fillMessage = document.getElementById("fillMessage");
    fillMessage.classList.add("d-none");
  }
}

//------------------------------------------------ user exist alert
function userExist() {
  for (var i = 0; i < allUsers.length; i++) {
    if (
      allUsers[i].email == userEmailInput.value ||
      allUsers[i].name == userNameInput.value
    ) {
      return true;
    }
  }
  return false;
}

//------------------------------------------------ clear form
function clrForm() {
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
}
