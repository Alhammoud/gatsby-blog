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
const sortByField = (arr, reverse = false, fieldname) => {
  return arr.sort((a, b) => {
    if (a.node.frontmatter[fieldname] < b.node.frontmatter[fieldname]) {
      return reverse ? 1 : -1
    }
    if (a.node.frontmatter[fieldname] > b.node.frontmatter[fieldname]) {
      return reverse ? -1 : 1
    }
    return 0
  })
}

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark
  sortByField(posts, true, 'path')
  return (
    <div>
      <div>Hey there.</div>
      <div>
        I'm{' '}
        <a target="_blank" href="https://www.twitter.com/mxrozen">
          Max
        </a>, and I'm a{' '}
        <a target="_blank" href="https://www.linkedin.com/in/rozenmd">
          software engineer
        </a>.
      </div>
      <div>
        I{' '}
        <a target="_blank" href="https://github.com/rozenmd">
          build things
        </a>, and occasionally{' '}
        <a target="_blank" href="https://medium.com/@MxRozen">
          write.
        </a>
      </div>
      {posts.map(({ node: post }) => {
        const { frontmatter } = post
        return (
          <div key={new Date(frontmatter.date)}>
            <h1>{frontmatter.date}</h1>
            <h2 className={'project-title'}>
              <Link to={frontmatter.path}>{frontmatter.title}</Link>
            </h2>
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
            date(formatString: "MMM DD")
            path
            title
          }
        }
      }
    }
  }
`
export default IndexPage
