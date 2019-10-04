import React, { Component } from 'react';
import './App.css';

import Time from './time/Time';
import TimeInput from './timeInput/TimeInput';
import Warning from './warning/Warning';
import Button from './buttons/Button'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Displays as the time to countdown for, passed in from props.
      countdownTime: 600,
      // The time remaining in the current countdown.
      remainingTime: null,
      timeFlowing: false,
      firstWarning: null,
      secondWarning: null
    }
  }

  startCountdown() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  stopCountdown() {
    clearInterval(this.timerID);
  }

  tick() {
    if (this.state.remainingTime > 0) {
      this.setState((state, props) => {
        return {
          remainingTime: state.remainingTime -= 1
        }
      });
    } else {
      this.setState({
        // reset to countdownTime
        // remainingTime: this.state.countdownTime
      })
    }
  }

  handlePause() {
    if (this.state.timeFlowing) {
      this.componentWillUnmount();
      this.setState((state) => ({
        timeFlowing: !state.timeFlowing
      }));
    } else {
      this.componentDidMount();
      this.setState((state) => ({
        timeFlowing: !state.timeFlowing
      }))
    }
  }

  componentDidMount() {
    this.setState({
      remainingTime: this.state.countdownTime
    })
  }

  componentWillUnmount() {
    this.stopCountdown();
  }

  handleStart() {
    if (!this.state.timeFlowing) {
      this.setState({
        timeFlowing: true
      })
    }
    this.startCountdown();
  }

  hanldeResetTime() {
    this.componentWillUnmount();
    this.setState((state) => ({
      timeFlowing: false,
      countdownTime: state.countdownTime,
      remainingTime: state.countdownTime
    }));
  }

  handleTimeChange(e) {
    this.stopCountdown();
    // convert the input to what it would be in seconds for the minute value entered
    let inputTime = e.target.value * 60;

    this.setState({
      timeFlowing: false,
      countdownTime: inputTime,
      remainingTime: inputTime
    });
  }

  handleFirstWarnings(e) {
    this.setState({
      firstWarning: e.target.value * 60
    });
  }

  handleSecondWarnings(e) {
    this.setState({
      secondWarning: e.target.value * 60
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Presentation timer</h1>

        <Time
          time={this.state.remainingTime}
        >
        </Time>

        <Warning
          startingTime={this.state.countdownTime}
          time={this.state.remainingTime}
          firstWarning={this.state.firstWarning}
          secondWarning={this.state.secondWarning}
        >
        </Warning>

        <TimeInput
          startingTime={this.state.countdownTime}
          text={"Enter presentation time in minutes below:"}
          changeTime={(e) => this.handleTimeChange(e)}
          showWarningInput={false}
        ></TimeInput>

        <TimeInput
          startingTime={Math.floor(this.state.countdownTime / 2)}
          changeTime={(e) => this.handleFirstWarnings(e)}
          showWarningInput={false}
        >
        </TimeInput>
        <TimeInput
          startingTime={Math.floor(this.state.countdownTime / 4)}
          changeTime={(e) => this.handleSecondWarnings(e)}
          showWarningInput={false}
        >
        </TimeInput>

        <span>
          {this.state.timeFlowing ?
            <Button handleClick={() => this.handlePause()} name={"Pause"}></Button> :
            <Button handleClick={() => this.handleStart()} name={"Start"}></Button>}

          <Button handleClick={() => this.hanldeResetTime()} name={"Reset"}></Button>
        </span>


        <button onClick={() => this.playAudio()}> play</button>

      </div>
    )
  }
}

export default App;
