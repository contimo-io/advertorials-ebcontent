const { request, gql } = require("graphql-request");
require("dotenv").config();

const query = gql`query GetPublishedCampaignsList($publisherId: MongoID!) {
    campaigns: PublishedCampaigns(filter: { publisherId: $publisherId }) {
      _id
      stage
      publisherId
      publicationDate
      landingpage
      slug
      article {
        content {
          coverImage
          headline
          teaser
          contentHtml
        }
      }
      advertiser {
        _id
        name
        image
        slug
      }
    }
  }`;

async function getAllCampaigns() {
  //TODO: add pagination or load each article separately
  const data = await request(
    process.env.GRAPHQL_ENDPOINT,
    query,
    {
      publisherId: process.env.PUBLISHER_ID
    });

  return data.campaigns;
}


module.exports = getAllCampaigns();