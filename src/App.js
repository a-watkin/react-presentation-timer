import React, { Component } from 'react';

import UIfx from '../node_modules/uifx'
import beepMp3 from './my-sounds/whisky_ding_short.wav'

import Time from './time/Time';
import TimeInput from './timeInput/TimeInput';
import Warning from './warning/Warning';
import Button from './buttons/Button'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const beep = new UIfx(beepMp3)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Displays as the time to countdown for, passed in from props.
      countdownTime: 600,
      // The time remaining in the current countdown.
      remainingTime: null,
      timeFlowing: false,
      firstWarning: 300,
      secondWarning: 120
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
    this.setState({
      timeFlowing: !this.state.timeFlowing
    })
  }

  tick() {
    if (this.state.remainingTime > 0) {
      this.setState((state, props) => {
        return {
          remainingTime: state.remainingTime -= 1
        }
      });

      if (this.state.remainingTime === this.state.firstWarning) {
        this.playSound();
      }

      if (this.state.remainingTime === this.state.secondWarning) {
        this.playSound();
      }
    } else {
      this.setState({
        timeFlowing: false
      })
    }

    console.log(this.state)
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
    let { timeFlowing, remainingTime } = this.state;
    if (!timeFlowing) {
      // If a previous countdown has ended reset remaining time.
      if (remainingTime === 0) {
        this.setState({
          remainingTime: this.state.countdownTime
        })
      }

      this.setState({
        timeFlowing: true
      })
    }
    this.startCountdown();
  }

  handleResetTime() {
    this.componentWillUnmount();
    this.setState((state) => ({
      timeFlowing: false,
      countdownTime: state.countdownTime,
      remainingTime: state.countdownTime
    }));
  }

  handleTimeChange(e) {
    this.stopCountdown();
    // Convert the input to what it would be in seconds for the minute value entered.
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

  playSound() {
    beep.play();
  }

  render() {
    return (
      <div className="App container">
        <div className="row time-area">
          <div className="col">

            <Time
              time={this.state.remainingTime}
            >
            </Time>

          </div>
        </div>

        <div className="row warning-area">
          <div className="col my-auto">

            <Warning
              startingTime={this.state.countdownTime}
              time={this.state.remainingTime}
              firstWarning={this.state.firstWarning}
              secondWarning={this.state.secondWarning}
              // This might not work.
              timeFlowing={this.state.timeFlowing}
            >
            </Warning>

          </div>
        </div>

        <div className="row time-input">
          <div className="col">

            <TimeInput
              startingTime={this.state.countdownTime}
              text={"Presentation time in minutes:"}
              changeTime={(e) => this.handleTimeChange(e)}
              showWarningInput={false}
            ></TimeInput>

            <TimeInput
              startingTime={Math.floor(this.state.countdownTime / 2)}
              text={"Warning time in minutes:"}
              changeTime={(e) => this.handleFirstWarnings(e)}
              showWarningInput={false}
            >
            </TimeInput>

            <TimeInput
              startingTime={Math.floor(this.state.countdownTime / 4)}
              text={"Warning time in minutes:"}
              changeTime={(e) => this.handleSecondWarnings(e)}
              showWarningInput={false}
            >
            </TimeInput>

          </div>
        </div>

        <div className="row button-container">
          <div className="col">

            {this.state.timeFlowing ?
              <Button handleClick={() => this.stopCountdown()} name={"Pause"}></Button> :
              <Button handleClick={() => this.handleStart()} name={"Start"}></Button>
            }
          </div>

          <div className="col">

            <Button handleClick={() => this.handleResetTime()} name={"Reset"}></Button>

          </div>

        </div>
      </div>
    )
  }
}

export default App;
