
export interface IRethinkConfig {
    host: string;
    db: string;
    port: number;
}

export interface IAppConfig {
    dbConfig: IRethinkConfig;
    serverPort: number;
}


export default class AppConfig {
    public static serverPort = 8000;
    public static dbConfig = {
        host: '192.168.99.100',
        db: 'barsoundz',
        port: 28015
    };
};