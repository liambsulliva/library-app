const myLibrary = [];

function game(title, platform) {
    this.title = title;
    this.platform = platform;
}

function displaygames() {
    const table = document.querySelector('#table');
    const tBody = document.createElement('tBody');

    myLibrary.forEach(game => {
        const row = document.createElement('tr');

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
        checkboxCell.appendChild(checkbox);
        row.appendChild(checkboxCell);

        const removalCell = document.createElement('td');
        removalCell.textContent = 'Remove';
        removalCell.style.color = '#0000EE';
        removalCell.style.cursor = 'pointer';
        row.appendChild(removalCell);

        tBody.appendChild(row);

        removalCell.addEventListener("click", () => {
            myLibrary.pop(game);
            tBody.removeChild(row);
        });
    });
    table.appendChild(tBody);
}

const addButton = document.getElementById('add');
const addContainer = document.getElementById('adderContainer');
let gameForm;
addButton.addEventListener('click', () => {
    if (!addContainer.hasChildNodes(gameForm)) {
        gameForm = document.createElement('div');
        gameForm.id = 'gameForm';
        gameForm.style.padding = '30px';
        gameForm.style.marginLeft = '100px';
        gameForm.style.marginRight = '100px';
        gameForm.style.marginBottom = '25px';
        gameForm.style.border = '1px solid #ccc';

        const formTitle = document.createElement('h3');
        formTitle.textContent = 'Add New Game';
        formTitle.style.textAlign = 'center';
        gameForm.appendChild(formTitle);

        const form = document.createElement('form');

        const title = document.createElement('div');
        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title: ';
        title.style.margin = 'auto';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'title';
        titleInput.name = 'title';
        titleInput.required = true;
        title.appendChild(titleLabel);
        title.appendChild(titleInput);
        form.appendChild(title);
        form.appendChild(document.createElement('br'));

        const platform = document.createElement('div');
        const platformLabel = document.createElement('label');
        platformLabel.textContent = 'Platform: ';
        platform.style.margin = 'auto';
        const platformInput = document.createElement('input');
        platformInput.type = 'text';
        platformInput.id = 'platform';
        platformInput.name = 'platform';
        platformInput.required = true;
        platform.appendChild(platformLabel);
        platform.appendChild(platformInput);
        form.appendChild(platform);
        form.appendChild(document.createElement('br'));

        const submitButton = document.createElement('button');
        submitButton.type = 'button';
        submitButton.id = 'submitgame';
        submitButton.textContent = 'Add Game';
        form.appendChild(submitButton);

        gameForm.appendChild(form);

        addContainer.appendChild(gameForm);

        form.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const title = titleInput.value.trim();
                const platform = platformInput.value.trim();
                if (title && platform) {
                    addgameToLibrary(new game(title, platform));
                    titleInput.value = '';
                    platformInput.value = '';
                    addContainer.removeChild(gameForm);
                } else {
                    alert('Please enter a title and platform.');
                }
            }
        });
        submitButton.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const platform = platformInput.value.trim();
            if (title && platform) {
                addgameToLibrary(new game(title, platform));
                titleInput.value = '';
                platformInput.value = '';
                addContainer.removeChild(gameForm);
            } else {
                alert('Please enter a title and platform.');
            }
        });
    } else {
        addContainer.removeChild(gameForm);
    }
}); 

function addgameToLibrary(game) {
    myLibrary.push(game);
    displaygames();
}