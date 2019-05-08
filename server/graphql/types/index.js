
import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Participant from "./Participant";
import Authentication from "./Authentication";

const typeDefs = [User, Participant, Authentication];

export default mergeTypes(typeDefs, { all: true });