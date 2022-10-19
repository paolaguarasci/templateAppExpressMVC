let email = document.querySelector("#email");
let password = document.querySelector("#password");
let confirmationPassword = document.querySelector("#confirmationPassword");
let message = document.querySelector("#message");
let btnSubmit = document.querySelector("#btnSubmit");

function validationForm() {
  return validationEmail() && validationPassword() && passwordsMatch();
}
function validationEmail() {
  return true;
}
function validationPassword() {
  return true;
}
function passwordsMatch() {
  return password.value === confirmationPassword.value;
}

btnSubmit.addEventListener("click", function (event) {
  event.preventDefault()
  if (validationForm()) {
    fetch("/auth/registration", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
        confirmationPassword: confirmationPassword.value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
});
