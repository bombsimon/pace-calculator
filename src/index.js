import React from 'react';
import ReactDOM from 'react-dom';
import TimeField from 'react-simple-timefield';
import './css/main.css';

class ConverterBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(e) {
    this.props.onChange(e);
  }

  handleTimeChange(time) {
    this.props.onTimeChange(time);
  }

  render() {
    return (
      <div className="converter-bar">
        <div className="field">
          <label>Time (HH:MM:SS)</label>
          <TimeField
           value={this.props.time}
           onChange={this.handleTimeChange}
           input={<input className="myClass" />}
           showSeconds
          />
        </div>

        <div claassName="field">
          <label>Distance (km as decimal value)</label>
          <input
            id="distance-input"
            type="number"
            name="distance"
            step="0.1"
            placeholder="Distance"
            value={this.props.distance}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

class ResultTable extends React.Component {
  calculateSpeedAndPace() {
    let [ hour, minute, second ] = this.props.time.split(":");

    let fractions_of_minute = parseInt(second) / 60;
    let fractions_of_hour = ( parseFloat(minute) + fractions_of_minute ) / 60;
    let hours_with_fractions = Number(hour) + fractions_of_hour;

    let speed_kph = this.props.distance / hours_with_fractions;
    let pace = hours_with_fractions / this.props.distance * 60;

    return { speed: speed_kph, pace: pace };
  }

  render() {
    let speedAndPace = this.calculateSpeedAndPace();

    return (
      <ul class="calc">
        <li class="calcrow">
          <div class="calcprop">Time</div>
          <div class="calcdata">{this.props.time}</div>
        </li>
        <li class="calcrow">
          <div class="calcprop">Distance</div>
          <div class="calcdata">{parseFloat(this.props.distance).toFixed(2)} <span class="calcunit">km</span></div>
        </li>
        <li class="calcrow">
          <div class="calcprop">Speed</div>
          <div class="calcdata">{parseFloat(speedAndPace.speed).toFixed(2)} <span class="calcunit">km/h</span></div>
        </li>
        <li class="calcrow">
          <div class="calcprop">Pace</div>
          <div class="calcdata">{parseFloat(speedAndPace.pace).toFixed(2)} <span class="calcunit">min/km</span></div>
        </li>
      </ul>
    );
  }
}

class PaceCalculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      distance: 7.5,
      time: "00:45:00"
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleTimeChange(time) {
    this.setState({ time: time });
  }

  render() {
    return (
      <div>
        <ConverterBar
          distance={this.state.distance}
          time={this.state.time}
          onChange={this.handleChange}
          onTimeChange={this.handleTimeChange}
        />
        <ResultTable
          distance={this.state.distance}
          time={this.state.time}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <PaceCalculator />,
  document.getElementById('root')
);

// vim: set ts=2 sw=2 et:
