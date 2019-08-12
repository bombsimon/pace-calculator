import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          transform: "translate(0%, -50%)",
          width: "100%",
          height: 42,
          borderRadius: 7,
          cursor: "pointer"
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
          backgroundColor: "#f05167"
        }}
      />
    </Fragment>
  );
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired
};

export class Handle extends Component {
  state = {
    mouseOver: false
  };

  onMouseEnter = () => {
    this.setState({ mouseOver: true });
  };

  onMouseLeave = () => {
    this.setState({ mouseOver: false });
  };

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps
    } = this.props;
    const { mouseOver } = this.state;

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px"
            }}
          />
        ) : null}
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
            backgroundColor: "none"
          }}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          })}
        />
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
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
            backgroundColor: disabled ? "#666" : "#982736"
          }}
        />
      </Fragment>
    );
  }
}

Handle.propTypes = {
  domain: PropTypes.arrayOf(PropTypes.number).isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  disabled: PropTypes.bool
};

Handle.defaultProps = {
  disabled: false
};

export function Track({ source, target, getTrackProps, disabled }) {
  return (
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
        width: `${target.percent - source.percent}%`
      }}
      {...getTrackProps()}
    />
  );
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

Track.defaultProps = {
  disabled: false
};
