import { Repository } from "./repository";
import { SqlReposity } from "./sql_repository";

const repository: Repository = new SqlReposity();
export default repository;