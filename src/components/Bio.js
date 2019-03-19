import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Max Rozen`}
          style={{
            borderRadius: '50%',
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(4),
            height: rhythm(4),
          }}
        />
        <p style={{ maxWidth: 630 }}>
          Thoughts by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/RozenMD"
          >
            Max Rozen
          </a>
          .
          <div>
            Passionate about{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/rozenmd/"
            >
              GraphQL and Frontend
            </a>
            .
          </div>
          <div>
            I also run{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://onlineornot.com"
            >
              OnlineOrNot
            </a>
            , a GraphQL testing service.
          </div>
        </p>
      </div>
    )
  }
}

export default Bio
