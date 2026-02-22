import { User } from "../User";


export interface IUserRepository {
  save(user: User): Promise<void>;
  findByUsername(username: string): Promise<User | null>;
  exists(id: string): Promise<boolean>;
}
