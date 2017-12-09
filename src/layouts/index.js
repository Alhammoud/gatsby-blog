import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import ReactGA from 'react-ga'
ReactGA.initialize('UA-42211308-2')

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './clean-blog.css'
import './custom.css'
import fontawesome from '@fortawesome/fontawesome'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { faLinkedinIn, faGithub } from '@fortawesome/fontawesome-free-brands'

const Header = () => (
  <div className="container">
    <h1 className="home-title">Max Rozen</h1>
    <div>
      <ul className="home-nav">
        <li key={0}>
          <Link className="custom-link" to="/">
            HOME
          </Link>
        </li>
        <li key={1}>
          <Link className="custom-link" to="/about">
            ABOUT
          </Link>
        </li>
        <li key={2}>
          <a target="_blank" href="https://www.linkedin.com/in/rozenmd">
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
        </li>
        <li key={3}>
          <a target="_blank" href="https://github.com/rozenmd">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
      </ul>
    </div>

    <div className="divider" />
  </div>
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
