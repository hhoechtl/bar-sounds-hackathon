
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
    public serverPort = 8000;
    public dbConfig = {
        host: 'localhost',
        db: 'barsoundz',
        port: 28015
    };
};