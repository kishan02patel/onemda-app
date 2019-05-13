import { mergeTypes } from "merge-graphql-schemas";
import User from "./User/";
import Service from "./Service";
import Authentication from "./Authentication";
import Activity from "./Activity"

const typeDefs = [User, Service, Authentication, Activity];

export default mergeTypes(typeDefs, { all: true });