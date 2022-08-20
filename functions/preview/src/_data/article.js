const { request, gql } = require("graphql-request");
require("dotenv").config();

const query = gql`query($id: MongoID!) {
  article: ArticleById(_id: $id) {
    campaign {
      name
      trackingTag {
        tagType
        tagURL
      }
      landingpage
      advertiser {
        name
        image
      }
    }
    versionNumber
    content {
      headline
      teaser
      coverImage
      contentHtml
    }
  }
}
`;

async function getArticle(configData) {
  const id = configData?.eleventy?.serverless?.path?.id;
  if (!id) {
    return null;
  }

  let content = configData?.eleventy?.serverless?.query?.content;
  // Content overriding through URL. 
  // FIXME: consider adding security hash to prevent content spoofing
  if (content) {
    try { 
      content = JSON.parse(content);
    } catch (err) {
      // Ignore not valid input
    }
  }

  

  const { article } = await request(process.env.GRAPHQL_ENDPOINT, query, { id });

  if (content) {
    article.versionNumber = `${article.versionNumber} NOT SAVED`;
    Object.assign(article.content, content);
  }
  
  return article;
}


module.exports = getArticle;