import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface Post {
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  author: {
    name: string;
    bio: string;
    photo: {
      url: string;
    };
  };
  createdAt: string;
  slug: string;
  content: {
    raw: string;
  };
  categories: {
    name: string;
    slug: string;
  }[];
}

interface PostEdge {
  cursor: string;
  node: Post;
}

interface PostsConnection {
  edges: PostEdge[];
}

interface FeaturedPost {
  author: {
    name: string;
    photo: {
      url: string;
    };
  };
  featuredImage: {
    url: string;
  };
  title: string;
  slug: string;
  createdAt: string;
}

interface Category {
  name: string;
  slug: string;
}

const useGraphQLRequest = () => {
  const makeRequest = async (query, variables) => {
    try {
      const response = await request(graphqlAPI, query, variables);
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const getPosts = async (startIndex, endIndex): Promise<Post[] | null> => {
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

  const getPostDetails = async (slug): Promise<Post[] | null> => {
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

  const getAuthorDetails = async (slug): Promise<Author[] | null> => {
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

    const variables = { createdAt, slug };
    const response = await request(graphqlAPI, query, { createdAt, slug });

    return {
      next: result.next[0],
      previous: result.previous[0],
    };
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

  const getComments = async (slug) => {
    const query = gql`
      query GetComments($slug: String!) {
        comments(where: { post: { slug: $slug } }) {
          name
          createdAt
          comment
        }
      }
    `;
    const variables = { slug };
    const response = await makeRequest(query, variables);
    if (response && response.comments) {
      return response.comments;
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
    getComments,
  };
};
export default useGraphQLRequest;

