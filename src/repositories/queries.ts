import { gql } from '@apollo/client';

export const GET_USERS = gql`
    query users {
        users {
            id
        }
    }
`

export const GET_POSTS_BY_PAGE = gql`
    query postsByPage ($page: String!, $category: String) {
        postsByPage(page: $page, category: $category) {
            data {
                id
                author
                comments
                content
                date
                slug
                title
                type
                blog_categories {
                    name
                    slug
                }
                image {
                    width
                    height
                    url
                }
            }

            categories {
                name
                slug
                count
            }
        }
    }
`

export const CREATE_TODO = gql`
  mutation createTodo($title: String!, $user_id: String!) {
    insert_todos(objects: {user_id: $user_id, title: $title }) {
      affected_rows
    }
  }  
`

export const GET_TODOS = gql`
  query todos {
    todos {
      id
      title
      is_completed
    }
  }
`