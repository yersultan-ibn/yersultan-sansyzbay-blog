import { gql, request } from "graphql-request";

export const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

const gqlGetPosts = gql`
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

const gqlGetPostDetails = gql`
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

const gqlGetAuthorDetails = gql`
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

const gqlGetAdjacentPosts = gql`
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

const gqlGetFeaturedPosts = gql`
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

const gqlGetCategoryPost = gql`
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

const gqlGetComments = gql`
  query GetComments($slug: String!) {
    comments(where: { post: { slug: $slug } }) {
      name
      createdAt
      comment
    }
  }
`;

export const submitComment = async (obj) => {
  const result = await fetch("/api/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  });

  return result.json();
  console.log("result", result);
};

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

export async function getComments(slug) {
  try {
    const res = await request(graphqlAPI, gqlGetComments, { slug });
    return res.comments;
  } catch (err) {
    console.log(err);
  }
}

export const getPosts = async (startIndex, endIndex) => {
  const variables = { first: endIndex - startIndex, skip: startIndex };
  const response = await makeRequest(gqlGetPosts, variables);

  if (response && response.postsConnection.edges) {
    return response.postsConnection.edges;
  }
};

export async function getSimilarPost(categories, slug) {
  const variables = { slug, categories };
  const response = await makeRequest(gqlGetSimilarPosts, variables);

  if (response && response.posts) {
    return response.posts;
  }
}

export async function getRecentPosts() {
  const response = await makeRequest(gqlGetRecentPosts, {});

  if (response && response.posts) {
    return response.posts;
  }
}

export async function getCategories() {
  const response = await makeRequest(gqlGetCategories, {});

  if (response && response.categories) {
    return response.categories;
  }
}

export async function getPostDetails(slug) {
  const variables = { slug };
  const response = await makeRequest(gqlGetPostDetails, variables);

  if (response && response.post) {
    return response.post;
  }
}

export async function getAuthorDetails(slug) {
  const variables = { slug };
  const response = await makeRequest(gqlGetAuthorDetails, variables);

  if (response && response.post.author) {
    return response.post.author;
  }
}

export async function getAdjacentPosts(createdAt, slug) {
  const variables = { next: res.next, previous: res.previous };
  const response = await makeRequest(gqlGetAdjacentPosts, variables);

  if (response && response.post.author) {
    return response.post.author;
  }
}

export async function getFeaturedPosts() {
  const response = await makeRequest(gqlGetFeaturedPosts, {});

  if (response && response.posts) {
    return response.posts;
  }
}
export async function getCategoryPost(slug) {
  const variables = { slug };
  const response = await makeRequest(gqlGetCategoryPost, variables);

  if (response && response.postsConnection.edges) {
    return response.postsConnection.edges;
  }
}
