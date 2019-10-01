Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))]
}
const topContainer = document.querySelector("#hangman-image-container")
const categoryContainer = document.querySelector("#category-container")
const phraseContainer = document.querySelector("#phrase-container")
const lettersContainer = document.querySelector("#letter-possibilities-container")
const phraseAnswerBlocks = document.getElementById("phrase-answer_blocks")
let gameHash = {}
let filterCategory = ""
let filteredQuotes = ""
let allQuotes = []
let allAnswerBlocksDiv
const lettersArr = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

document.addEventListener("DOMContentLoaded", function (){
  
  
const hangmanImageContainer = document.querySelector("#hangman-image-container")
const categories = ["Movie Quotes", "Professional Sport Teams", "Song Lyrics"]



createAllLetterBlocks() 
    
        


    // Creates the "New Game" button and Categories dropdown


    categoryContainer.insertAdjacentHTML("beforeend", `
    <div></div>
    <h1>Select a category</h1>
      <form id="gameCategoryForm" action="">
        <select id="setCategory">
        </select>
        <input type="button" value="category" onclick="filterAllChooseRandom()" />
       </form>
    `)
    let dropdown = document.getElementById("setCategory")
    categories.forEach( function(cat) {
      dropdown.insertAdjacentHTML("beforeend", `
         <option  value="${cat}">${cat}</option>
      `)}
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
    lettersArr.forEach( function(let) {
      lettersContainer.insertAdjacentHTML('beforeend',`<div class="col">
          <button id="letter-possibility-button" data-id="${let}" type="button" class="btn btn-warning">${let}</button></div>
      `) // ends lettersContainer.insertAdjacentHTML(
    })// Ends lettersArr.forEach loop
  } //  Ends createAllLetterBlocks() function


function hashOfLettersAndIndexes(phrase) {
  let letterIndex = 0
  let letter = ""
  let outputHash = {}
  let splitPhrase = phrase.toUpperCase().replace(/ /g,"_").split("")
  for ( letterindex = 0; letterindex < splitPhrase.length; letterindex++) {
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
  splitPhrase = phrase.toUpperCase().replace(/ /g,"_").split("")
  blockCount = phrase.length
  for (b = 0; b < blockCount; b++ )    {
    if (splitPhrase[b] === "_") { 
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", `<button class="empty-block-space" data-answer-index=${b}></button>` )
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", `<button class="empty-block-space" data-answer-index=${b}></button>`)
    } else if (/[A-Z]/i.test(splitPhrase[b])){
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", 
        `<button class="empty-block" data-answer-index=${b}></button>`
    )} else {
      phraseAnswerBlocks.insertAdjacentHTML("beforeend",
        `<span class="punctuation-span">${splitPhrase[b]}</span>`
    )}

    // Ends the phraseAnswerBlocks.insertAdjacentHTML

    }
} // ends buildEmptyLetterBlocks Funciton



//  Takes input and starts a game

function filterAllChooseRandom() {
  createAllLetterBlocks()
  filterCategory = document.getElementById("setCategory").value
  filteredQuotes = allQuotes.filter( function(q) { return q.category == filterCategory })

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
    
} //

  // function wrongLetterPick() {
  //   count--

  //   insertAdjacentHTML('afterbegin', `<img src="${count}.jpg" id="hangman-image">`)
    


  //   wrontCount.goup
  //   is wrong count >= 7 run youLose()
  //   picture.change

  //   // console.log("Wrong letter fucntion running")
  // }  // Ends Wrong Letter

  function actOnPlayedLetter(letter) {
    // debugger
    if (!!gameHash[letter]) {
      indexesOfPickedLetterArr = gameHash[letter]
      delete gameHash[letter]
      allAnswerBlocksDiv = document.getElementById("phrase-answer_blocks")
      indexesOfPickedLetterArr.forEach( function(index) {
      allAnswerBlocksDiv.querySelector(`[data-answer-index = "${index}"]`).innerHTML = letter
      if (Object.keys(gameHash).length == 0) {
        console.log("YOU WIN")
      } // ends the if statement to see if the player won the game
      }) //Ends indexesOfPickedLetterArr.forEach Loop
    } else {
      wrongLetterPick() 
    }

  } // ends actOnPlayedLetter function



//  ---------- EVENT LISTENERS ------------
lettersContainer.addEventListener("click", function (e) {
  console.dir(e.target)
    // add conditional logic here to check if the event target is a letter contained in the current phrase
        // if it is ...... we want to turn that button green and render that letter into the phraseContainer
    if (e.target.tagName === "BUTTON") {
        let targetDiv = e.target.parentElement
        e.target.remove()
        targetDiv.insertAdjacentHTML('beforeend', `<button class="successful-letter-possibility" data-id="${e.target.dataset.id}" type="button">${e.target.dataset.id}</button>`)
        
        actOnPlayedLetter(e.target.dataset.id)

    } 
    // else if (e.target.tagName === "BUTTON")
})