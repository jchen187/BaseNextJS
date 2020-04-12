import React from 'react';
import PropTypes from 'prop-types';

import styles from './Image.module.scss';

function Image(props) {
  const {
    alt,
    defaultSrc,
    mobile,
    tablet,
    desktop,
  } = props;

  return (
    <>
    <div className={styles.imageContainer}>
      <picture>
        <source media="(min-width: 900px)" srcset={desktop || defaultSrc} />
        <source media="(min-width: 600px)" srcset={tablet || defaultSrc} />
        <img className={styles.image} src={mobile || defaultSrc} alt={alt} />
      </picture>
    </div>
    </>
  );
}

Image.propTypes = {
  alt: PropTypes.string,
  defaultSrc: PropTypes.string.isRequired,
  mobile: PropTypes.string,
  tablet: PropTypes.string,
  desktop: PropTypes.string,
};

Image.defaultProps = {
  alt: 'Image file name?',
};

export default Image;
