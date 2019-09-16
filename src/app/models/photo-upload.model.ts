export interface IPhotoUpload {
    file: File;
    description?: string;
    tag?: Array<{id: number,
        name: string}>;
    category?: [{id: number,
        name: string}];
}
