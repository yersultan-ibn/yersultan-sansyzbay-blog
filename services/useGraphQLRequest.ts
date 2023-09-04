import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export interface Post {
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
interface AdjacentPost {
  title: string;
  featuredImage: {
    url: string;
  };
  createdAt: string;
  slug: string;
}

interface AdjacentPosts {
  next: AdjacentPost | null;
  previous: AdjacentPost | null;
}

interface Author {
  bio: string;
  name: string;
  id: string;
  photo: {
    url: string;
  };
}

interface Category {
  name: string;
  slug: string;
}

interface Post {
  title: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  author: Author;
  createdAt: string;
  slug: string;
  content: {
    raw: string;
  };
  categories: Category[];
}

interface Comment {
  name: string;
  createdAt: string;
  comment: string;
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
            posts {
              slug
              title
              excerpt
              author {
                bio
                name
                id
                photo {
                  url
                }
              }
              featuredImage {
                url
              }
              categories {
                name
                slug
              }
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
    if (response && response.post.author) {
      return response.post.author;
    }
  };

  const getAdjacentPosts = async (
    createdAt: string,
    slug: string
  ): Promise<AdjacentPosts> => {
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

  const getFeaturedPosts = async (): Promise<FeaturedPost> => {
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

  const getCategoryPost = async (slug: string) => {
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

  const getCategories = async (): Promise<Category[] | null> => {
    const query = gql`
      query GetCategories {
        categories {
          name
          slug
          createdAt
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

  const getSimilarPost = async (
    categories: string[],
    slug: string
  ): Promise<Post[] | null> => {
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

  const getRecentPosts = async (): Promise<Post[] | null> => {
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

  const getComments = async (slug: string): Promise<Comment[] | null> => {
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
