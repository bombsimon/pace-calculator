import React from "react";
import ReactDOM from "react-dom";
import TimeField from "react-simple-timefield";
import PropTypes from "prop-types";
import "./index.css";

class ConverterBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleChange(e) {
    const { onChange } = this.props;

    onChange(e);
  }

  handleTimeChange(time) {
    const { onTimeChange } = this.props;

    onTimeChange(time);
  }

  render() {
    const { time, distance } = this.props;

    return (
      <div className="converter-bar">
        <div className="field">
          <label htmlFor="time-input">
            Time (HH:MM:SS)
            <TimeField
              value={time}
              onChange={this.handleTimeChange}
              input={<input id="time-input" />}
              showSeconds
            />
          </label>
        </div>

        <div claassName="field">
          <label htmlFor="distance-input">
            Distance (km as decimal value)
            <input
              id="distance-input"
              type="number"
              name="distance"
              step="0.1"
              placeholder="Distance"
              value={distance}
              onChange={this.handleChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

class ResultTable extends React.Component {
  calculateSpeedAndPace() {
    const { time, distance } = this.props;

    const [hour, minute, second] = time.split(":");

    const fractionOfMinute = Number(second) / 60;
    const fractionOfHour = (parseFloat(minute) + fractionOfMinute) / 60;
    const hoursWithFraction = Number(hour) + fractionOfHour;

    const speed = distance / hoursWithFraction;
    const pace = (hoursWithFraction / distance) * 60;

    return { speed, pace };
  }

  render() {
    const speedAndPace = this.calculateSpeedAndPace();
    const { time, distance } = this.props;

    return (
      <ul className="calc">
        <li className="calcrow">
          <div className="calcprop">Time</div>
          <div className="calcdata">{time}</div>
        </li>
        <li className="calcrow">
          <div className="calcprop">Distance</div>
          <div className="calcdata">
            {parseFloat(distance).toFixed(2)}{" "}
            <span className="calcunit">km</span>
          </div>
        </li>
        <li className="calcrow">
          <div className="calcprop">Speed</div>
          <div className="calcdata">
            {parseFloat(speedAndPace.speed).toFixed(2)}{" "}
            <span className="calcunit">km/h</span>
          </div>
        </li>
        <li className="calcrow">
          <div className="calcprop">Pace</div>
          <div className="calcdata">
            {parseFloat(speedAndPace.pace).toFixed(2)}{" "}
            <span className="calcunit">min/km</span>
          </div>
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
    this.setState({ time });
  }

  render() {
    const { distance, time } = this.state;

    return (
      <div>
        <ConverterBar
          distance={distance}
          time={time}
          onChange={this.handleChange}
          onTimeChange={this.handleTimeChange}
        />
        <ResultTable distance={distance} time={time} />
      </div>
    );
  }
}

ConverterBar.propTypes = {
  time: PropTypes.string,
  distance: PropTypes.number,
  onChange: PropTypes.func,
  onTimeChange: PropTypes.func
};

ConverterBar.defaultProps = {
  time: "",
  distance: 0.0,
  onChange: () => undefined,
  onTimeChange: () => undefined
};

ResultTable.propTypes = {
  time: PropTypes.string,
  distance: PropTypes.number
};

ResultTable.defaultProps = {
  time: "",
  distance: 0.0
};

ReactDOM.render(<PaceCalculator />, document.getElementById("root"));

// vim: set ts=2 sw=2 et:
