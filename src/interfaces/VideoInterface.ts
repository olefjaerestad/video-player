import {VideoQualityInterface} from './VideoQualityInterface';

export interface VideoInterface {
	qualities: VideoQualityInterface[],
	title?: string,
}