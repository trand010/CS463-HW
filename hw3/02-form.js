document.addEventListener("DOMContentLoaded", () => {
  const signUpForm = document.querySelector(".sign-up-form");

  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let allFieldsFilled = true;
    let pronounSelected = false;

    this.querySelectorAll(
      'input[type="text"], input[type="email"], input[type="password"], input[type="date"]'
    ).forEach((input) => {
      if (input.value === "") {
        allFieldsFilled = false;
        input.style.borderColor = "red";
      } else {
        input.style.borderColor = "";
      }
    });

    this.querySelectorAll('input[name="pronouns"]').forEach((radio) => {
      if (radio.checked) {
        pronounSelected = true;
      }
    });

    if (!allFieldsFilled || !pronounSelected) {
      console.warn("Please fill out all required fields.");
      return;
    }

    const fieldMapping = {
      name: "Name",
      username: "Username",
      email: "Email",
      dob: "Date of Birth",
      pronouns: "Preferred Pronouns",
    };

    const formData = new FormData(this);
    console.log("======= Form Submission =======");
    for (let [key, value] of formData.entries()) {
      if (key !== "password") {
        if (key === "dob") {
          const date = new Date(value);
          const options = { year: "numeric", month: "long", day: "numeric" };
          value = date.toLocaleDateString(undefined, options);
        }
        const outputKey = fieldMapping[key] || key;
        console.log(`${outputKey}: ${value}`);
      }
    }
  });
});
