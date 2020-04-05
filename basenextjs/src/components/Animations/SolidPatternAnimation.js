import React from 'react';
import PropTypes from 'prop-types';
// import { TimelineMax, Power2 } from 'gsap/TweenMax';

class SolidPatternAnimation extends React.Component {
  componentDidMount() {
    const {
      repeat,
    } = this.props;

    const repeatConfigs = repeat ? { repeat: -1, repeatDelay: 1 } : {};
    const GSAP = require('gsap');
    const { TimelineMax, Power2 } = GSAP;
    const tl = new TimelineMax(repeatConfigs);

    tl.to('#topSquare', 0.5, {
      x: 190, // move 190 units to the left. why is this not moving to the top left corner to 190
      ease: Power2.easeOut,
    })
      .to('#leftSquare', 0.5, {
        rotation: 90,
        transformOrigin: 'bottom left',
        ease: Power2.easeOut,
      }, '0.5')
      .to('#rightSquare', 0.5, {
        rotation: -90,
        transformOrigin: 'bottom right',
        ease: Power2.easeOut,
      }, '1');
  }

  render() {
    return (
      <svg height="200" width="300" xmlns="http://www.w3.org/2000/svg">
        <mask id="topMask">
          <rect id="topSquare" x="-160" y="40" width="200" height="50" fill="white" />
        </mask>
        <mask id="leftMask">
          <rect id="leftSquare" x="60" y="-10" width="100" height="80" fill="white" />
        </mask>
        <mask id="rightMask">
          <rect id="rightSquare" x="110" y="-65" width="120" height="120" fill="white" />
        </mask>

        <g id="withMask">
          <path
            className="solidStroke"
            d="M40 50
            L50 80
            L230 40
            Z
            "
            mask="url(#topMask)"
          />
          <path
            className="solidStroke"
            d="M105 75
            L120 71
            L130 150
            L60 170
            L115 145
            Z
            "
            mask="url(#leftMask)"
          />
          <path
            className="solidStroke"
            d="M135 68
            L160 62
            L170 130
            L230 120
            L145 145
            Z
            "
            mask="url(#rightMask)"
          />
        </g>
        {/*
        <path
          d="M50 50
                    L70 70
                    L200 40
                    Z
                    "
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M80 80
                    L100 70
                    L100 150
                    L60 180
                    L90 130
                    Z
                    "
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M120 70
                    L150 70
                    L130 140
                    L200 100
                    L120 160
                    Z
                    "
          stroke="black"
          strokeWidth="2"
          fill="none"
        />
        */}
        Sorry, your browser does not support inline SVG.
        <Styles />
      </svg>
    );
  }
}

const Styles = () => (
  <style jsx>
    {`
      .solidStroke {
        fill: #fba850;
        stroke: #fba850;
        stroke-width: 2;
      }
    `}
  </style>
);

SolidPatternAnimation.propTypes = {
  repeat: PropTypes.bool,
};

SolidPatternAnimation.defaultProps = {
  repeat: false,
};

export default SolidPatternAnimation;
