import React, { Component } from "react";
import styled from "styled-components";

import click1 from "./click1.wav";
import click2 from "./click2.wav";

const Wrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  text-align: center;
  max-width: 375px;
  margin: 0 auto;
  padding: 30px;
`;
const Slider = styled.input`
  overflow: hidden;
  max-width: 500px;
  width: 80%;
  margin: 10px;
  cursor: pointer;


`;

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      count: 0,
      bpm: 100,
      beatsPerMeasure: 4,
    };

    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click1.play();
    } else {
      this.click2.play();
    }

    this.setState((state) => ({
      count: (state.count + 1) % state.beatsPerMeasure,
    }));
  };

  startStop = () => {
    if (this.state.playing) {
      clearInterval(this.timer);
      this.setState({
        playing: false,
      });
    } else {
      this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      this.setState(
        {
          count: 0,
          playing: true,
        },
        this.playClick
      );
    }
  };

  handleBpmChange = (event) => {
    const bpm = event.target.value;

    if (this.state.playing) {
      clearInterval(this.timer);
      this.timer = setInterval(this.playClick, (60 / bpm) * 1000);

      this.setState({
        count: 0,
        bpm,
      });
    } else {
      this.setState({ bpm });
    }
  };

  render() {
    const { playing, bpm } = this.state;

    return (
      <Wrapper>
        <div>
          <div>{bpm} BPM</div>
          <Slider
            type="range"
            min="60"
            max="240"
            value={bpm}
            onChange={this.handleBpmChange}
          />
        </div>
        <button onClick={this.startStop}>{playing ? "Stop" : "Start"}</button>
      </Wrapper>
    );
  }
}

export default Metronome;
