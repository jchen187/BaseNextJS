<% if (npmModules.includes('lodash')) { -%>
import _ from 'lodash';
<% } -%>
<% if (npmModules.includes('classnames')) { -%>
import classNames from 'classnames';
<% } -%>
<% if (npmModules.includes('proptypes')) { -%>
import propTypes from 'prop-types';
<% } -%>
<% if (npmModules.includes('react')) { -%>
import React from 'react';
<% } -%>
<% if (npmModules.includes('redux')) { -%>
import { Provider } from 'react-redux';
<% } -%>
<% if (enableCustomStyles) { -%>

import styles from './styles.scss';
<% } -%>

<% if (componentType === 'dumbComponent') { -%>
const <%= componentName %> = (props) => {
  const {
<% props.map(prop => { -%>
    <%= prop.propName %>,
<% }) -%>
  } = props;

  return (
    <React.Fragment>
<% if (enableCustomStyles && npmModules.includes('classnames')) { -%>
      <div className={classNames(styles.example, styles.example2)}</div>
<% } else { -%>
      <div></div>
<% } -%>

    </React.Fragment>
  )
}
<% } else { -%>
class <%= componentName %> => extends React.Component {
  constructor() {
    super(props);
    const {
<% props.map(prop => { -%>
      <%= prop.propName %>,
<% }) -%>
    } = props;

    this.state = {
    }
  }

  componentDidMount() {
<% if (npmModules.includes('gsap')) { -%>
    const GSAP = require('gsap/TweenMax');
    const { TimelineMax, Power2 } = GSAP;
    const tl = new TimelineMax();
<% } -%>
  }

  render() {
    return (
      <React.Fragment>
      </React.Fragment>
    )
  }
}
<% } -%>

<% if (props.find(prop => prop.propType)) { -%>
<%= componentName %>.propTypes = {
<% props.filter(prop => prop.propType).map(prop => { -%>
  <%= prop.propName %>: PropTypes.<%= prop.propType %>,
<% }) -%>
}
<% } -%>

<% if (props.find(prop => prop.defaultValue)) { -%>
<%= componentName %>.defaultProps = {
<% props.filter(prop => prop.defaultValue).map(prop => { -%>
  <%= prop.propName %>: <%- prop.defaultValue %>,
<% }) -%>
}
<% } -%>

export default <%= componentName %>;
