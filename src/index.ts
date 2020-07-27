import MapiClient from "@mapbox/mapbox-sdk/lib/classes/mapi-client";
import StaticMap, {StaticMapService} from "@mapbox/mapbox-sdk/services/static";
import {Connection, ConnectionConfig, GlobalConfig} from "@nexus-switchboard/nexus-core";

export interface IMapboxConfig extends ConnectionConfig {
    apiToken: string;
}

export class MapboxConnection extends Connection {
    public baseClient: MapiClient;
    public staticClient: StaticMapService

    public name = "nexus-conn-mapbox";
    public config: IMapboxConfig;

    public get staticApi() {
        if (!this.staticClient) {
            this.staticClient = StaticMap(this.baseClient);
        }
        return this.staticClient;
    }
    /**
     * This connect will attempt to pull the account information via API request which
     * means that the account name associated with this instance may not be available
     * immediately.
     */
    public connect(): MapboxConnection {
        this.baseClient = new MapiClient({
            accessToken: this.config.apiToken
        });

        return this;
    }

    public disconnect(): boolean {
        return true;
    }
}

export default function createConnection(cfg: ConnectionConfig, globalCfg: GlobalConfig): Connection {
    return new MapboxConnection(cfg, globalCfg);
}
