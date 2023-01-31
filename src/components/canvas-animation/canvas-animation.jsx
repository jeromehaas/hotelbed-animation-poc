import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasAnimation = () => {

	const options = {
		ref: useRef(),
		frameCount: 140,
		image: null,
	};

	const updateImage = (animation) => {
		const frameCount = options.frameCount;
		const progress = Math.ceil(animation.progress * 5000)
		const index = Math.ceil(frameCount / 5000 * progress);	
		requestAnimationFrame(() => {
			options.image.src = getFrameByIndex(index);
			options.ref.current.getContext('2d').drawImage(options.image, 0, 0, options.ref.current.width, options.ref.current.height);
		})
	};

	const getFrameByIndex = (index) => {
		// return `/composition/Lautissimi 2_${ index.toString().padStart(5, 0) }.jpg`
		// return `/composition/Lautissimi 2_${ index.toString().padStart(5, 0) }.jpg`
		return `https://www.apple.com/105/media/us/airpods-pro/2019/1299e2f5_9206_4470_b28e_08307a42f19b/anim/sequence/large/01-hero-lightpass/${index.toString().padStart(4, '0')}.jpg`;
	};

	const preloadImages = () => {
		for (let index = 0; index < options.frameCount; index++) {
			options.image = new Image();
			options.image.src = getFrameByIndex(index);
		};
	};

	const initImages = () => {
		options.image = new Image();
		options.image.src = getFrameByIndex(0);
		options.image.onload = () => options.ref.current.getContext('2d').drawImage(options.image, 0, 0, options.ref.current.width, options.ref.current.height);
	};

	const init = () => {
		preloadImages();
		initImages();
	};

	useEffect(() => {
		init();
	}, []);


	useEffect(() => {
		const motion = gsap.to(options.ref.current, { 
			scrollTrigger: {
				scrub: true,
				pin: '.canvas-animation__image',
				trigger: '.canvas-animation__image',
				start: 'center center',
				end: '500% center',
				markers: true,
				onUpdate: (animation) => updateImage(animation),
			}	
		});
	
		return () => motion.revert();

	}, [])
	
	return (
		<div className="canvas-animation">
			<canvas className="canvas-animation__image" ref={ options.ref } width="1080" height="810"></canvas>
		</div>

	);
}

export { 
	CanvasAnimation
};