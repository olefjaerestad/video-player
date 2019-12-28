// https://www.techradar.com/news/the-best-free-stock-video-sites
// https://www.shutterstock.com/nb/video/search/teknologi
// https://vimeo.com/149224063

import React, { useState, SyntheticEvent } from 'react';
import {VideoQualityInterface} from '../../interfaces/VideoQualityInterface';

const Video: React.FC<{qualities: VideoQualityInterface[], title?: string}> = (props: any) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isFullscreen, setIsFullscreen] = useState(false);
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
	const enterFullScreen = () => {
		if(container) container.requestFullscreen().then(() => setIsFullscreen(true));
	};
	const exitFullScreen = () => {
		document.exitFullscreen().then(() => setIsFullscreen(false));
	};
	const enterPictureInPicture = () => {
		if(video) video.requestPictureInPicture();
	};
	const exitPictureInPicture = () => {
		document.exitPictureInPicture();
	};
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
			<div className="video__meta">
				<h1>{props.title}</h1>
				<pre>{isPlaying ? 'isPlaying' : 'isNot'}</pre>
			</div>

			<video 
			controls 
			ref={(el: HTMLVideoElement) => video = el}
			onLoadedMetadata={(e: SyntheticEvent) => setDuration((e.target as HTMLVideoElement).duration)}
			onTimeUpdate={(e: SyntheticEvent) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
			onPlay={() => setIsPlaying(true)}
			onPause={() => setIsPlaying(false)}>
				<source src={currentQuality.src} type={currentQuality.type} />
			</video>

			<div className="video__controls">
				<div className="video__scrub" aria-label="Scrub through video">Scrub</div>
				<button className="video__play" aria-label="Play/pause video" onClick={isPlaying ? pause : play}>Play/pause</button>
				<div className="video__volume" aria-label="Adjust video volumne">Volume</div>
				<div className="video__time">{formatTime(currentTime)} / {formatTime(duration)}</div>
				<div className="video__quality" aria-label="Change video quality">Quality</div>
				<button className="video__picinpic" aria-label="Toggle video picture in picture mode" onClick={enterPictureInPicture}>Picture in picture</button>
				<button className="video__fullscreen" aria-label="Toggle video fullscreen mode" onClick={isFullscreen ? exitFullScreen : enterFullScreen}>Enter/exit Fullscreen</button>
			</div>
		</div>
	)
}

export default Video;