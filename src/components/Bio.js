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
            width: rhythm(3),
            height: rhythm(3),
          }}
        />
        <p style={{ maxWidth: 410 }}>
          Personal blog by <a href="https://twitter.com/RozenMD">Max Rozen</a>.{' '}
          <div>
            I'm a Software Engineer that runs an automated GraphQL testing
            service called <a href="https://onlineornot.com">OnlineOrNot</a>.
          </div>
        </p>
      </div>
    )
  }
}

export default Bio
