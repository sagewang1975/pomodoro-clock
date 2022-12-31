import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';


function App() {


  const audioElement = React.useRef(null);
  const [intervalId, setIntervalId] = React.useState(null);
  const [breakTime, setBreakTime] = React.useState(5 * 60);
  const [sessionTime, setSessionTime] = React.useState(25 * 60);
  const [displayTime, setDisplayTime] = React.useState(25 * 60);
  const [onBreak, setOnBreak] = React.useState(false);

  React.useEffect(() => {
    setDisplayTime(sessionTime);
  }, [sessionTime]);

  React.useEffect(() => {
    if (displayTime === 0) {
      audioElement.current.currentTime = 0;
      audioElement.current.play();
      if (!onBreak) {
        setOnBreak(true);
        setDisplayTime(breakTime);
      } else if (onBreak) {
        setOnBreak(false);
        setDisplayTime(sessionTime);
      }
    }
  }, [displayTime, onBreak, breakTime, sessionTime]);

  const timerControl = () => {
    if (intervalId === null) {
      const interval = setInterval(() => {
        setDisplayTime((previousdisplayTime) => previousdisplayTime - 1);
      }, 1000);
      setIntervalId(interval);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const resetTime = () => {
    audioElement.current.pause();
    audioElement.current.currentTime = 0;
    clearInterval(intervalId);
    setIntervalId(null);
    setDisplayTime(25 * 60);
    setBreakTime(5 * 60);
    setSessionTime(25 * 60);
    setOnBreak(false);
  };

  const incSessionTime = () => {
    setSessionTime(sessionTime >= 60 * 60 ? sessionTime : sessionTime + 60);
  };

  const decSessionTime = () => {
    setSessionTime(sessionTime <= 60 ? sessionTime : sessionTime - 60);
  };

  const convertToMinutesDisplay = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const convertToMinutesLength = (time) => {
    return time / 60;
  };

  const incBreakTime = () => {
    setBreakTime(breakTime >= 60 * 60 ? breakTime : breakTime + 60);
  };

  const decBreakTime = () => {
    setBreakTime(breakTime <= 60 ? breakTime : breakTime - 60);
  };

  return (
    <div id="App">
      <h1 id="timer-label">{onBreak ? "Break" : "Session"}</h1>
      <h2 id="time-left">{convertToMinutesDisplay(displayTime)}</h2>
      <button id="start_stop" onClick={timerControl}>
        Start_Stop
      </button>
      <button id="reset" onClick={resetTime}>
        Reset
      </button>

      <h2 id="session-label">Session Length</h2>
      <button id="session-decrement" onClick={decSessionTime}>
        -
      </button>
      <h3 id="session-length">{convertToMinutesLength(sessionTime)}</h3>
      <button id="session-increment" onClick={incSessionTime}>
        +
      </button>

      <h2 id="break-label">Break Length</h2>
      <button id="break-decrement" onClick={decBreakTime}>
        -
      </button>
      <h3 id="break-length">{convertToMinutesLength(breakTime)}</h3>
      <button id="break-increment" onClick={incBreakTime}>
        +
      </button>
      <audio
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        id="beep"
        ref={audioElement}
      ></audio>
    </div>
  );

}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
