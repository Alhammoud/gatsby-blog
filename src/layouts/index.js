import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import {
  faLinkedinIn,
  faGithub,
  faTwitter,
} from '@fortawesome/fontawesome-free-brands'
import './all.sass'

const Header = () => (
  <div className="container" style={{ padding: '10px', color: 'black' }}>
    <div className="columns is-mobile">
      <div className="column is-offset-one-quarter is-half">
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <li key={0} style={{ padding: '15px' }}>
            <Link style={{ fontSize: '1.5em' }} to="/">
              HOME
            </Link>
          </li>
          <li key={1} style={{ padding: '15px' }}>
            <a target="_blank" href="https://www.twitter.com/rozenmd">
              <FontAwesomeIcon size={'2x'} icon={faTwitter} />
            </a>
          </li>
          <li key={2} style={{ padding: '15px' }}>
            <a target="_blank" href="https://www.linkedin.com/in/rozenmd">
              <FontAwesomeIcon size={'2x'} icon={faLinkedinIn} />
            </a>
          </li>
          <li key={3} style={{ padding: '15px' }}>
            <a target="_blank" href="https://github.com/rozenmd">
              <FontAwesomeIcon size={'2x'} icon={faGithub} />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Max Rozen - Software Engineer"
      meta={[
        {
          name: 'description',
          content: `Max Rozen's blog on all things Software Engineering, Photography, Travel and more. `,
        },
        {
          name: 'keywords',
          content:
            'Max Rozen, Software Engineer, Blog, JavaScript, TypeScript, Python, Data Engineering, Travel',
        },
      ]}
    />
    <Header />
    <div
      style={{
        width: '100%',
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
