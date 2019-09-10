export interface IPhoto {
    id: number;
    name: string;
    tag: string[];
    category: string[];
    description: string;
    data: string;
    imageFull: {id: number;
                data: string[]};
}
