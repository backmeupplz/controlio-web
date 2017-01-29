import { ImageModel } from '../imgb/imgb.model';

export interface IRemovableImage {
	removeImage(image: ImageModel): void;
}
