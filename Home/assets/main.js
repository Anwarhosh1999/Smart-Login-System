// ------------------------------------------------ activate preloader
let loader = document.getElementById("preloader");
window.addEventListener("load", function () {
  loader.style.display = "none";
});

// ------------------------------------------------ Welcome userName
document.getElementById("currentUser").innerHTML =
  localStorage.getItem("currentUser");

// ------------------------------------------------ logOut function
function logOutBtn() {
  localStorage.removeItem("currentUser");
  window.location.href = "../Sign In/index.html";
}
