import React from 'react'

import { rhythm } from '../utils/typography'

class Footer extends React.Component {
  render() {
    return (
      <footer
        style={{
          marginTop: rhythm(2.5),
          paddingTop: rhythm(1),
        }}
      >
        <div style={{ float: 'right' }}>
          <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
            rss
          </a>
        </div>
        <a
          href="https://twitter.com/rozenmd"
          target="_blank"
          rel="noopener noreferrer"
        >
          twitter
        </a>{' '}
        &bull;{' '}
        <a
          href="https://www.linkedin.com/in/rozenmd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin
        </a>{' '}
        &bull;{' '}
        <a
          href="https://github.com/rozenmd"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>{' '}
        &bull;{' '}
        <a
          href="https://stackoverflow.com/users/5175932/rozenmd"
          target="_blank"
          rel="noopener noreferrer"
        >
          stack overflow
        </a>
        <br />
        <div style={{ textAlign: 'center' }}>
          © Max Rozen 2015 - {new Date().getFullYear()}.
        </div>
      </footer>
    )
  }
}

export default Footer
