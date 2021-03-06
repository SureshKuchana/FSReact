import { GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { listings } from './listings';

const Listing = new GraphQLObjectType({
    name: 'Listing',
    fields: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        image: { type: GraphQLNonNull(GraphQLString) },
        address: { type: GraphQLNonNull(GraphQLString) },
        price: { type: GraphQLNonNull(GraphQLInt) },
        numOfGuests: { type: GraphQLNonNull(GraphQLInt) },
        numOfBeds: { type: GraphQLNonNull(GraphQLInt) },
        numOfBaths: { type: GraphQLNonNull(GraphQLInt) },
        rating: { type: GraphQLNonNull(GraphQLInt) },
    }
})

const query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => "Hello from Query"
        },
        listings: {
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(Listing))),
            resolve: () => listings
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        hello: {
            type: GraphQLString,
            resolve: () => "Hello from Mutation"
        },
        deleteListing: {
            type: GraphQLNonNull(Listing),
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve: (_root, { id }) => {
                for (let i = 0; i < listings.length; i++) {
                    if (listings[i].id === id) {
                        console.log(id, listings.splice(i, 1));
                        return listings.splice(i, 1)[0];
                    }
                }

                throw new Error(' failed to Delete listing ')
            }
        }
    }
});




export const schema = new GraphQLSchema({ query, mutation });