import React from 'react';
import ReactDOM from 'react-dom';
import TimeField from 'react-simple-timefield';
import './index.css';

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
        <div claassName="field">
          <label>Time (HH:MM:SS)</label>
          <TimeField
              value={this.props.time}
              onChange={this.handleTimeChange}
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
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Distance</th>
            <th>Speed</th>
            <th>Pace</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{this.props.time}</td>
            <td>{parseFloat(this.props.distance).toFixed(2)} km</td>
            <td>{parseFloat(speedAndPace.speed).toFixed(2)} km/h</td>
            <td>{parseFloat(speedAndPace.pace).toFixed(2)} min/km</td>
          </tr>
        </tbody>
      </table>
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
