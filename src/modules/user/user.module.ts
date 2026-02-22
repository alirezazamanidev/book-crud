import { Module } from "@nestjs/common";
import { UserService } from "./services/user.service";
import { USER_REPOSITORY } from "./user.constants";
import { UserRepository } from "./repositories/user.repositorry.impl";
@Module({
  providers: [UserService, {
    provide: USER_REPOSITORY,
    useClass: UserRepository
  }],
  exports:[UserService,USER_REPOSITORY]
})
export class UserModule { }
