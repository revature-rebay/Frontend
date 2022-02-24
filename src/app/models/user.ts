export class User {
    public id:number;
    public username:string;
    public password:string; 
    public email:string;
    public firstName:string; 
    public lastName:string; 
    public roleId:number; 
    constructor(obj?:User){
        
            this.id = obj?.id ?? 0
            this.username = obj?.username ?? ""
            this.password = obj?.password ?? ""
            this.email = obj?.email ?? ""
            this.firstName = obj?.firstName ?? ""
            this.lastName = obj?.lastName ?? ""
            this.roleId = obj?.roleId ?? 0
    }
}
