import { Link, graphql } from 'gatsby'
import { formatPostDate, formatReadingTime } from '../utils/helpers'

import Bio from '../components/Bio'
import Footer from '../components/Footer'
import Layout from '../components/Layout'
import React from 'react'
import SEO from '../components/SEO'
import get from 'lodash/get'
import { rhythm } from '../utils/typography'

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }) => {
            const title =
              get(node, 'frontmatter.title') || node.frontmatter.path
            return (
              <article key={node.frontmatter.path}>
                <header>
                  <h3
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none' }}
                      to={node.frontmatter.path}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <small>
                    {formatPostDate(node.frontmatter.date)}
                    {` • ${formatReadingTime(node.timeToRead)}`}
                  </small>
                </header>
                <p
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.excerpt }}
                />
              </article>
            )
          })}
        </main>
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndexTemplate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          timeToRead
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            path
            excerpt
          }
        }
      }
    }
  }
`
