import { Link, graphql } from 'gatsby'
import { formatPostDate, formatReadingTime } from '../utils/helpers'

import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import get from 'lodash/get'
import { rhythm } from '../utils/typography'

class About extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
        </aside>
        <main>
          <p>
            My Name is Max Rozen. I studied what's known as a double degree in
            Software Engineering and Commerce.
          </p>
          <p>
            I began my career thinking I would work in Investment Banking, only
            to find jobs hard to come by in a post credit crisis world. I ended
            up building data pipelines for hedge funds and family offices,
            before learning web development as a means to display financial data
            in interesting ways.
          </p>
          <p>
            More recently, I became interested in building online businesses,
            having built and launched 3 so far.
          </p>

          <h2>Some things I have done</h2>
          <ul>
            <li>
              <p>
                OnlineOrNot was a paid GraphQL testing and uptime monitoring
                service from 2018-10-01 to 2019-10-01 that tested GraphQL
                queries for correctness and performance.
              </p>
              <p>
                As of 2019-10-01 OnlineOrNot became an{' '}
                <a href="https://onlineornot.com">Uptime Monitoring Service</a>{' '}
                for websites.
              </p>
            </li>
            <li>
              <strong>Consulting</strong> - I help businesses with advice on
              front-end web development: whether that's Design Systems, webpack
              performance, CI/CD, SEO, content marketing or basic blog
              development.
            </li>
            <li>
              <a href="https://jobsok.io">Jobs? Ok!</a> was a job board
              aggregator where companies could pay extra to be featured.
            </li>
            <li>
              Appointment Scheduler was an online service for booking
              appointments with busy professionals (think consultants, hair
              stylists, etc)
            </li>
          </ul>
        </main>
        <Footer />
      </Layout>
    )
  }
}

export default About

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
