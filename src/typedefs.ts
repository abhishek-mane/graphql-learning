import { gql } from "apollo-server";

export const typeDefs = gql`
  type Account {
    account_id: Int
    limit: Int
    products: [String]
  }

  type Customer {
    username: String
    name: String
    address: String
    birthdate: String
    email: String
    active: Boolean
    accounts: [Int]
  }

  type TotalBuys {
    username: String!
    account_id: Int!
    amount: Int!
  }

  type TotalSells {
    username: String!
    account_id: Int!
    amount: Int!
  }

  type Query {
    getAccount(id: Int!): Account
    getAccounts(skip: Int = 0, limit: Int = 10): [Account]

    getCustomer(username: String!): Customer
    getCustomers(skip: Int = 0, limit: Int = 10): [Customer]

    getTotalBuys(username: String!): [TotalBuys]
    getTotalSells(username: String!): [TotalSells]
  }
`;
