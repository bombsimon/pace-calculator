import React, { Component } from "react";
import type { FC } from "react";

export const SliderRail: FC<{
  getRailProps: () => React.HTMLAttributes<HTMLElement>;
}> = ({ getRailProps }) => (
  <>
    <div
      style={{
        position: "absolute",
        transform: "translate(0%, -50%)",
        width: "100%",
        height: 42,
        borderRadius: 7,
        cursor: "pointer",
      }}
      {...getRailProps()}
    />
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: 14,
        transform: "translate(0%, -50%)",
        borderRadius: 7,
        pointerEvents: "none",
        backgroundColor: "#f05167",
      }}
    />
  </>
);

interface HandleProps {
  domain: [number, number];
  handle: { id: string; value: number; percent: number };
  isActive: boolean;
  disabled?: boolean;
  getHandleProps: (
    id: string,
    options?: Record<string, unknown>,
  ) => React.HTMLAttributes<HTMLElement>;
}

export class Handle extends Component<HandleProps, { mouseOver: boolean }> {
  constructor(props: HandleProps) {
    super(props);
    this.state = { mouseOver: false };
  }

  onMouseEnter = () => this.setState({ mouseOver: true });
  onMouseLeave = () => this.setState({ mouseOver: false });

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
    } = this.props;
    const { mouseOver } = this.state;

    return (
      <>
        {(mouseOver || isActive) && !disabled && (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px",
            }}
          />
        )}
        <div
          style={{
            left: `${percent}%`,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
            zIndex: 400,
            width: 26,
            height: 42,
            cursor: "pointer",
            backgroundColor: "none",
          }}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-label="Slider"
          style={{
            left: `${percent}%`,
            position: "absolute",
            transform: "translate(-50%, -50%)",
            WebkitTapHighlightColor: "rgba(0,0,0,0)",
            zIndex: 300,
            width: 24,
            height: 24,
            border: 0,
            borderRadius: "50%",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.2)",
            backgroundColor: disabled ? "#666" : "#982736",
          }}
        />
      </>
    );
  }
}

interface TrackProps {
  source: { id: string; value: number; percent: number };
  target: { id: string; value: number; percent: number };
  getTrackProps: () => React.HTMLAttributes<HTMLElement>;
  disabled?: boolean;
}

export const Track: FC<TrackProps> = ({
  source,
  target,
  getTrackProps,
  disabled,
}) => (
  <div
    style={{
      position: "absolute",
      transform: "translate(0%, -50%)",
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? "#999" : "#982736",
      borderRadius: 7,
      cursor: "pointer",
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`,
    }}
    {...getTrackProps()}
  />
);
