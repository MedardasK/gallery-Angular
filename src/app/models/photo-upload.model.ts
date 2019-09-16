export interface IPhotoUpload {
    description: string;
    tags: Array<{id: number,
        name: string}>;
    categories: [{id: number,
        name: string}];
}
