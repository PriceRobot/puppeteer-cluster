
import * as puppeteer from 'puppeteer';

import { ResourceData } from '../ConcurrencyImplementation';
import SingleBrowserImplementation from '../SingleBrowserImplementation';

export default class Context extends SingleBrowserImplementation {

    protected async createResources(): Promise<ResourceData> {
        var options = this.options.proxyServer ? {proxyServer: this.options.proxyServer} : undefined;
        const context = await (this.browser as puppeteer.Browser)
            .createIncognitoBrowserContext(options);
        const page = await context.newPage();
        return {
            context,
            page,
        };
    }

    protected async freeResources(resources: ResourceData): Promise<void> {
        await resources.context.close();
    }

}
