Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))]
}
const hangmanImageContainer = document.querySelector("#hangman-image-container")
const lettersContainer = document.querySelector("#letter-possibilities-container")
const phraseContainer = document.querySelector("#phrase-container")
const phraseAnswerBlocks = document.getElementById("phrase-answer_blocks")
let gameHash = {}

document.addEventListener("DOMContentLoaded", function (){
    lettersContainer.insertAdjacentHTML('beforeend',`<div class="col">
          <button id="letter-possibility" data-id="A" type="button" class="letter-possibility-button">A</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="B" type="button" class="letter-possibility-button">B</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="C" type="button" class="letter-possibility-button">C</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="D" type="button" class="letter-possibility-button">D</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="E" type="button" class="letter-possibility-button">E</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="F" type="button" class="letter-possibility-button">F</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="G" type="button" class="letter-possibility-button">G</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="H" type="button" class="letter-possibility-button">H</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="I" type="button" class="letter-possibility-button">I</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="J" type="button" class="letter-possibility-button">J</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="K" type="button" class="letter-possibility-button">K</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="L" type="button" class="letter-possibility-button">L</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="M" type="button" class="letter-possibility-button">M</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="N" type="button" class="letter-possibility-button">N</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="O" type="button" class="letter-possibility-button">O</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="P" type="button" class="letter-possibility-button">P</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Q" type="button" class="letter-possibility-button">Q</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="R" type="button" class="letter-possibility-button">R</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="S" type="button" class="letter-possibility-button">S</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="T" type="button" class="letter-possibility-button">T</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="U" type="button" class="letter-possibility-button">U</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="V" type="button" class="letter-possibility-button">V</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="W" type="button" class="letter-possibility-button">W</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="X" type="button" class="letter-possibility-button">X</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Y" type="button" class="letter-possibility-button">Y</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Z" type="button" class="letter-possibility-button">Z</button></div>`)
        
    fetch("http://localhost:3000/api/v1/quotes")
    .then(response => response.json())
    .then(data => {
        let phrase = data.random().quote
        // phraseContainer.insertAdjacentHTML('beforeend', `<p>QUOTE ---> ${phrase} <--- QUOTE<p>`)

        // This following method takes the Random Quote and does the following:
        // 1- upcases all the letters and swaps *spaces* for underscores
        // 2- Splits the string into an Array
        // 3- creates a new Hash (named gameHash) with k:v of UniqueLetter:[array of index
             // numbers for the letter]
        gameHash = hashOfLettersAndIndexes(phrase)
        //This next line is just for testing and to see the gameHashArray in the console.
        console.dir(gameHash)
        //This method creates empty blocks for each of the letters in the phrase
        buildEmptyLetterBlocks(phrase)
    })
})

/// -------------- Support Functions -----------

function hashOfLettersAndIndexes(phrase) {
  let letterIndex = 0
  let letter = ""
  let outputHash = {}
  let splitPhrase = phrase.toUpperCase().replace(/ /g,"_").split("")
    for ( letterindex = 0; letterindex < splitPhrase.length; letterindex++) {
    if (!!outputHash[splitPhrase[letterindex]]) {
      letter = splitPhrase[letterindex]
      outputHash[letter].push(letterindex)
    } else {
      letter = splitPhrase[letterindex]
      outputHash[letter] = [letterindex]
    }
  }
  return outputHash
} // ends hashOfLettersAndIndexes function


function buildEmptyLetterBlocks(phrase) {
  splitPhrase = phrase.toUpperCase().replace(/ /g,"_").split("")
  blockCount = phrase.length
  for (b = 0; b < blockCount; b++ )    {
    if (splitPhrase[b] === "_") { 
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", `<span>*space*</span>` )
    } else if (/[A-Z]/i.test(splitPhrase[b])){
      phraseAnswerBlocks.insertAdjacentHTML("beforeend", 
        `<button class="empty-block" data-answer-index=${b}></button>`
    )} else {
      phraseAnswerBlocks.insertAdjacentHTML("beforeend",
        `<span>${splitPhrase[b]}</span>`
    )}

    // Ends the phraseAnswerBlocks.insertAdjacentHTML

    }
} // ends buildEmptyLetterBlocks Funciton



//  ---------- EVENT LISTENERS ------------
lettersContainer.addEventListener("click", function (e) {
    // add conditional logic here to check if the event target is a letter contained in the current phrase
        // if it is ...... we want to turn that button green and render that letter into the phraseContainer
    if (e.target.tagName === "BUTTON") {
        let targetDiv = e.target.parentElement
        e.target.remove()
        targetDiv.insertAdjacentHTML('beforeend', `<button id="letter-possibility" data-id="${e.target.dataset.id}" type="button" class="btn btn-success">${e.target.dataset.id}</button>`)
    }
})