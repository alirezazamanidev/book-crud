import { Module } from "@nestjs/common";
import { USER_REPOSITORY } from "./user.constants";
import { UserRepository } from "./repositories/user.repositorry.impl";
@Module({
  providers: [ {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }],
  exports:[USER_REPOSITORY]
})
export class UserModule { }
