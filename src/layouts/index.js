import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-42211308-2')

import './index.css'

const Header = () => (
  <ul className="home-nav">
    <li key={0}>
      <Link to="/">Home</Link>
    </li>
    <li key={1}>
      <a target="_blank" href="https://www.linkedin.com/in/rozenmd">
        LinkedIn
      </a>
    </li>
    <li key={2}>
      <a target="_blank" href="https://github.com/rozenmd">
        GitHub
      </a>
    </li>
  </ul>
)

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Max Rozen - Software Engineer - Portfolio"
      meta={[
        {
          name: 'description',
          content: 'Max Rozen - Software Engineer - Blog',
        },
        { name: 'keywords', content: 'Max Rozen, Software Engineer, Blog' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
