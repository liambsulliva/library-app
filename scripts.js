let myLibrary = [];

function game(title, platform) {
    this.title = title;
    this.platform = platform;
    this.played = false;
}

window.addEventListener('load', () => {
    const gamesString = localStorage.getItem('Games');
    if (gamesString) {
        myLibrary = JSON.parse(gamesString);
        for (const game of myLibrary) {
            displayGame(game);
        }
    }
});

const table = document.querySelector('#table');
const tBody = document.createElement('tBody');
function displayGame(game) {
    const row = document.createElement('tr');
    row.classList.add('slide');

    const titleCell = document.createElement('td');
    titleCell.textContent = game.title;
    row.appendChild(titleCell);

    const platformCell = document.createElement('td');
    platformCell.textContent = game.platform;
    row.appendChild(platformCell);

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const checkboxCell = document.createElement('td');
    checkboxCell.textContent = 'Played';
    if (game.played === true) checkbox.checked = true;
    checkboxCell.appendChild(checkbox);
    row.appendChild(checkboxCell);

    checkboxCell.addEventListener("click", () => {
        game.played = !game.played;
        updateLibrary(game);
    });

    const removalCell = document.createElement('td');
    removalCell.textContent = 'Remove';
    removalCell.style.color = '#0000EE';
    removalCell.style.cursor = 'pointer';
    row.appendChild(removalCell);

    tBody.appendChild(row);

    setTimeout(function(){
        row.classList.add('show');
    }, 5);

    removalCell.addEventListener("click", () => {
        row.classList.remove('show');
        row.classList.add('hide');
        removeGameFromLibrary(game);
        setTimeout(function(){
            tBody.removeChild(row);
        }, 125);
    });
    table.appendChild(tBody);
}



const modal = document.getElementById("modal");
const form = document.querySelector(".modal-content form");
const openButton = document.getElementById('open');
openButton.addEventListener('click', () => {
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the form data
    const formData = new FormData(form);
    const title = formData.get("title");
    const platform = formData.get("platform");

    if (!title || !platform) {
        return;
    }
    
    addgameToLibrary(new game(title, platform));
  
    // Reset the form
    form.reset();
    modal.style.display = "none";
});
  
  // Handle Enter key press
form.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        form.dispatchEvent(new Event("submit"));
    }
});

const closeButton = document.getElementsByClassName("close")[0];
closeButton.onclick = function() {
    modal.style.display = "none";
}

function addgameToLibrary(game) {
    myLibrary.push(game);
    displayGame(game);
    localStorage.setItem('Games', JSON.stringify(myLibrary));
}

function updateLibrary() {
    localStorage.setItem('Games', JSON.stringify(myLibrary));
}

function removeGameFromLibrary(game) {
    myLibrary.pop(game);
    localStorage.setItem('Games', JSON.stringify(myLibrary));
}