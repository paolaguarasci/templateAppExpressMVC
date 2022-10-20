(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");
  let username = document.querySelector("#username");
  let pass1 = document.querySelector("#password");
  let pass2 = document.querySelector("#confirmationPassword");

  pass2.addEventListener("keyup", (event) => {
    if (pass1.value === pass2.value) {
      pass2.classList.add("is-valid");
      pass2.classList.remove("is-invalid");
    } else if (pass1.value !== pass2.value) {
      pass2.classList.add("is-invalid");
      pass2.classList.remove("is-valid");
    }
  });

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (
          !form.checkValidity() ||
          pass1.value === "" ||
          pass2.value === "" ||
          username.value === "" ||
          pass1.value !== pass2.value
        ) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();
