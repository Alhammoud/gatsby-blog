import React from 'react'
import Link from 'gatsby-link'

const AboutPage = () => {
  return (
    <div>
      <div className="row img-container">
        <div className="row about-text">
          <p className="lead" style={{ height: 'unset' }}>
            I'm a Software Engineer, interested in developing systems that move
            data around and assist in analysing it. While traditionally a Python
            backend developer, these days I spend most of my time between
            tweaking lambda functions, and building frontends in React + Redux.
          </p>

          <p style={{ height: 'unset' }}>
            In fact, this site is built using{' '}
            <a href="https://www.gatsbyjs.org/" target="_blank">
              Gatsby
            </a>, a React-based static website generator.
          </p>

          <hr />
          <p style={{ height: 'unset' }}>
            If you have any questions about me or you just want to get in touch,
            you can reach me at:
          </p>
          <p className="thick" style={{ height: 'unset' }}>
            <strong>
              <a href="https://www.linkedin.com/in/rozenmd" target="_blank">
                LinkedIn
              </a>
            </strong>
          </p>
          <p className="thick" style={{ height: 'unset' }}>
            <strong>
              <a href="https://twitter.com/mxrozen" target="_blank">
                Twitter
              </a>
            </strong>
          </p>
          <p className="thick" style={{ height: 'unset' }}>
            <strong>
              <a href="https://github.com/rozenmd" target="_blank">
                Github
              </a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
