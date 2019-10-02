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
let corrospondingLetter
let allAnswerBlocksDiv
const printedCounterDiv = document.getElementById("printed-counter")
const infoDiv = document.getElementById("player-info-container")
let imagePrefix = ""
const availablePrefixes = ["", "clown", "killerClown", "KillyTheClown"]
const lettersArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

document.addEventListener("DOMContentLoaded", function () {


  const hangmanImageContainer = document.querySelector("#hangman-image-container")
  const categories = ["Movie Quotes", "Professional Sport Teams", "Song Lyrics"]



  createAllLetterBlocks()




  // Creates the "New Game" button and Categories dropdown


  categoryContainer.insertAdjacentHTML("beforeend", `
    <div></div>
    <h1 style="color:white;">Select a category</h1>
      <form id="gameCategoryForm" action="">
        <select id="setCategory">
        </select>
        <input type="button" value="New Game" onclick="filterAllChooseRandom()" />
       </form>
    `)
  let dropdown = document.getElementById("setCategory")
  categories.forEach(function (cat) {
    dropdown.insertAdjacentHTML("beforeend", `
         <option  value="${cat}">${cat}</option>
      `)
  }
  )



  fetch("http://localhost:3000/api/v1/quotes")
    .then(response => response.json())
    .then(data => {
      allQuotes = data
    })
})

//Builds all letter blocks upon page load
createAllLetterBlocks()

/// -------------- Support Functions -----------

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
  let splitPhrase = phrase.toUpperCase().replace(/ /g, "_").split("")
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
  splitPhrase = phrase.toUpperCase().replace(/ /g, "_").split("")
  blockCount = phrase.length
  for (b = 0; b < blockCount; b++) {
    if (splitPhrase[b] === "_") {
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", `<button class="empty-block-space" data-answer-index=${b}></button>`)
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", `<button class="empty-block-space" data-answer-index=${b}></button>`)
    } else if (/[A-Z]/i.test(splitPhrase[b])) {
      phraseAnswerBlocks.insertAdjacentHTML("beforeend",
        `<button class="empty-block" data-answer-index=${b}></button>`
      )
    } else {
      phraseAnswerBlocks.insertAdjacentHTML("beforeend",
        `<span class="punctuation-span">${splitPhrase[b]}</span>`
      )
    }
  } // Ends the phraseAnswerBlocks.insertAdjacentHTML
} // ends buildEmptyLetterBlocks Funciton



//  Takes input and starts a game

function filterAllChooseRandom() {
  createAllLetterBlocks()
  hangmanContainer.innerHTML = ""
  counter = 7
  updatePrintedCounter()
  hangmanContainer.insertAdjacentHTML("afterbegin", `<img src="./images/${imagePrefix}${counter}.png" id="hangman-image">`)
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
    infoDiv.innerHTML = `<h2> welcome!</h2>`
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
        hangmanContainer.insertAdjacentHTML("afterbegin", `<img src="./images/${imagePrefix}${counter}.png" id="hangman-image">`)
      // debugger
    }

  }  // Ends Wrong Letter

  function youWin() {
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
    // debugger
    if (!!gameHash[letter]) {
      indexesOfPickedLetterArr = gameHash[letter]
      delete gameHash[letter]
      allAnswerBlocksDiv = document.getElementById("phrase-answer_blocks")
      indexesOfPickedLetterArr.forEach( function(index) {
      allAnswerBlocksDiv.querySelector(`[data-answer-index = "${index}"]`).innerHTML = letter
      if (Object.keys(gameHash).length == 0) {
        youWin()
      } // ends the if statement to see if the player won the game
    }) //Ends indexesOfPickedLetterArr.forEach Loop
    } else {
      wrongLetterPick()
    }
  } // ends actOnPlayedLetter function

  function updatePrintedCounter() {
    // debugger
    if (counter === 1) {
      printedCounterDiv.innerHTML = (`<h2>Hurry! You have only 1 chance left, but can still save the day!</h2>`)
    } else {
      printedCounterDiv.innerHTML = (`<h2>You have ${counter} turns left!</h2>`)
    }
  } // ends Update Printed Counter funciton





//  ---------- EVENT LISTENERS ------------
lettersContainer.addEventListener("click", function (e) {
  e.preventDefault()
  // console.dir(counter)
  // add conditional logic here to check if the event target is a letter contained in the current phrase
  // if it is ...... we want to turn that button green and render that letter into the phraseContainer
  if (e.target.tagName === "BUTTON"  && e.target.id == "letter-possibility-button"  && counter != "") {
    // console.log(e.target)
    let targetDiv = e.target.parentElement
    e.target.remove()
    currentCounter = counter
    actOnPlayedLetter(e.target.dataset.id)
    if (currentCounter === counter)
      {targetDiv.insertAdjacentHTML('beforeend', `<button id="successful-letter-possibility" data-id="${e.target.dataset.id}" type="button">${e.target.dataset.id}</button>`)}
    else
      {targetDiv.insertAdjacentHTML('beforeend', `<button id="wrong-letter-possibility-button" data-id="${e.target.dataset.id}" type="button">${e.target.dataset.id}</button>`)}
  } // else if (e.target.tagName === "BUTTON")
}) // emnds CLICK ON LETTER event listener

document.addEventListener("keydown", function (keypress) {
  if (keypress.keyCode >= 65 && keypress.keyCode <= 90 && counter != "") {
    console.log(keypress.code.slice(-1))
    pressedLetter = keypress.code.slice(-1)
    corrospondingLetter = lettersContainer.querySelector(`[data-id='${pressedLetter}']`)
    if (corrospondingLetter.id === "letter-possibility-button") {
        let targetDiv = corrospondingLetter.parentElement
        currentCounter = counter
        actOnPlayedLetter(pressedLetter)
        corrospondingLetter.remove()
        if (currentCounter === counter)
          {targetDiv.insertAdjacentHTML('beforeend', `<button id="successful-letter-possibility" data-id="${pressedLetter}" type="button">${pressedLetter}</button>`)}
        else
          {targetDiv.insertAdjacentHTML('beforeend', `<button id="wrong-letter-possibility-button" data-id="${pressedLetter}" type="button">${pressedLetter}</button>`)}
        }// ends IF to make sure the Letter hasnt been selected yet

  }
  // do something
}) // ends KEYPRESS Event Listener