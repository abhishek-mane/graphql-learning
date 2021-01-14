import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typedefs";

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => console.log(`GraphQL Service running on ${url}`));
