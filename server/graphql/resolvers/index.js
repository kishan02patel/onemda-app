import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Participant from "./Participant/";

const resolvers = [User, Participant];

export default resolvers

// mergeTypes(resolvers, { all: true });