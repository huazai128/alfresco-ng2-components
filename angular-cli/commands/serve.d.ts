export interface ServeTaskOptions {
    port?: number;
    host?: string;
    proxyConfig?: string;
    watcher?: string;
    liveReload?: boolean;
    liveReloadHost?: string;
    liveReloadPort?: number;
    liveReloadBaseUrl?: string;
    liveReloadLiveCss?: boolean;
    target?: string;
    environment?: string;
    ssl?: boolean;
    sslKey?: string;
    sslCert?: string;
    aot?: boolean;
    open?: boolean;
}
declare const ServeCommand: any;
export default ServeCommand;
