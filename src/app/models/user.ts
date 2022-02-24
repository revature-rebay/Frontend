export class User {

    public id: number;
    public userName: string;
    public passWord: string;
    public email: string;
    public firstName: string;
    public lastName: string;
    public roleId: number;

    constructor(obj?: User) {

        this.id = obj?.id ?? 0
        this.userName = obj?.userName ?? ""
        this.passWord = obj?.passWord ?? ""
        this.email = obj?.email ?? ""
        this.firstName = obj?.firstName ?? ""
        this.lastName = obj?.lastName ?? ""
        this.roleId = obj?.roleId ?? 0
    }
}
