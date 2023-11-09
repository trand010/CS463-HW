document.addEventListener("DOMContentLoaded", () => {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;

  mainElement.style.textAlign = "center";
  mainElement.style.display = "flex";
  mainElement.style.flexDirection = "column";
  mainElement.style.justifyContent = "flex-start";
  mainElement.style.alignItems = "center";
  mainElement.style.height = "100vh";

  const profileImage = document.createElement("img");
  profileImage.src = "../images/daniel.png";
  profileImage.alt = "Daniel";
  profileImage.className = "hello-profile-image";

  const bioText = document.createElement("p");
  bioText.className = "hello-bio";
  bioText.innerHTML =
    "<strong>My name is Daniel and I am a</strong> student in CS463: Intro to Web Development this quarter. I took this class to learn more about HTML, CSS, JavaScript, and to overall gain the fundamental skills of a web developer.";

  mainElement.appendChild(profileImage);
  mainElement.appendChild(bioText);
});
