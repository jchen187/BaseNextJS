import React from 'react';
import PropTypes from 'prop-types';
import { TimelineMax, Power2 } from 'gsap';

class LinePatternAnimation extends React.Component {
  componentDidMount() {
    const {
      repeat,
    } = this.props;

    const repeatConfigs = repeat ? { repeat: -1, repeatDelay: 1 } : {};
    // const GSAP = require('gsap');
    // const { TimelineMax, Power2 } = GSAP;
    const tl = new TimelineMax(repeatConfigs);

    tl.to('#j', 2, {
      strokeDashoffset: 0,
      ease: Power2.easeOut,
    })
      .to('#c', 2, {
        strokeDashoffset: 0,
        ease: Power2.easeOut,
      }, '0.8');
  }

  render() {
    return (
      <svg height="200" width="300" xmlns="http://www.w3.org/2000/svg">
        <path
          id="j"
          className="stroke forwards"
          d="M10 100
                    L100 100
                    L70 80
                    L140 20
                    L90 170
                    L130 100
                    L230 100
                    "
        />
        {/*
        <path
          id="c"
          className="version-1 stroke forwards"
          d="M170 80
                    L140 120
                    L170 160
                    L170 150
                    L280 150
                    "
        />
        <path
          id="c"
          className="version-2 stroke forwards"
          d="M170 80
                    L140 120
                    L170 160
                    "
        />
        */}
        <path
          id="c"
          className="version-3 stroke forwards"
          d="M210 80
                    L160 80
                    L140 150
                    L270 150
                    "
        />
        Sorry, your browser does not support inline SVG.
        <Styles />
      </svg>
    );
  }
}

const Styles = () => (
  <style jsx>
    {`
        svg {
            background-color: light-yellow;
            // border: solid;
            // height: 400px;
        }

        .stroke {
            fill: none;
            stroke: #fba850;

            // stroke-dasharray: 1600;
            stroke-dasharray: 700;
            stroke-width: 5;
            stroke-miterlimit:10;
        }

        .backwards {
            stroke-dashoffset: -700;
        }

        .forwards {
            stroke-dashoffset: 700;
        }
    `}
  </style>
);

const StylesGlobal = () => (
  <style global jsx>
    {`
        body {
            background: light-gray;
        }
    `}
  </style>
);

LinePatternAnimation.propTypes = {
  repeat: PropTypes.bool,
};

LinePatternAnimation.defaultProps = {
  repeat: false,
};

export default LinePatternAnimation;
