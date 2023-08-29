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
  console.log("submitComment", submitComment);
};

export const getComments = async (slug) => {
  try {
    const res = await request(graphqlAPI, gqlGetComments, { slug });
    // return res.comments;
    return console.log(
      "getCommentsgetCommentsgetCommentsgetCommentsgetComments",
      res.comments
    );
  } catch (err) {
    console.log(err);
  }
};

export const getPosts = async (startIndex, endIndex) => {
  try {
    const res = await request(graphqlAPI, gqlPosts, {
      first: endIndex - startIndex,
      skip: startIndex,
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
export async function getPostDetails(slug) {
  try {
    const res = await request(graphqlAPI, gqlGetPostDetails, { slug });
    return res.post;
  } catch (err) {
    console.log(err);
  }
}

export async function getAuthorDetails(slug) {
  try {
    const res = await request(graphqlAPI, gqlGetAuthorDetails, { slug });
    return res.post.author;
  } catch (err) {
    console.log(err);
  }
}
export async function getAdjacentPosts(createdAt, slug) {
  try {
    const res = await request(graphqlAPI, gqlGetAdjacentPosts, {
      slug,
      createdAt,
    });
    return { next: res.next, previous: res.previous };
  } catch (err) {
    console.log(err);
  }
}
export async function getFeaturedPosts() {
  try {
    const res = await request(graphqlAPI, gqlGetFeaturedPosts);
    return res.posts;
  } catch (err) {
    console.log(err);
  }
}
export async function getCategoryPost(slug) {
  try {
    const res = await request(graphqlAPI, gqlGetCategoryPost, { slug });
    return res.postsConnection.edges;
  } catch (err) {
    console.log(err);
  }
}
