import React, {useState} from 'react';
import {VideoInterface} from './interfaces/VideoInterface';
import Video from './components/Video/Video';

const App: React.FC = () => {
	const [video, setVideo] = useState({
		// src: 'https://ak0.picdn.net/shutterstock/videos/1027882880/preview/stock-footage-young-entrepreneur-walkling-toward-city-sky-scrapers-dubai-urban-panorama-futuristic-digital-nomad.mp4',
		qualities: [
			{title: '426x240', src: '/video/three-corners-426x240.mp4', type: 'video/mp4'},
			{title: '640x360', src: '/video/three-corners-640x360.mp4', type: 'video/mp4'},
			{title: '960x540', src: '/video/three-corners-960x540.mp4', type: 'video/mp4'},
			{title: '1280x720', src: '/video/three-corners-1280x720.mp4', type: 'video/mp4'},
			{title: '1920x1080', src: '/video/three-corners-1920x1080.mp4', type: 'video/mp4'},
		],
		title: 'Three Corners'
	} as VideoInterface);

	return (
		<div className="App">
			<Video qualities={video.qualities} title={video.title} />
		</div>
	);
}

export default App;
