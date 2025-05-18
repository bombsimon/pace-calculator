import React, { useState } from "react";
import ConverterBar from "./components/ConverterBar";
import ResultTable from "./components/ResultTable";

export default function App() {
  const [distance, setDistance] = useState<number>(10.0);
  const [time, setTime] = useState<string>("00:45:00");
  const [speed, setSpeed] = useState<number>(13.3);
  const [pace, setPace] = useState<string>("04:30");

  return (
    <>
      <ConverterBar
        distance={distance}
        time={time}
        speed={speed}
        pace={pace}
        onDistanceChange={setDistance}
        onTimeChange={setTime}
        onSpeedChange={setSpeed}
        onPaceChange={setPace}
      />
      <ResultTable distance={distance} time={time} />
    </>
  );
}
