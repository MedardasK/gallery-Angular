import { ICategory } from './category.model';
import { ITag } from './tag.model';

export interface IPhotoFull {
    id: number;
    name: string;
    description: string;
    date: string;
    categories: ICategory[];
    tags: ITag[];
}
