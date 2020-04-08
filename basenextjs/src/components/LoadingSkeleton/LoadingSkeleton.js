import ContentLoader, { Code, List } from 'react-content-loader';
import React from 'react';
import PropTypes from 'prop-types';

import styles from './LoadingSkeleton.module.scss';

class LoadingSkeleton extends React.Component {
  render() {
    return (
      <>
        <ContentLoader viewBox="0 0 1000 200">
            {/* Only SVG shapes */}
            <rect x="10" y="10" rx="4" ry="4" width="80" height="20" />
            <rect x="100" y="10" rx="4" ry="4" width="60" height="20" />
            <rect x="10" y="40" rx="8" ry="8" width="400" height="40" />

            <rect x="10" y="100" rx="3" ry="3" width="700" height="15" />
            <rect x="10" y="120" rx="3" ry="3" width="600" height="15" />
            <rect x="10" y="140" rx="3" ry="3" width="550" height="15" />
          </ContentLoader>
      </>
    );
  }
}

LoadingSkeleton.propTypes = {
};

LoadingSkeleton.defaultProps = {
};

export default LoadingSkeleton;
