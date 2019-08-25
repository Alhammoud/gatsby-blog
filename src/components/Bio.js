import React from 'react'
import profilePic from './profile-pic.jpg'
import { rhythm } from '../utils/typography'
import { Link } from 'gatsby'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2),
        }}
      >
        <img
          src={profilePic}
          alt={`Max Rozen`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
            borderRadius: '50%',
          }}
        />
        <p style={{ maxWidth: 310 }}>
          Thoughts on business, software, and marketing by{' '}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/RozenMD"
          >
            Max Rozen
          </a>{' '}
          [<Link to="/about">About</Link>]
        </p>
      </div>
    )
  }
}

export default Bio
