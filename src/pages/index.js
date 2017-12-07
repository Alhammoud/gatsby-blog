import React from "react"
import Link from "gatsby-link"

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div key={post.id}>
            <h2 className={"project-title"}>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
            <p>{frontmatter.date}</p>
            <p>{frontmatter.excerpt}</p>
            <p>
              Tags:{" "}
              {post.frontmatter.tags.map((tag, i) => {
                return <Link to={`/tags/${tag}`}>#{tag} </Link>
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
