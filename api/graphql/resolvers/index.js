import { mergeResolvers } from "merge-graphql-schemas";

import Employe from "./Employe/";
import Experience from "./Experience/";

const resolvers = [Employe, Experience];

export default mergeResolvers(resolvers);