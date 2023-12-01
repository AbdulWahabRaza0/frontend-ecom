import { gql } from "@apollo/client";
export const GET_ALL_PRODUCTS = gql`
  query getAlltheProducts {
    products {
      data {
        id
        attributes {
          name
          description
          price
          images {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query findProductById($productId: ID) {
    product(id: $productId) {
      data {
        attributes {
          name
          images {
            data {
              attributes {
                url
              }
            }
          }
          price
          description
        }
      }
    }
  }
`;
