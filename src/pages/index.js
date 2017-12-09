import React from 'react'
import Link from 'gatsby-link'

const sortByDate = (arr, reverse = false, fieldname) => {
  return arr.sort((a, b) => {
    if (
      new Date(a.node.frontmatter[fieldname]) <
      new Date(b.node.frontmatter[fieldname])
    ) {
      return reverse ? 1 : -1
    }
    if (
      new Date(a.node.frontmatter[fieldname]) >
      new Date(b.node.frontmatter[fieldname])
    ) {
      return reverse ? -1 : 1
    }
    return 0
  })
}

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  sortByDate(posts, true, 'date')
  return (
    <div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div key={new Date(frontmatter.date)}>
            <h2 className={'project-title'}>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
            <p>
              Tags:{' '}
              {post.frontmatter.tags.map((tag, i) => {
                return (
                  <span key={i} style={{ display: 'inline' }}>
                    <Link to={`/tags/${tag}`}>#{tag}</Link>{' '}
                  </span>
                )
              })}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            path
            title
            tags
            excerpt
          }
        }
      }
    }
  }
`
export default IndexPage
