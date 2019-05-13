
import { mergeTypes } from "merge-graphql-schemas";

import User from "./User/";
import Service from "./Service";
import Authentication from "./Authentication";

const typeDefs = [User, Service, Authentication];

export default mergeTypes(typeDefs, { all: true });