export interface MarvelRequestOptions {
    limit: number;
    offset: number;
    nameStartsWith?: string;
    titleStartsWith?: string;
    orderBy?: string;
}