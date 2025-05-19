import React from "react";
import TimeField from "react-simple-timefield";
import { Slider, Rail, Handles, Tracks } from "react-compound-slider";
import { SliderRail, Handle, Track } from "./Slider";

interface ConverterBarProps {
  distance: number;
  time: string;
  speed: number;
  pace: string;
  onDistanceChange: (value: number) => void;
  onTimeChange: (value: string) => void;
  onSpeedChange: (value: number) => void;
  onPaceChange: (value: string) => void;
}

export default function ConverterBar({
  distance,
  time,
  speed,
  pace,
  onDistanceChange,
  onTimeChange,
  onSpeedChange,
  onPaceChange,
}: ConverterBarProps) {
  const paceToSpeed = (paceString: string): string => {
    const [min, sec] = paceString.split(":").map(Number);
    if (isNaN(min) || isNaN(sec) || sec >= 60 || sec < 0) return "N/A";
    const speed = 1 / (min / 60 + sec / 3600);
    return speed.toFixed(2);
  };

  const speedToPace = (speed: number): string => {
    if (speed <= 0) return "N/A";
    const pace = 60 / speed;
    const min = String(Math.floor(pace)).padStart(2, "0");
    const sec = String(Math.round((pace % 1) * 60)).padStart(2, "0");
    return `${min}:${sec}`;
  };

  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    if (!isNaN(num)) {
      const rounded = Math.round(num * 100) / 100;
      onDistanceChange(rounded);
    }
  };

  const handleTimeChange = (_e: unknown, t: string) => onTimeChange(t);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const s = parseFloat(e.target.value);
    onSpeedChange(s);
    onPaceChange(speedToPace(s));
  };

  const handlePaceChange = (_e: unknown, p: string) => {
    onPaceChange(p);
    onSpeedChange(parseFloat(paceToSpeed(p)));
  };

  const handleSliderChange = (values: readonly number[]) => {
    onDistanceChange(Math.round(values[0] * 100) / 100);
  };

  return (
    <div className="converter-bar">
      <div className="field">
        <label htmlFor="speed-input">Speed</label>
        <input
          id="speed-input"
          type="number"
          step="0.1"
          value={speed}
          onChange={handleSpeedChange}
        />
      </div>

      <div className="field">
        <label htmlFor="pace-input">Pace</label>
        <TimeField
          value={pace}
          onChange={handlePaceChange}
          input={<input id="pace-input" type="text" />}
        />
      </div>

      <div className="field">
        <label htmlFor="time-input">Time</label>
        <TimeField
          value={time}
          onChange={handleTimeChange}
          input={<input id="time-input" type="text" pattern="\d*" />}
          showSeconds
        />
      </div>

      <div className="field">
        <label htmlFor="distance-input">Distance</label>
        <input
          id="distance-input"
          type="number"
          step="0.1"
          name="distance"
          placeholder="Distance"
          value={distance}
          onChange={handleDistanceChange}
        />
      </div>

      <div className="field slider">
        <Slider
          mode={2}
          step={0.1}
          domain={[0, 42.2]}
          onUpdate={handleSliderChange}
          onChange={handleSliderChange}
          values={[distance || 0]}
          rootStyle={{
            position: "relative",
            width: "100%",
            touchAction: "none",
          }}
        >
          <Rail>
            {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
          </Rail>
          <Handles>
            {({ handles, activeHandleID, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={[0, 42.2]}
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
