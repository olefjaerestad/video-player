// https://www.techradar.com/news/the-best-free-stock-video-sites
// https://www.shutterstock.com/nb/video/search/teknologi
// https://vimeo.com/149224063
// https://jakearchibald.github.io/svgomg/
// https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9
// https://github.com/facebook/create-react-app/issues/1388

import React, { useState, SyntheticEvent } from 'react';
import {VideoQualityInterface} from '../../interfaces/VideoQualityInterface';
import './Video.css';
import {ReactComponent as PlayIcon} from '../../assets/icons/play.svg';
import {ReactComponent as PauseIcon} from '../../assets/icons/pause.svg';
import {ReactComponent as SpeakerIcon} from '../../assets/icons/speaker.svg';
import {ReactComponent as QualityIcon} from '../../assets/icons/quality.svg';
import {ReactComponent as PipIcon} from '../../assets/icons/pictureinpicture.svg';
import {ReactComponent as FullscreenIcon} from '../../assets/icons/fullscreen.svg';

const Video: React.FC<{qualities: VideoQualityInterface[], title?: string}> = (props: any) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [isPictureInPicture, setIsPictureInPicture] = useState(false);
	const [currentQuality, setCurrentQuality] = useState(props.qualities[0]);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	let container: HTMLDivElement|null = null;
	let video: HTMLVideoElement|null = null;

	const play = () => {
		video?.play();
	}
	const pause = () => {
		video?.pause();
	}
	const adjustVolume = (vol: number) => video ? video.volume = vol : null;
	const toggleFullScreen = () => {
		if (document.fullscreenElement !== null) {
			document.exitFullscreen().then(() => setIsFullscreen(false));
		} else {
			if(container) container.requestFullscreen().then(() => setIsFullscreen(true));
		}
	};
	const enterPictureInPicture = () => {
		// @ts-ignore
		if(video) video.requestPictureInPicture().then(() => setIsPictureInPicture(true));
	};
	/* const exitPictureInPicture = () => {
		// @ts-ignore
		document.exitPictureInPicture().then(() => setIsPictureInPicture(false));
	}; */
	const formatTime = (time: number) => {
		const seconds = Math.floor(time % 60);
		const minutes = Math.floor(time / 60 % 60);
		const hours = Math.floor(time / 60 / 60 % 60);
		return (
			(hours ? hours : '') + 
			(hours && minutes ? ':' : '') + 
			minutes + 
			':' + 
			seconds.toString().padStart(2, '0')
		);
	}

	return (
		<div className="video" ref={(el: HTMLDivElement) => container = el}>
			<span className="video__meta">{props.title}</span>

			<video 
			ref={(el: HTMLVideoElement) => video = el}
			onLoadedMetadata={(e: SyntheticEvent) => setDuration((e.target as HTMLVideoElement).duration)}
			onTimeUpdate={(e: SyntheticEvent) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
			onPlay={() => setIsPlaying(true)}
			onPause={() => setIsPlaying(false)}>
				<source src={currentQuality.src} type={currentQuality.type} />
			</video>

			<div className="video__controls">
				<button className="video__scrub" aria-label="Scrub through video"> { /*todo: make this do stuff*/ }
					<div className="video__scrub__track"></div>
					<div className="video__scrub__line"></div>
				</button>
				<div className="video__controls__lower">
					<div>
						<button className="video__play" aria-label="Play/pause video" onClick={isPlaying ? pause : play}><PlayIcon/><PauseIcon/></button>
						<button className="video__volume" aria-label="Adjust video volumne"><SpeakerIcon/></button>
						<span className="video__time">{formatTime(currentTime)} / {formatTime(duration)}</span>
					</div>
					<div>
						<button className="video__quality" aria-label="Change video quality"><QualityIcon/></button>
						<button className="video__picinpic" aria-label="Toggle video picture in picture mode" onClick={enterPictureInPicture}><PipIcon/></button>
						<button className="video__fullscreen" aria-label="Toggle video fullscreen mode" onClick={toggleFullScreen}><FullscreenIcon/></button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Video;