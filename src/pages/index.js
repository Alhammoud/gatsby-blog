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
    <div className="content">
      <div className="columns is-mobile">
        <div className="column">
          <div>Hey there.</div>
          <div>
            I'm{' '}
            <a target="_blank" href="https://www.twitter.com/rozenmd">
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
            <a target="_blank" href="https://medium.com/@RozenMD">
              write.
            </a>
          </div>
          <div>
            <hr />
            <p className={'title'}>Posts</p>
          </div>
          {posts.map(({ node: post }) => {
            const { frontmatter } = post
            return (
              <div className="column">
                <div className={'block'} key={new Date(frontmatter.date)}>
                  <p style={{ fontSize: '13px', marginBottom: '5px' }}>
                    {frontmatter.date}
                  </p>
                  <p className={'subtitle is-4'}>
                    <Link to={frontmatter.path}>{frontmatter.title}</Link>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
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
            date(formatString: "DD MMM YYYY")
            path
            title
          }
        }
      }
    }
  }
`
export default IndexPage
