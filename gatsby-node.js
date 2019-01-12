const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

const createTagPages = (createPage, posts) => {
  const tagPageTemplate = path.resolve(`src/templates/tags.js`)
  const allTagsTemplate = path.resolve(`src/templates/all-tags.js`)

  const postsByTags = {}

  posts.forEach(({ node }) => {
    if (node.frontmatter.tags) {
      node.frontmatter.tags.forEach(tag => {
        if (!postsByTags[tag]) {
          postsByTags[tag] = []
        }
        postsByTags[tag].push(node)
      })
    }
  })

  const tags = Object.keys(postsByTags)

  createPage({
    path: `/tags`,
    component: allTagsTemplate,
    context: {
      tags: tags.sort(),
    },
  })

  tags.forEach(tagName => {
    const posts = postsByTags[tagName]

    createPage({
      path: `/tags/${tagName}`,
      component: tagPageTemplate,
      context: {
        posts,
        tagName,
      },
    })
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              sort: { fields: [frontmatter___date], order: DESC }
              limit: 1000
            ) {
              edges {
                node {
                  fields {
                    slug
                  }
                  frontmatter {
                    path
                    tags
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges
        createTagPages(createPage, posts)
        _.each(posts, (post, index) => {
          const previous =
            index === posts.length - 1 ? null : posts[index + 1].node
          const next = index === 0 ? null : posts[index - 1].node

          createPage({
            path: post.node.frontmatter.path,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
