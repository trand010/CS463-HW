let starships = [];
let main = document.querySelector("main");

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    starships = data.results;
    enableButtons();
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const disableButtons = () => {
  document.getElementById("all").disabled = true;
  document.getElementById("filter").disabled = true;
  document.getElementById("reduce").disabled = true;
};

const enableButtons = () => {
  document.getElementById("all").disabled = false;
  document.getElementById("filter").disabled = false;
  document.getElementById("reduce").disabled = false;
};

document.addEventListener("DOMContentLoaded", () => {
  disableButtons();
  fetchData("https://swapi.dev/api/starships/");
});

const createSpaceshipComponent = (spaceship) => {
  const container = document.createElement("section"); // do not modify this line
  container.classList.add("starship");

  const formattedCost =
    spaceship.cost_in_credits !== "unknown"
      ? parseInt(spaceship.cost_in_credits, 10).toLocaleString()
      : spaceship.cost_in_credits;
  const formattedSpeed =
    spaceship.max_atmosphering_speed !== "unknown"
      ? spaceship.max_atmosphering_speed
      : "N/A";
  const formattedCapacity =
    spaceship.cargo_capacity !== "unknown"
      ? parseInt(spaceship.cargo_capacity, 10).toLocaleString()
      : "N/A";

  container.innerHTML = `
    <div class="starship-header">
    <div class="starship-name">${spaceship.name}</div>
      <span class="price">${formattedCost} credits</span>
    </div>
    <div class="starship-manufacturer">
      Manufactured by ${spaceship.manufacturer}
    </div>
    <div class="starship-body">
      <div class="starship-detail">
        <span class="value">${formattedSpeed}</span> <span class="label">Max atmosphering speed</span>
      </div>
      <div class="divider"></div>
      <div class="starship-detail">
        <span class="value">${formattedCapacity}</span> <span class="label">Cargo capacity</span>
      </div>
    </div>
  `;

  return container; // do not modify this line
};

const filterStarships = (input) => {
  return input.filter(
    (ship) => parseInt(ship.passengers, 10) < 10 && parseInt(ship.crew, 10) > 1
  );
};

const reduceStarships = (input) => {
  const totalCost = input.reduce((acc, ship) => {
    const cost = parseInt(ship.cost_in_credits, 10);
    return isNaN(cost) ? acc : acc + cost;
  }, 0);

  return `The cost of all starships is ${totalCost.toLocaleString()} credits`;
};

fetchData("https://swapi.dev/api/starships/");

function handleButtonActiveState() {
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => btn.classList.remove("btn-active"));
      button.classList.add("btn-active");
    });
  });
}

handleButtonActiveState();

// do not modify the code below
let displayAllButton = document.getElementById("all");
displayAllButton.addEventListener("click", () => {
  displayShipComponents(starships);
});

let filterButton = document.getElementById("filter");
filterButton.addEventListener("click", () => {
  const filteredShips = filterStarships(starships);
  displayShipComponents(filteredShips);
});

let reduceButton = document.getElementById("reduce");
reduceButton.addEventListener("click", () => {
  const totalCost = reduceStarships(starships);
  displayText(totalCost);
});

const clearAndReset = () => {
  let app = document.getElementById("results");
  app.remove();
  app = document.createElement("div");
  app.id = "results";
  app.style.display = "flex";
  app.style.flexWrap = "wrap";
  app.style.justifyContent = "center";
  main.append(app);
};

const displayShipComponents = (starships) => {
  clearAndReset();
  let app = document.getElementById("results");
  starships.forEach((ship) => {
    const shipComponent = createSpaceshipComponent(ship);
    app.appendChild(shipComponent);
  });
};

const displayText = (text) => {
  clearAndReset();
  let app = document.getElementById("results");
  let paragraph = document.createElement("p");
  paragraph.textContent = text;
  paragraph.style.backgroundColor = "white";
  paragraph.style.borderRadius = "10px";
  paragraph.style.padding = "30px";
  app.appendChild(paragraph);
};
