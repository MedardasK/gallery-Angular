export interface IPhoto {
    id: number;
    name: string;
    tag: string[];
    description: string;
    url: string;
    data: string;
    imageFull: {id: number;
                data: string[]};
}
