import './App.css';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


function Button({letter, checkLetter, updateColor}) { //takes an object that contains a letter property as a parameter 
  const [className, setClassName] = useState('button');
  const onClick = () => {
    checkLetter();
    setClassName('button button-' + updateColor);
  }
  return <button className={className} onClick={() => onClick()}>{letter}</button>; 
}


function App() {
  const [myWord, setMyWord] = useState('');
  const [state, setState] = useState({currentWordInProgress: '', arrayOfSelectedLetters: []}); //useState() creates a piece of state for a component, and its only parameter determines the initial value of that state. It returns two things: the state, and a function that can be used to update the state later.
  const [numberOfAttemptsLeft, setNumberOfAttemptsLeft] = useState('?');
  const [gameStatus, setGameStatus] = useState("Pick a letter");
  const alphabet = Array.from(Array(26)).map((_,i) => String.fromCharCode(i+97)); //Creates an array from an array of 26 undefined elements, once these elements's indexes (0 - 25) value get added 97 (a in ASCII)
  const checkIfLetterInWord = (selectedLetter) => {
    let newState = state;

    if (myWord.includes(selectedLetter) && numberOfAttemptsLeft > 0) {
      for (let i = 0; i < myWord.length; i++) {
        if (myWord[i] === selectedLetter)
          newState.currentWordInProgress = newState.currentWordInProgress.substring(0, i) + selectedLetter + newState.currentWordInProgress.substring(i + 1);
      }
      setState({...state, currentWordInProgress: newState.currentWordInProgress});
      if (newState.currentWordInProgress === myWord && numberOfAttemptsLeft > 0) {
        setGameStatus('You WON!!!');
      }
    }
    else if (numberOfAttemptsLeft > 0 && gameStatus !== 'You WON!!!' && !state.arrayOfSelectedLetters.includes(selectedLetter)) {
      let newNumberOfAttemptsLeft = numberOfAttemptsLeft - 1;
      let newGameStatus = gameStatus;
      if(newNumberOfAttemptsLeft < 1) {
        newGameStatus = 'You LOST! Try again.';
      }
      setGameStatus(newGameStatus);
      setNumberOfAttemptsLeft(newNumberOfAttemptsLeft);
    }
    newState.arrayOfSelectedLetters.push(selectedLetter);
    setState({...state, arrayOfSelectedLetters: newState.arrayOfSelectedLetters});
  }
  const updateButtonColor = selectedLetter => numberOfAttemptsLeft > 0 ? (myWord.includes(selectedLetter) ? 'green': 'red') : '';

  const {register, handleSubmit} = useForm();
  const onSubmit = (data) => {
    setMyWord(data.secretWord);
    const regex = /./g; //regular expression, '.' means any character, 'g' means global (global search). We can also use 'i' for case insensitive
    setState({...state, currentWordInProgress: data.secretWord.replace(regex, '-')});
    setNumberOfAttemptsLeft(data.maxNumAttempts);

  }
  return (
    <div className="App">

      <header className="App-header">
       Hangman!
       <form onSubmit={handleSubmit(onSubmit)}>
          <input type="password" placeholder="Enter Secret word" {...register("secretWord")}/>
          <input type="text" placeholder="Wrong attempts allowed" {...register("maxNumAttempts")}/>
          <input type="submit"/>
        </form>
      </header>

      <img className="hangman" src="https://d338t8kmirgyke.cloudfront.net/icons/icon_pngs/000/001/955/original/hangman.png" alt="Hang"/> 
      
      <p>{state.currentWordInProgress}</p>
      
      <div>
        {alphabet.map(letter => <Button updateColor={updateButtonColor(letter)} checkLetter={() => checkIfLetterInWord(letter)} letter={letter} /> )}
      </div>

      <p className= 'bold'>Number of attempts left: {numberOfAttemptsLeft}</p>
      <p className='bold'>{gameStatus}</p>
    </div>
  );
}

export default App;

/*
counter of incorrect guesses
message if player wins/loses 
change colour of buttons to represent correct/incorrect guesses
remove ability to click on already clicked butts
form/input to enter letter



*/

/*
 
        */

// reactRoutes/reactApp
// ReactApp = ({ somePropValue }) => <XML />;

// server.js
// express.engine('some-react-engine');
// app.get('/', (req, res) => <ReactApp  somePropValue={data-from-SQL-or-request-object}/>);
