import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const useGraphQLRequest = () => {
  const makeRequest = async (query, variables) => {
    try {
      const response = await request(graphqlAPI, query, variables);
      return response;
      console.log("response", response);
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPosts = async (startIndex, endIndex) => {
    const query = gql`
      query Assets($first: Int!, $skip: Int!) {
        postsConnection(first: $first, skip: $skip) {
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
    const variables = { first: endIndex - startIndex, skip: startIndex };
    const response = await makeRequest(query, variables);

    if (response && response.postsConnection.edges) {
      return response.postsConnection.edges;
    }
  };

  const getPostDetails = async (slug) => {
    const query = gql`
      query GetPostDetails($slug: String!) {
        post(where: { slug: $slug }) {
          title
          excerpt
          featuredImage {
            url
          }
          author {
            name
            bio
            photo {
              url
            }
          }
          createdAt
          slug
          content {
            raw
          }
          categories {
            name
            slug
          }
        }
      }
    `;

    const variables = { slug };
    const response = await makeRequest(query, variables);
    if (response && response.post) {
      return response.post;
    }
  };

  const getAuthorDetails = async (slug) => {
    const query = gql`
      query GetAuthorDetails($slug: String!) {
        post(where: { slug: $slug }) {
          title
          excerpt
          featuredImage {
            url
          }
          author {
            name
            bio
            photo {
              url
            }
            createdAt
          }
          createdAt
          slug
          content {
            raw
          }
          categories {
            name
            slug
          }
        }
      }
    `;
    const variables = { slug };
    const response = await makeRequest(query, variables);
    if (response && response.post.author) {
      return response.post.author;
    }
  };

  const getAdjacentPosts = async (createdAt, slug) => {
    const query = gql`
      query GetAdjacentPosts($createdAt: DateTime!, $slug: String!) {
        next: posts(
          first: 1
          orderBy: createdAt_ASC
          where: { slug_not: $slug, AND: { createdAt_gte: $createdAt } }
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
        previous: posts(
          first: 1
          orderBy: createdAt_DESC
          where: { slug_not: $slug, AND: { createdAt_lte: $createdAt } }
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const variables = { next: res.next, previous: res.previous };
    const response = await makeRequest(query, variables);
    if (response && response.post.author) {
      return response.post.author;
    }
  };

  const getFeaturedPosts = async () => {
    const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

    const response = await makeRequest(query, {});

    if (response && response.posts) {
      return response.posts;
    } else {
      return null;
    }
  };

  const getCategoryPost = async (slug) => {
    const query = gql`
      query GetCategoryPost($slug: String!) {
        postsConnection(where: { categories_some: { slug: $slug } }) {
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

    const variables = { slug };
    const response = await makeRequest(query, variables);

    if (response && response.postsConnection.edges) {
      return response.postsConnection.edges;
    } else {
      return null;
    }
  };

  const getCategories = async () => {
    const query = gql`
      query GetCategories {
        categories {
          name
          slug
        }
      }
    `;

    const response = await makeRequest(query, {});
    if (response && response.categories) {
      return response.categories;
    } else {
      return null;
    }
  };

  const getSimilarPost = async (categories, slug) => {
    const query = gql`
      query GetPostDetails($slug: String!, $categories: [String!]) {
        posts(
          where: {
            slug_not: $slug
            AND: { categories_some: { slug_in: $categories } }
          }
          last: 3
        ) {
          title
          featuredImage {
            url
          }
          createdAt
          slug
        }
      }
    `;
    const variables = { slug, categories };
    const response = await makeRequest(query, { variables });
    if (response && response.posts) {
      return response.posts;
    } else {
      return null;
    }
  };

  const getRecentPosts = async () => {
    const query = gql`
    query GetPostDetails() {
     posts(
       orderBy: createdAt_ASC
       last: 3
     ) {
       title
       featuredImage {
         url
       }
       createdAt
       slug
     }
   }
`;
    const response = await makeRequest(query, {});
    if (response && response.posts) {
      return response.posts;
    } else {
      return null;
    }
  };

  return {
    getPosts,
    getPostDetails,
    getAuthorDetails,
    getAdjacentPosts,
    getFeaturedPosts,
    getCategoryPost,
    getCategories,
    getSimilarPost,
    getRecentPosts,
  };
};
export default useGraphQLRequest;
