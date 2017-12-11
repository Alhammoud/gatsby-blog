import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Disqus from '../components/Disqus'
const Template = ({ data, location, pathContext }) => {
  const { markdownRemark: post } = data
  const { frontmatter, html } = post
  const { title, date } = frontmatter
  const { next, prev } = pathContext
  const config = {
    disqusShortname: 'rozenmd',
    disqusUrlPrefix: 'maxrozen.com',
  }
  return (
    <div>
      <Helmet title={`${title} - My Blog`} />

      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <Disqus
          shortname={config.disqusShortname}
          title={title}
          url={`${config.disqusUrlPrefix}${location.pathname}`}
        />

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
  )
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
      }
    }
  }
`
export default Template
