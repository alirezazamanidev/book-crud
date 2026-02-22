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
  static reconstitute(props: {
    id: string,
    userName: string,
    hashPassword: string,
    fullName?: string | null,
    isVerify: boolean,
    books?: Book[],
    createdAt: Date,
    updatedAt: Date
  }): User {
    const user = new User();
    user.id = props.id;
    user._username = props.userName;
    user._hashPassword = props.hashPassword;
    user._fullName = props.fullName ?? null;
    user._isVerify = props.isVerify;
    user._books = props.books ?? [];
    user.createdAt = props.createdAt;
    user.updatedAt = props.updatedAt;
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
