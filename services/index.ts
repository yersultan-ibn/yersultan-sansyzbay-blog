import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const gqlPosts = gql`
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

const gqlGetSimilarPosts = gql`
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

const gqlGetRecentPosts = gql`
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

export const gqlGetCategories = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
`;

export const getPosts = async (startIndex, endIndex) => {
  try {
    const res = await request(graphqlAPI, gqlPosts, {
      first: endIndex - startIndex, // Количество элементов на странице
      skip: startIndex, // Сколько элементов пропустить
    });

    return res.postsConnection.edges;
  } catch (error) {
    console.error(error);
  }
};

export async function getSimilarPost(categories, slug) {
  try {
    const res = await request(graphqlAPI, gqlGetSimilarPosts, {
      slug,
      categories,
    });
    return res.posts;
  } catch (err) {
    console.log(err);
  }
}
export async function getRecentPosts() {
  try {
    const res = await request(graphqlAPI, gqlGetRecentPosts);
    return res.posts;
  } catch (err) {
    console.log(err);
  }
}
export async function getCategories() {
  try {
    const res = await request(graphqlAPI, gqlGetCategories);
    return res.categories;
  } catch (err) {
    console.log(err);
  }
}
