var VideoGame = (function () {
    function VideoGame() {
    }
    return VideoGame;
}());
window.onload = function () {
    var addBtn = document.querySelector("input[type = button]");
    addBtn.onclick = addVideoGame;
};
function clearAllErrors() {
    var errSummary = getById("validation-summary");
    errSummary.innerText = "";
}
function addVideoGame() {
    console.log("add videogame");
    clearAllErrors();
    if (isAllDataValid()) {
        var game = getVideoGame();
        displayGame(game);
    }
    else {
        displayRatingsLink();
    }
}
function displayRatingsLink() {
    var ratingsElements = document.querySelectorAll(".rating-error");
    for (var i = 0; i < ratingsElements.length; i++) {
        var currElem = ratingsElements[i];
        currElem.onclick = goToRatingsPage;
    }
}
function goToRatingsPage() {
    window.open("https://www.esrb.org/", "_blank");
}
function getById(id) {
    return document.getElementById(id);
}
function getVideoGame() {
    var game = new VideoGame;
    var titleInput = getById("title");
    game.title = titleInput.value;
    var priceInput = getById("price");
    game.price = parseFloat(priceInput.value);
    var ratingInput = getById("rating");
    game.rating = ratingInput.value;
    var digitalOnly = getById("online");
    game.isDigitalOnly = digitalOnly.checked;
    return game;
}
function displayGame(myGame) {
    var displayDiv = getById("display");
    var gameHeading = document.createElement("h2");
    gameHeading.innerText = myGame.title;
    displayDiv.appendChild(gameHeading);
    var gameInfo = document.createElement("p");
    displayDiv.appendChild(gameInfo);
    var gameMediumDisplay = "";
    if (myGame.isDigitalOnly) {
        gameMediumDisplay = "This is a digital only game.";
    }
    else {
        gameMediumDisplay = "You can come buy a physical copy!";
    }
    gameInfo.innerText = myGame.title + " has a rating of " + myGame.rating + ". It cost $" + myGame.price.toFixed(2) + ". " + gameMediumDisplay;
}
function getInputById(id) {
    return document.getElementById(id);
}
function isAllDataValid() {
    var isValid = true;
    var title = getInputById("title").value;
    if (title == "") {
        isValid = false;
        addErrorMessage("Title is required");
    }
    var rating = getById("rating").value;
    if (rating == "") {
        isValid = false;
        addErrorMsgWithCustomerClass("You must choose a rating", "rating-error");
    }
    var price = getInputById("price").value;
    var priceValue = parseFloat(price);
    if (price == "" || isNaN(priceValue)) {
        isValid = false;
        addErrorMessage("Price is required");
    }
    return isValid;
}
function addErrorMessage(errMsg) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
function addErrorMsgWithCustomerClass(errMsg, cssClass) {
    var errSummary = getById("validation-summary");
    var errItem = document.createElement("li");
    errItem.classList.add(cssClass);
    errItem.innerText = errMsg;
    errSummary.appendChild(errItem);
}
