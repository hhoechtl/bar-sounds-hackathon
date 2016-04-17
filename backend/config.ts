
export interface IRethinkConfig {
    host: string;
    db: string;
    port: number;
}

export interface IGraceNoteConfig {
    clientId: string;
    clientTag: string;
}

export interface IAppConfig {
    dbConfig: IRethinkConfig;
    serverPort: number;
    graceNote: IGraceNoteConfig;
}


export default class AppConfig {
    public static serverPort = 8000;
    public static dbConfig = {
        host: '192.168.99.100',
        db: 'barsoundz',
        port: 28015
    };
    public static graceNote = {
      clientId: '1856440932',
      clientTag: 'D9B2C858CF333BE4C924D82209CC3FA8'  
    } 
};