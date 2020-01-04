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
	const [isAdjustingVolume, setAdjustingVolume] = useState(false);
	const [currentQuality, setCurrentQuality] = useState(props.qualities[0]);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [volume, setVolume] = useState(1);
	let container: HTMLDivElement|null = null;
	let video: HTMLVideoElement|null = null;

	const play = () => {
		video?.play();
	}
	const pause = () => {
		video?.pause();
	}
	const adjustVolume = (vol: number) => {
		if(video) video.volume = vol;
		setVolume(vol);
	};
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
	/* const scrubHandler = (e: SyntheticEvent) => {
		const {target} = e;
		// @ts-ignore
		const clickX: number = e.pageX;
		const targetLeft: number = (target as HTMLButtonElement).getBoundingClientRect().left;
		const targetWidth: number = (target as HTMLButtonElement).getBoundingClientRect().width;
		const progress: number = (clickX-targetLeft) / targetWidth; // 0-1
		const newTime = duration * progress;
		if (newTime >= 0) {
			setCurrentTime(newTime);
			if(video) video.currentTime = newTime;
		}
	} */
	const scrubHandler = (e: SyntheticEvent) => {
		const {target} = e;
		// @ts-ignore
		const progress = target.value;
		setCurrentTime(progress);
		if(video) video.currentTime = progress;
	}
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
			onPause={() => setIsPlaying(false)}
			onClick={isPlaying ? pause : play}>
				<source src={currentQuality.src} type={currentQuality.type} />
			</video>

			<div className="video__controls">
				<div className="video__scrub" aria-label="Scrub through video">
					<input type="range" className="video__scrub__scrubber" value={currentTime} max={duration} onChange={scrubHandler}/>
					<div className="video__scrub__track"></div>
					<div className="video__scrub__line" style={{'width': `${currentTime/duration*100}%`}}></div>
				</div>
				<div className="video__controls__lower">
					<div className="video__controls__left">
						<button className="video__play" aria-label="Play/pause video" onClick={isPlaying ? pause : play}><PlayIcon/><PauseIcon/></button>
						<span className="video__volume" onMouseOver={() => setAdjustingVolume(true)} onMouseLeave={() => setAdjustingVolume(false)}>
							<span className="video__volume__toggle" aria-label="Adjust video volumne">
								<SpeakerIcon/>
							</span>
							<input type="range" min="0" max="1" step="0.02" value={volume} className="video__volume__scrub" style={{width: !isAdjustingVolume ? '0' : '60px', opacity: !isAdjustingVolume ? '0' : '1'}} onChange={(e) => adjustVolume(parseFloat((e.target as HTMLInputElement).value))} onFocus={()=>setAdjustingVolume(true)} onBlur={()=>setAdjustingVolume(false)}/>
						</span>
						<span className="video__time">{formatTime(currentTime)} / {formatTime(duration)}</span>
					</div>
					<div className="video__controls__right">
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