Array.prototype.random = function () {
  return this[Math.floor((Math.random() * this.length))]
}
const topContainer = document.querySelector("#hangman-image-container")
const categoryContainer = document.querySelector("#category-container")
const phraseContainer = document.querySelector("#phrase-container")
const lettersContainer = document.querySelector("#letter-possibilities-container")
const phraseAnswerBlocks = document.getElementById("phrase-answer_blocks")
let counter = ""
const hangmanContainer = document.querySelector("#hangman-container")
const hangmanImage = document.querySelector("#hangman-image")
let gameHash = {}
let pressedLetter
let filterCategory = ""
let filteredQuotes = ""
let allQuotes = []
let splitPhrase
let totalGames
let corrospondingLetter
let allAnswerBlocksDiv
let wordCount
let playerDetails
let loggedIn = false
const printedCounterDiv = document.getElementById("printed-counter")
const infoDiv = document.getElementById("player-info-container")
let imagePrefix = ""
const availablePrefixes = ["killerClown", "stripeClown", "krusty", "knifeClown", "gunClown"]
const lettersArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
const hangmanImageContainer = document.querySelector("#hangman-image-container")
const categories = ["Movie Quotes", "Professional Sport Teams", "Song Lyrics"]

document.addEventListener("DOMContentLoaded", function () {





  createAllLetterBlocks()




  // Creates the "New Game" button and Categories dropdown
  document.querySelector("#category-container").innerHTML = `
  <div></div>
  <h1 style="color:white; font-weight: bold; text-transform: uppercase">Log in to play!</h1>
    <form id="gameCategoryForm" >
      <h4 style="color: white"> First Name: </h4>
      <input type="text" name="firstName" id="firstName" value="" required />
      <input type="submit" value="Log In" id="logUserIn" />
     </form>
  `
  document.querySelector("#logUserIn").addEventListener("click", function(clicke) {
    clicke.preventDefault()
    // Verifies the User Name ONLY contains alpha-numberic
    if (!/^[A-Za-z0-9]+$/.test(document.getElementById("firstName").value)) {
      alert("Invalid User Name!  Try Again")
    } else {
      logUserIn(document.getElementById("firstName").value)
    }
  })
  
  fetch("http://localhost:3000/api/v1/quotes")
    .then(response => response.json())
    .then(data => {
      allQuotes = data
    })
})

//Builds all letter blocks upon page load
createAllLetterBlocks()

/// -------------- Support Functions -----------

function logUserIn(namevar) {
  playerCheckFetch
  (namevar)
  
}

function playerLoggedInExposeNewGameButton() {

  categoryContainer.innerHTML = `
    <div></div>
    <h1 style="color:white;">Select a category</h1>
      <form id="gameCategoryForm" action="">
        <select id="setCategory">
        </select>
        <input type="button" value="New Game" onclick="filterAllChooseRandom()" />
       </form>
    `
  let dropdown = document.getElementById("setCategory")
  categories.forEach(function (cat) {
    dropdown.insertAdjacentHTML("beforeend", `
         <option  value="${cat}">${cat}</option>
      `)}
  )
  buildInfoBox()
  

}  // ends playerLoggedInExposeNewGameButton function


// Creates all the letter blocks
function createAllLetterBlocks() {
  lettersContainer.innerHTML = ""
  lettersArr.forEach(function (let) {
    lettersContainer.insertAdjacentHTML('beforeend', `<div class="col">
          <button id="letter-possibility-button" data-id="${let}" type="button">${let}</button></div>
      `) // ends lettersContainer.insertAdjacentHTML(
  })// Ends lettersArr.forEach loop
} //  Ends createAllLetterBlocks() function


function hashOfLettersAndIndexes(phrase) {
  let letterIndex = 0
  let letter = ""
  let outputHash = {}
  splitPhrase = phrase.toUpperCase().replace(/ /g, "_").split("")
  for (letterindex = 0; letterindex < splitPhrase.length; letterindex++) {
    if (/[A-Z]/i.test(splitPhrase[letterindex])) {

      if (!!outputHash[splitPhrase[letterindex]]) {
        letter = splitPhrase[letterindex]
        outputHash[letter].push(letterindex)
      } else {
        letter = splitPhrase[letterindex]
        outputHash[letter] = [letterindex]
      }
    }  // ends if statement to see if the index location holds a letter A-Z
  }// ends for loop for each of the letter indexez
  return outputHash
} // ends hashOfLettersAndIndexes function


function buildEmptyLetterBlocks(phrase) {
  phraseAnswerBlocks.innerHTML = ""
  blockCount = phrase.length
  wordCount = splitPhrase.filter(function (letter) { return letter === "_" }).length + 1

    // This creates one EMPTY DIV for each word in the phrase
  for (let i = 1; i <= wordCount; i++) {
    phraseAnswerBlocks.insertAdjacentHTML('beforeend', `<div data-word-container="${i}"></div>`)
  }
  let spacesIndArr = []
  let wordCounter = 1
  for (let i = 0; i < splitPhrase.length; i++) {
    if (splitPhrase[i] === "_") {
      spacesIndArr.push(wordCounter)
      wordCounter++
    } else {
      spacesIndArr.push(wordCounter)}
    }

  for (b = 0; b < blockCount; b++) {
    if (splitPhrase[b] === "_") {
      phraseAnswerBlocks.children[spacesIndArr[b] - 1].insertAdjacentHTML("beforeend",
        `<button class="empty-block-space" data-answer-index=${b}  data-word-number=${spacesIndArr[b]}></button>`)
      phraseAnswerBlocks.children[spacesIndArr[b] - 1].insertAdjacentHTML("beforeend",
        `<button class="empty-block-space" data-answer-index=${b}  data-word-number=${spacesIndArr[b]}></button>`)
      phraseAnswerBlocks.children[spacesIndArr[b] - 1].insertAdjacentHTML("beforeend",
        `<button class="empty-block-space" data-answer-index=${b}  data-word-number=${spacesIndArr[b]}></button>`)
    } else if (/[A-Z]/i.test(splitPhrase[b])) {
      phraseAnswerBlocks.children[spacesIndArr[b] - 1].insertAdjacentHTML("beforeend", `<button class="empty-block-startup" data-answer-index=${b} data-word-number=${spacesIndArr[b]}></button>`)
    } else {
      phraseAnswerBlocks.children[spacesIndArr[b] - 1 ].insertAdjacentHTML("beforeend",
        `<span class="punctuation-span" data-word-number=${spacesIndArr[b]}>${splitPhrase[b]}</span>`
      )
    }
  } // Ends the phraseAnswerBlocks.insertAdjacentHTML
} // ends buildEmptyLetterBlocks Funciton


//  Takes input and starts a game

function increaseGameCount() {

}

function increaseWinCount() {

}
function filterAllChooseRandom() {
  playerNewGameFetch(playerDetails.name)
  createAllLetterBlocks()
  hangmanContainer.innerHTML = ""
  counter = 7
  updatePrintedCounter()
  hangmanContainer.insertAdjacentHTML("afterbegin", `<img src="./images/${imagePrefix}${counter}.png" id="hangman-image" width="400" height="400" frameBorder="0">`)
  imagePrefix = availablePrefixes.random()
  filterCategory = document.getElementById("setCategory").value
  filteredQuotes = allQuotes.filter(function (q) { return q.category == filterCategory })

  let phrase = filteredQuotes.random().quote
  phraseContainer.innerHTML = ""
  phraseContainer.insertAdjacentHTML('beforeend', `<p>QUOTE ---> ${phrase} <--- QUOTE<p>`)

  // This following method takes the Random Quote and does the following:
  // 1- upcases all the letters and swaps *spaces* for underscores
  // 2- Splits the string into an Array
  // 3- creates a new Hash (named gameHash) with k:v of UniqueLetter:[array of index
  // numbers for the letter]
  gameHash = hashOfLettersAndIndexes(phrase)
  //This method creates empty blocks for each of the letters in the phrase
  buildEmptyLetterBlocks(phrase)
  buildInfoBox()

} //  EndsFilterAll Choose Random --- NEW GAME Basically

  function buildInfoBox() {
    
    
    infoDiv.innerHTML = `
    <h1>${playerDetails.name}'s Record:</h1>
    <p>Total Games: <span id="total_games">${playerDetails.total_games}</span></p>
    <p>Total Wins: <span id="total_wins">${playerDetails.total_wins}</span></p>
    <h2>${Object.keys(gameHash)}</h2>
    `
  } // ends buildInfoBox function


  function youLose() {
    phraseContainer.insertAdjacentHTML('afterbegin', "<p>YOULOSE!!!!<p>")
  }
  
  function wrongLetterPick() {
    // const hangmanContainer = document.querySelector("#hangman-container")
    counter--
    updatePrintedCounter()
    if (counter === 0) {
      youLose()
    } else {
      // hangmanImage.setAttribute("src", `./images/${imagePrefix}${counter}.png`)
      // hangmanContainer.innerHTML = `<img src="./images/${imagePrefix}${counter}.png" id="hangman-image">`
        hangmanContainer.innerHTML = " "
        hangmanContainer.insertAdjacentHTML("afterbegin", `<img src="./images/${imagePrefix}${counter}.png" id="hangman-image" width="400" height="400" frameBorder="0" >`)
      // debugger
    }

  }  // Ends Wrong Letter

  function youWin() {
    playerNewWinFetch(playerDetails.name)
    if (counter === 1)
      {
        hangmanContainer.innerHTML = " "
        printedCounterDiv.innerHTML = (`<h2>Nice work, but did you do it in time?!?!?</h2>`)
        hangmanContainer.insertAdjacentHTML("afterbegin", `<iframe src="https://giphy.com/embed/kBTA59MvoikCLXGqRr" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`)
        setTimeout(function() {
          printedCounterDiv.innerHTML = (`<h2>Nice Win!</h2>`)
          hangmanContainer.innerHTML = " "
          hangmanContainer.insertAdjacentHTML("afterbegin", `<iframe src="https://giphy.com/embed/l0MYt5jPR6QX5pnqM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`)
          phraseContainer.insertAdjacentHTML('afterbegin', "<p>YOU WIN!!!!!!!!!!!!</p>")
        }, 10700)
    } else {
      printedCounterDiv.innerHTML = (`<h2>Nice Win!</h2>`)
      hangmanContainer.innerHTML = " "
      hangmanContainer.insertAdjacentHTML("afterbegin", `<iframe src="https://giphy.com/embed/l0MYt5jPR6QX5pnqM" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`)
      phraseContainer.insertAdjacentHTML('afterbegin', "<p>YOU WIN!!!!!!!!!!!!</p>")
    }
  }

  function actOnPlayedLetter(letter) {
    if (!!gameHash[letter]) {
      indexesOfPickedLetterArr = gameHash[letter]
      delete gameHash[letter]
      allAnswerBlocksDiv = document.getElementById("phrase-answer_blocks")
      indexesOfPickedLetterArr.forEach( function(index) {
        
        // allAnswerBlocksDiv.querySelector(`[data-answer-index = "${index}"]`).innerHTML = `<div class="wrapper">
        // <div class="flame-wrapper">
        //   <div class="flame red"></div>
        //   <div class="flame orange"></div>
        //   <div class="flame gold"></div>
        //   <div class="flame white"></div>
        //   <div class="base blue"></div>
        //   <div class="base black"></div>
        // </div>`
        // let newBlock = setTimeout(function () { allAnswerBlocksDiv.querySelector(`[data-answer-index = "${index}"]`).className = "empty-block"},1000)
        let newBlock = allAnswerBlocksDiv.querySelector(`[data-answer-index = "${index}"]`)
        newBlock.className = "empty-block"
        // debugger
        newBlock.innerHTML = `<div class="correct-answer-block">${letter}</div>`
      if (Object.keys(gameHash).length == 0) {
        youWin()
      } // ends the if statement to see if the player won the game
    }) //Ends indexesOfPickedLetterArr.forEach Loop
    } else {
      console.log('hitting the wrong letter pick', letter)
      wrongLetterPick()
    }
  } // ends actOnPlayedLetter function

  function updatePrintedCounter() {
    if (counter === 1) {
      printedCounterDiv.innerHTML = `<h2>Hurry! You have only 1 chance left, but can still save the day!</h2>`
    } else {
      printedCounterDiv.innerHTML = `<h2>You have ${counter} turns left!</h2>`
    }
  } // ends Update Printed Counter funciton


  // Fetch to check if player exists and CREATE new player if not
  function playerCheckFetch(name) {
    fetch(`http://localhost:3000/api/v1/players/${name}/check`)
    .then ( function(response) { return response.json()} )
    .then ( function(response) {
      if (!!response["name"]) { 
        loggedIn = true
        playerDetails = response
      }
      playerLoggedInExposeNewGameButton()
    })
  }  /// Ends playerCheckFetch

  function playerNewGameFetch(name) {
    fetch(`http://localhost:3000/api/v1/players/${name}/newGame`,
      {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "PATCH"}
    )
    .then ( function(response) { return response.json()} )
    .then ( function(response) {  
      if (!!response["name"]) { 
        playerDetails = response
      } 
      buildInfoBox()
     })
  }  /// Ends playerNewGameFetch

  function playerNewWinFetch(name) {
    fetch(`http://localhost:3000/api/v1/players/${name}/win`,
      {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: "PATCH"}
    )
    .then ( function(response) { return response.json()} )
    .then ( function(response) {  
      if (!!response["name"]) { 
        playerDetails = response
      } 
      buildInfoBox()
     })
  }  /// Ends playerNewGameFetch



//  ---------- EVENT LISTENERS ------------
lettersContainer.addEventListener("click", function (e) {
  e.preventDefault()
  // console.dir(counter)
  // add conditional logic here to check if the event target is a letter contained in the current phrase
  // if it is ...... we want to turn that button green and render that letter into the phraseContainer
  if (e.target.tagName === "BUTTON"  && e.target.id == "letter-possibility-button"  && counter != "") {
    let targetDiv = e.target.parentElement
    e.target.remove()
    currentCounter = counter
    actOnPlayedLetter(e.target.dataset.id)
    if (currentCounter === counter){
      targetDiv.insertAdjacentHTML('afterbegin', `<div class="wrapper">
        <div class="flame-wrapper">
          <div class="flame red"></div>
          <div class="flame orange"></div>
          <div class="flame gold"></div>
          <div class="flame white"></div>
          <div class="base blue"></div>
          <div class="base black"></div>
        </div>`)
      targetDiv.innerHTML =`<button id="successful-letter-possibility" data-id="${e.target.dataset.id}" type="button">${e.target.dataset.id}</button>`
    } else {
      targetDiv.insertAdjacentHTML('beforeend', `<button id="wrong-letter-possibility-button" data-id="${e.target.dataset.id}" type="button">${e.target.dataset.id}</button>`)
  }} // else if (e.target.tagName === "BUTTON")
}) // emnds CLICK ON LETTER event listener

document.addEventListener("keydown", function (keypress) {
  // keypress.preventDefault()
  if (keypress.keyCode >= 65 && keypress.keyCode <= 90 && counter != "") {
    console.log(keypress.code.slice(-1))
    pressedLetter = keypress.code.slice(-1)
    corrospondingLetter = lettersContainer.querySelector(`[data-id='${pressedLetter}']`)
    if (corrospondingLetter.id === "letter-possibility-button") {
        let targetDiv = corrospondingLetter.parentElement
        currentCounter = counter
        actOnPlayedLetter(pressedLetter)
        corrospondingLetter.remove()
        if (currentCounter === counter) {
          targetDiv.insertAdjacentHTML('beforeend', `<button id="successful-letter-possibility" data-id="${pressedLetter}" type="button">${pressedLetter}</button>`)
        }
        else {
        targetDiv.insertAdjacentHTML('beforeend', `<button id="wrong-letter-possibility-button" data-id="${pressedLetter}" type="button">${pressedLetter}</button>`)
      }
    }// ends IF to make sure the Letter hasnt been selected yet

  }
  // do something
}) // ends KEYPRESS Event Listener