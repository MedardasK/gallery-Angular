import { ITag } from './tag.model';
import { ICategory } from './category.model';
export interface IPhotoUpload {
    description: string;
    category: ICategory[];
    tag: ITag[];
}
