const dotenv = require("dotenv");
const { ApolloServer, gql } = require("apollo-server");

dotenv.config();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Creator {
    id: String
    name: String
    description: String
    platform: String
    url: String
    thumbnail: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    creators(name: String!): [Creator]
  }
`;

const creators = [
  {
    id: "123456789",
    name: "Ben",
    description: "Some random youtuber",
    platform: "Youtube",
    url: "https://www.youtube.co.uk/watson",
    thumbnail: "https://via.placeholder.com/150",
  },
  {
    id: "987654321",
    name: "Camilo Ruiz",
    description: "Something",
    platform: "Twitter",
    url: "https://www.twitter.com/camiloruiz",
    thumbnail: "https://via.placeholder.com/150",
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    creators(parent, args, context, info) {
      const { name } = args;
      return creators.filter((a) => a.name == name);
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
