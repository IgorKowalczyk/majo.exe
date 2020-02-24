
export interface SortOptions {
    dir?: "asc" | "desc";
    key?: (value: any) => any;
}

export interface IUpdateable {
    _iter_tag: 'updateable';
    update: (value: any, deep: boolean) => any;
}
