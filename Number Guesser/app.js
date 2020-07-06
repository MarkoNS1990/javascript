//Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');
      
//Asign UI min and max
minNum.textContent = min
maxNum.textContent = max 

//Play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload()
    }
})

//Listen for guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value)
    
    //Validate
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`,'red')
        guessInput.value=''
        
    }

    //Check if won
    else if(guess === winningNum){
        gameOver(true,`${winningNum} is correct, YOU WIN!`)
        
    }else{
        //Wrong number
        guessesLeft -= 1

        if(guessesLeft === 0){
        //Game over - lost
        gameOver(false,`Game over, you lost, the correct number was ${winningNum}`)
        

        }else{
            //Game continues - answer wrong
            guessInput.style.borderColor = 'red'
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`,'red')
            
            //Clear input
            guessInput.value=''
        }
    }
})
//Game over
function gameOver(won,msg){
    let color
    won === true ? color ='green':color='red'
    
    //Disable input
    guessInput.disabled = true
    //Set text color
    message.style.color = color
    //Change border color
    guessInput.style.borderColor = color
    //Set message
    setMessage(msg)

    //Play again
    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again'
}
//Get Winning Number
function getRandomNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min)
}

//Set message
function setMessage(msg,color){
    message.style.color = color
    message.textContent = msg
}