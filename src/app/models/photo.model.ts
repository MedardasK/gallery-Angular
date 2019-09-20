export interface IPhoto {
    id: number;
    name: string;
    tag: [{id: number, name: string}];
    category: [{id: number, name: string}];
    description: string;
    data: string;
    imageFull: {id: number; data: string[]};
    date: string;
}
