import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import Footer from '../components/Footer'
import { formatReadingTime } from '../utils/helpers'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <Bio />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.frontmatter.path
          return (
            <div key={node.frontmatter.path}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.frontmatter.path}>
                  {title}
                </Link>
              </h3>
              <small>
                {node.frontmatter.date}
                {` • ${formatReadingTime(node.timeToRead)}`}
              </small>
              <p
                dangerouslySetInnerHTML={{ __html: node.frontmatter.excerpt }}
              />
            </div>
          )
        })}
        <Footer />
      </Layout>
    )
  }
}

export default BlogIndex

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
