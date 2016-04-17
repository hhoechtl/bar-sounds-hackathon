export interface IUser {
    global_client_id: string;
    given_name: string;
    family_name: string;
    picture: string;
    gender: string;
    nickname: string;
    firstTagCounter: number;
    tagCounter: number;
}



export class User implements IUser {
    public global_client_id: string;
    public given_name: string;
    public family_name: string;
    public picture: string;
    public gender: string;
    public nickname: string;
    public firstTagCounter: number = 0;
    public tagCounter: number = 0;

    constructor() {
    }
}