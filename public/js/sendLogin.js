let username = document.querySelector("#username");
let password = document.querySelector("#password");
let message = document.querySelector("#message");
let btnSubmit = document.querySelector("#btnSubmit");

function validationForm() {
  return validationUsername() && validationPassword();
}
function validationUsername() {
  return true;
}
function validationPassword() {
  return true;
}

btnSubmit.addEventListener("click", async function (event) {
  event.preventDefault();
  if (validationForm()) {
    try {
      const login = await fetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(login);
      if (login.redirected) {
        window.location.replace(login.url);
      }
    } catch (e) {
      console.log(e);
    }
  }
});
