import { ICategory } from './category.model';
import { ITag } from './tag.model';

export interface IPhotoFull {
    id: number;
    name: string;
    categories: ICategory[];
    tags: ITag[];
    description: string;
    data: string;
    imageFull: {id: number; data: string[]};
    date: string;
}
