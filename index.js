Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))]
}
const hangmanImageContainer = document.querySelector("#hangman-image-container")
const lettersContainer = document.querySelector("#letter-possibilities-container")
const phraseContainer = document.querySelector("#phrase-container")

document.addEventListener("DOMContentLoaded", function (){
    lettersContainer.insertAdjacentHTML('beforeend',`<div class="col">
          <button id="letter-possibility" data-id="A" type="button" class="btn btn-warning">A</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="B" type="button" class="btn btn-warning">B</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="C" type="button" class="btn btn-warning">C</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="D" type="button" class="btn btn-warning">D</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="E" type="button" class="btn btn-warning">E</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="F" type="button" class="btn btn-warning">F</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="G" type="button" class="btn btn-warning">G</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="H" type="button" class="btn btn-warning">H</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="I" type="button" class="btn btn-warning">I</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="J" type="button" class="btn btn-warning">J</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="K" type="button" class="btn btn-warning">K</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="L" type="button" class="btn btn-warning">L</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="M" type="button" class="btn btn-warning">M</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="N" type="button" class="btn btn-warning">N</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="O" type="button" class="btn btn-warning">O</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="P" type="button" class="btn btn-warning">P</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Q" type="button" class="btn btn-warning">Q</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="R" type="button" class="btn btn-warning">R</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="S" type="button" class="btn btn-warning">S</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="T" type="button" class="btn btn-warning">T</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="U" type="button" class="btn btn-warning">U</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="V" type="button" class="btn btn-warning">V</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="W" type="button" class="btn btn-warning">W</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="X" type="button" class="btn btn-warning">X</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Y" type="button" class="btn btn-warning">Y</button></div>
        <div class="col">
          <button id="letter-possibility" data-id="Z" type="button" class="btn btn-warning">Z</button></div>`)
        
    fetch("http://localhost:3000/api/v1/quotes")
    .then(response => response.json())
    .then(data => {
        let phrase = data.random().quote
        phraseContainer.insertAdjacentHTML('beforeend', `<p>QUOTE ---> ${phrase} <--- QUOTE<p>`)
    })
})

lettersContainer.addEventListener("click", function (e) {
    // add conditional logic here to check if the event target is a letter contained in the current phrase
        // if it is ...... we want to turn that button green and render that letter into the phraseContainer
    if (e.target.tagName === "BUTTON") {
        let targetDiv = e.target.parentElement
        e.target.remove()
        targetDiv.insertAdjacentHTML('beforeend', `<button id="letter-possibility" data-id="${e.target.dataset.id}" type="button" class="btn btn-success">${e.target.dataset.id}</button>`)
    }
})