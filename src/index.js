import React from "react";
import ReactDOM from "react-dom";
import TimeField from "react-simple-timefield";
import PropTypes from "prop-types";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { SliderRail, Handle, Track } from "./slider";
import "./index.css";

class ConverterBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  onUpdate = update => {
    const { onDistanceChange } = this.props;

    onDistanceChange(update[0]);
  };

  onChange = values => {
    const { onDistanceChange } = this.props;

    onDistanceChange(values[0]);
  };

  handleDistanceChange(evt) {
    const { onDistanceChange } = this.props;

    onDistanceChange(evt.target.value);
  }

  handleTimeChange(time) {
    const { onTimeChange } = this.props;

    onTimeChange(time);
  }

  render() {
    const { time, distance } = this.props;
    const domain = [0, 42.2];
    const values = [distance];

    return (
      <div className="converter-bar">
        <div className="field">
          <label htmlFor="time-input">
            <TimeField
              value={time}
              onChange={this.handleTimeChange}
              input={<input id="time-input" type="text" pattern="\d*" />}
              showSeconds
            />
          </label>
        </div>

        <div className="field">
          <label htmlFor="distance-input">
            <input
              id="distance-input"
              type="number"
              name="distance"
              step="0.1"
              placeholder="Distance"
              value={distance}
              onChange={this.handleDistanceChange}
            />
          </label>
        </div>

        <div className="field slider">
          <Slider
            mode={2}
            step={0.1}
            domain={domain}
            rootStyle={{
              position: "relative",
              width: "100%",
              touchAction: "none"
            }}
            onUpdate={this.onUpdate}
            onChange={this.onChange}
            values={values}
          >
            <Rail>
              {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
            </Rail>
            <Handles>
              {({ handles, activeHandleID, getHandleProps }) => (
                <div className="slider-handles">
                  {handles.map(handle => (
                    <Handle
                      key={handle.id}
                      handle={handle}
                      domain={domain}
                      isActive={handle.id === activeHandleID}
                      getHandleProps={getHandleProps}
                    />
                  ))}
                </div>
              )}
            </Handles>
            <Tracks right={false}>
              {({ tracks, getTrackProps }) => (
                <div className="slider-tracks">
                  {tracks.map(({ id, source, target }) => (
                    <Track
                      key={id}
                      source={source}
                      target={target}
                      getTrackProps={getTrackProps}
                    />
                  ))}
                </div>
              )}
            </Tracks>
          </Slider>
        </div>
      </div>
    );
  }
}

class ResultTable extends React.Component {
  calculateSpeedAndPace() {
    const { time, distance } = this.props;
    const [hour, minute, second] = time.split(":");

    // Convert minutes and seconds to decimal values (30 min = 0.5 h)
    const fractionOfMinute = Number(second) / 60;
    const fractionOfHour = (parseFloat(minute) + fractionOfMinute) / 60;
    const hoursWithFraction = Number(hour) + fractionOfHour;

    // Calculate and round speed (v = s/t)
    const speed = distance / hoursWithFraction;
    let speedRounded = parseFloat(speed).toFixed(2);

    if (!Number.isFinite(speed)) {
      speedRounded = 0.0;
    }

    // Calculate pace (p = t/s) and convert the decimal value to readable
    // minutes. Pace 4,5 => 4m30s.
    const pace = (hoursWithFraction / distance) * 60;
    const paceWithoutFraction = parseInt(pace / 1, 10);

    const paceFraction = pace % 1;
    const roundedFractions = String(Math.round(paceFraction * 60));
    const fractionAsSeconds = roundedFractions.padStart(2, "0");

    let paceInTime = `${paceWithoutFraction}:${fractionAsSeconds}`;

    if (Number.isNaN(paceWithoutFraction) || Number.isNaN(fractionAsSeconds)) {
      paceInTime = "0:00";
    }

    return { speed: speedRounded, pace: paceInTime };
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
            {distance} <span className="calcunit">km</span>
          </div>
        </li>
        <li className="calcrow">
          <div className="calcprop">Speed</div>
          <div className="calcdata">
            {speedAndPace.speed} <span className="calcunit">km/h</span>
          </div>
        </li>
        <li className="calcrow">
          <div className="calcprop">Pace</div>
          <div className="calcdata">
            {speedAndPace.pace} <span className="calcunit">min/km</span>
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

    this.handleDistanceChange = this.handleDistanceChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
  }

  handleDistanceChange(newDistance) {
    const { distance } = this.state;
    let fixedDistance = Number(parseFloat(newDistance).toFixed(1));

    // No need to update if there's no change.
    if (fixedDistance === distance) {
      return;
    }

    // If the number is invalid (probably parsed from empty string), set to
    // undefined.
    if (Number.isNaN(fixedDistance)) {
      fixedDistance = undefined;
    }

    this.setState({ distance: fixedDistance });
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
          onDistanceChange={this.handleDistanceChange}
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
  onDistanceChange: PropTypes.func,
  onTimeChange: PropTypes.func
};

ConverterBar.defaultProps = {
  time: "",
  distance: 0.0,
  onDistanceChange: () => undefined,
  onTimeChange: () => undefined
};

ResultTable.propTypes = {
  time: PropTypes.string,
  distance: PropTypes.number
};

ResultTable.defaultProps = {
  time: "",
  distance: 0
};

ReactDOM.render(<PaceCalculator />, document.getElementById("root"));

// vim: set ts=2 sw=2 et:
