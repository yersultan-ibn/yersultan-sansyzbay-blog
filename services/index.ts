import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const gqlPosts = gql`
  query Assets {
    postsConnection {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;

export const getPosts = async () => {
  try {
    const res = await request(graphqlAPI, gqlPosts);

    return res.postsConnection.edges;
  } catch (error) {
    console.error(error);
  }
};
