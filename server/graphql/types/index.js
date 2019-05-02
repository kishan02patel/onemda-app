
import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Participant from "./Participant";

const typeDefs = [User, Participant];

export default mergeTypes(typeDefs, { all: true });