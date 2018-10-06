import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  render() {
    const { data, location, pathContext } = this.props
    const { markdownRemark: post } = data
    const { frontmatter, html } = post
    const { title, date, excerpt, canonical } = frontmatter
    const { next, prev } = pathContext
    const canonicalLink = canonical
      ? canonical
      : `https://maxrozen.com${location.pathname}`
    return (
      <section className="section">
        <div className="content">
          <Helmet
            title={`${title} - Max Rozen's Blog`}
            meta={[{ name: 'description', content: excerpt }]}
          >
            <link rel="canonical" href={`${canonicalLink}`} />
          </Helmet>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <h1>{title}</h1>
              <h4>{date}</h4>
            </div>
            <div dangerouslySetInnerHTML={{ __html: html }} />
            <hr />
            <p>
              {prev && (
                <Link to={prev.frontmatter.path}>
                  Previous: {prev.frontmatter.title}
                </Link>
              )}
            </p>
            <p>
              {next && (
                <Link to={next.frontmatter.path}>
                  Next: {next.frontmatter.title}
                </Link>
              )}
            </p>
          </div>
        </div>
      </section>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "DD MMMM, YYYY")
        path
        tags
        excerpt
        canonical
      }
    }
  }
`
export default Template
