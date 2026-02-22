import { randomUUID } from "crypto";
import { AggregateRoot } from "../../../common/seed-works/domain/aggregateRoot";
import { Book } from "../../book/domain/Book";


export class User extends AggregateRoot<string> {

  private _fullName?: string | null
  private _username: string
  private _hashPassword: string
  private _isVerify: boolean
  private _books: Book[]

  private constructor() {
    super()
  }

  public static create({
    username,fullName,hashPassword
  }:{username:string,hashPassword:string,fullName:string}) {
    const user= new User();
    user.id=randomUUID().toString();
    user._fullName=fullName;
    user._username=username;
    user._hashPassword=hashPassword;
    user._isVerify=false;
    user._books=[];
    user.createdAt=new Date();
    user.updatedAt=new Date();
    return user;
  }

  // getter
  public get fullName(): string | null {
    return this._fullName || null;
  }
  public get userName(): string {
    return this._username;
  }
  public get hashPassword(): string {
    return this._hashPassword;
  }
  public get isVerify(): boolean {
    return this._isVerify;
  }
  public get books(): Book[] {
    return this._books;
  }

}
