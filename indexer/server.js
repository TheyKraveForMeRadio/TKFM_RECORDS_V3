import { ApolloServer } from "@apollo/server";
import { startIndexer } from "./indexer.js";

const db = {
  catalogs: [],
  pools: [],
  investors: []
};

startIndexer(db);

const resolvers = {
  Query:{
    catalogs:()=>db.catalogs,
    pools:()=>db.pools,
    investors:()=>db.investors
  }
};

const server = new ApolloServer({
  typeDefs:await Bun.file("./schema.graphql").text(),
  resolvers
});

server.listen({port:4000}).then(()=>{
  console.log("GraphQL running");
});
