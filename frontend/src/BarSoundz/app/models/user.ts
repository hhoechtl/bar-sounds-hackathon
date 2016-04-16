
export class User {
    public id: string = null;
    public nickname: string;
    public firstName: string;
    public lastName: string;
    public avatarUrl: string;
    public firstTagCounter: number = 0;
    public tagCounter: number = 0;

    constructor(nickname:string, firstName:string, lastName:string) {
        this.nickname = nickname;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}