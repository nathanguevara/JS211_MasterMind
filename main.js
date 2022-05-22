'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var colors = require('colors');
const { Console } = require('console');

let board = [];
let solution = '';
solution = 'abcd';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let soultionArray = solution.split('');
  let guessArray = guess.split('');
  let correctLetterLocations = 0;
  let correctLetters = 0;

  // Checing for Correct Letter Location
  for(let i = 0; i < guessArray.length; i++) {
    if(guessArray[i] == soultionArray[i]){
      correctLetterLocations++;
      soultionArray[i] = null;
    }
  }

  //Checking for Correct Letters
  for(let j = 0; j < guessArray.length; j++) {
    
    let targetIndex;
    targetIndex = soultionArray.indexOf(guessArray[j]);
    if(targetIndex > -1) {
      correctLetters++;
      soultionArray[targetIndex] = null;
    }
  }
  console.log(colors.red(correctLetterLocations) + " - " + correctLetters);
  return correctLetterLocations + "-" + correctLetters;
}

const mastermind = (guess) => {
  solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if(guess === solution) {
    console.log('You guessed it!');
    return 'You guessed it!';
  }else {board.push(guess + " " + generateHint(guess));}
  
}

const restartGame = () => {
  board = [];
  solution = '';
  getPrompt();
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    if(board.length < 10){
      console.log("Guess again.")
      getPrompt();
    } else {
        console.log(`You ran out of turns! The solution was ${solution}`);
        restartGame();
    }
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}