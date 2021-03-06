/*-------------------------------- Constants --------------------------------*/

/*-------------------------------- Variables --------------------------------*/

let secretNum, guessList, isWinner

/*------------------------ Cached Element References ------------------------*/

const form = document.querySelector("form")
const guessInput = document.querySelector("#guessInput")
const guessesEl = document.querySelector("#prevGuesses")
const messageEl = document.querySelector("#message")

/*----------------------------- Event Listeners -----------------------------*/

form.addEventListener("reset", init)

form.addEventListener("submit", function (evt) {
  evt.preventDefault()
  if (isWinner === false) {
    checkGuess(parseInt(guessInput.value))
  }
})

/*-------------------------------- Functions --------------------------------*/

init()

function init() {
  messageEl.className = ""
  guessesEl.innerText = ""
  messageEl.innerText = "Please enter a number from 1 to 100"
  document.querySelector("#resetButton").setAttribute("hidden", true)
  document.querySelector("#prevGuessesMsg").innerText = ""
  guessList = []
  isWinner = false
  secretNum = Math.floor(Math.random() * 100 + 1)
  render()
}

function checkGuess(guess) {
  guessInput.value = ""
  if (isNaN(guess) || guess < 1 || guess > 100) {
    renderError("Whoops! Please enter a number from 1 to 100.")
    return
  } else if (guess === secretNum) {
    isWinner = true
  }
  guessList.push(guess)
  render()
}

function render() {
  const lastGuess = guessList[guessList.length - 1]
  const div = document.createElement("div")
  div.innerText = lastGuess

  if (guessList.length === 1) {
    document.getElementById("prevGuessesMsg").innerText = "Previous Guesses:"
    document.querySelector("#resetButton").removeAttribute("hidden")
  }

  if (isWinner) {
    renderWin(div)
    return
  } else if (lastGuess > secretNum || lastGuess < secretNum) {
    renderGuess(div, lastGuess)
  }
}

function renderWin(div) {
  messageEl.className = "winner"
  div.className = "winner"
  guessesEl.appendChild(div)
  if (guessList.length === 1) {
    messageEl.innerText = `You found the number in one guess!`
  } else {
    messageEl.innerText = `Congratulations! You found the number ${secretNum} in ${guessList.length} guesses!`
  }
}

function renderGuess(div, lastGuess) {
  if (lastGuess < secretNum) {
    messageEl.className = "low"
    div.className = "low"
    messageEl.innerText = `${lastGuess} is too low, please try again!`
  } else if (lastGuess > secretNum) {
    messageEl.className = "high"
    div.className = "high"
    messageEl.innerText = `${lastGuess} is too high, please try again!`
  }
  guessesEl.appendChild(div)
}

function renderError(error) {
  messageEl.className = "error"
  messageEl.innerText = error
}
