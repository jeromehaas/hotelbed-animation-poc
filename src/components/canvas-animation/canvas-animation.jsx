import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasAnimation = () => {

	const imageRef = useRef();

	const updateImage = (animation) => {
		const frameCount = 1125;
		const progress = Math.ceil(animation.progress * 5000)
		const index = Math.ceil(frameCount / 5000 * progress);	
		console.log(index);
		imageRef.current.src = getFrameByIndex(index); 
	};

	const getFrameByIndex = (index) => {
		return `/composition/Lautissimi 2_${ index.toString().padStart(5, 0) }.jpg`
	};

	const preloadImages = () => {
		for (let index = 0; index < 375; index++) {
			const img = new Image();
			img.src = getFrameByIndex(index);
		};
	};

	useEffect(() => {
		preloadImages();
	}, []);

	useEffect(() => {
		const motion = gsap.to(imageRef.current, { 
			scrollTrigger: {
				scrub: true,
				pin: '.canvas-animation__image',
				trigger: '.canvas-animation__image',
				start: 'center center',
				end: '500% top',
				markers: true,
				onUpdate: (animation) => updateImage(animation),
			}	
		});
	
		return () => motion.revert();

	}, [])
	
	return (
		<div className="canvas-animation">
			<img className="canvas-animation__image" ref={ imageRef } src="/composition/Lautissimi 2_00001.jpg" alt="Composition" />
		</div>

	);
}

export { 
	CanvasAnimation
};