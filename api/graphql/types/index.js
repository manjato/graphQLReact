import { mergeTypes } from "merge-graphql-schemas";

import Employe from "./Employe/";
import Experience from "./Experience/";

const typeDefs = [Employe, Experience];

export default mergeTypes(typeDefs, { all: true });