import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CanvasAnimation = () => {

	const imageRef = useRef();

	const updateImage = (animation) => {
		const frameCount = 375;
		const progress = Math.ceil(animation.progress * 100)
		const imageFrame = Math.ceil(frameCount / 100 * progress);	
		console.log(imageFrame)
		imageRef.current.src = `/composition/Lautissimi 2_${ imageFrame.toString().padStart(5, 0) }.jpg`;
	};

	const preloadImages = () => {
		for (let i = 0; i < 375; i++) {
			const img = new Image();
			img.src = `/composition/Lautissimi 2_${ i.toString().padStart(5, 0) }.jpg`;
		};
	};

	useEffect(() => {
		preloadImages();
	}, [])

	useEffect(() => {
		const motion = gsap.to(imageRef.current, { 
			scrollTrigger: {
				scrub: true,
				pin: '.canvas-animation__image',
				trigger: '.canvas-animation__image',
				start: 'top top',
				end: 'bottom top',
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