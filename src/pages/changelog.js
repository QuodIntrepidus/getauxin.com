import React, { useState, useEffect } from "react"
import { graphql, StaticQuery } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import "../utils/normalize.css"
import "../utils/css/screen.css"

const axios = require("axios")

const ChangelogPage = ({ data }, location) => {
  const siteTitle = data.site.siteMetadata.title
  const [changelogs, setChangelogs] = useState()
  useEffect(() => {
    ;(async () => {
      const result = await axios("http://api.getauxin.com/changelog/")
      console.log(result)
      setChangelogs(result.data.data)
    })()
  }, [])

  return (
    <Layout title={siteTitle}>
      <SEO title="Changelog" keywords={[`changelog`, `logs`]} />

      <article className="post-content page-template no-image">
        <div className="post-content-body">
          <h2 id="clean-minimal-and-deeply-customisable-london-is-a-theme-made-for-people-who-appreciate-simple-lines-">
            Changelog
          </h2>
          {changelogs.map(changelog => {
            return (
              <div style={{ border: "2px solid #1d1d1f", padding: 15 }}>
                <h6>{changelog.title}</h6>
                <span style={{ color: "#2997FF", fontSize: 16 }}>
                  {changelog.date.toLocaleString("en-US")}
                </span>
                <br />
                <br />
                <span
                  style={{
                    background: "white",
                    padding: "5px",
                    color: "black",
                    textTransform: "lowercase",
                  }}
                >
                  {changelog.category}
                </span>
                <span
                  style={{
                    background: "black",
                    padding: "5px",
                    color: "white",
                  }}
                >
                  {changelog.reference}
                </span>
                <div id="code">
                  <pre>
                    <code>{changelog.details}</code>
                  </pre>
                </div>
                <span style={{ color: "#2997FF", fontSize: 16 }}>
                  {changelog.author}
                </span>
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

const indexQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
/* benchAccounting: file(
  relativePath: { eq: "bench-accounting-49909-unsplash.jpg" }
  ) {
    childImageSharp {
      fluid(maxWidth: 1360) {
        ...GatsbyImageSharpFluid
      }
    }
  }
*/

export default props => (
  <StaticQuery
    query={indexQuery}
    render={data => (
      <ChangelogPage location={props.location} data={data} {...props} />
    )}
  />
)
