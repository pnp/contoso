export interface IActivationProps {
    appId: string;
    client: string;
    cultureName: string;
    domainHint: string;
    /**
     * array of urls
     */
    items: string[];
    userId: string;
    content: string;
}
