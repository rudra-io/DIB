'use client';

import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Card } from './card';

interface Image {
	src: string;
	alt?: string;
}

interface ZoomParallaxProps {
	/** Array of images to be displayed in the parallax effect max 9 images */
	images: Image[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start start', 'end end'],
	});

	const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
	const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
	const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
	const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
	const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

	const pictures = [
		{
		  scale: scale4, // Center
		},
		{
		  scale: scale5, // Top Left
		},
		{
		  scale: scale6, // Bottom Left
		},
		{
		  scale: scale5, // Top center-ish
		},
		{
		  scale: scale8, // Top right
		},
		{
		  scale: scale9, // Bottom right
		},
	];

	const imagePositions = [
		'h-[25vh] w-[25vw] md:h-[25vh] md:w-[20vw]', // Center
		'h-[20vh] w-[20vw] md:h-[20vh] md:w-[15vw] -top-[12vh] -left-[15vw]', // Top Left
		'h-[15vh] w-[25vw] md:h-[15vh] md:w-[20vw] top-[15vh] -left-[22vw]', // Bottom Left
		'h-[15vh] w-[15vw] md:h-[15vh] md:w-[10vw] -top-[7vh] left-[22vw]', // Top center-ish
		'h-[20vh] w-[20vw] md:h-[22vh] md:w-[15vw] -top-[2vh] -right-[15vw]', // Top Right
		'h-[15vh] w-[20vw] md:h-[18vh] md:w-[15vw] top-[15vh] -right-[18vw]', // Bottom right
	  ];

	return (
		<div id="projects" ref={container} className="relative h-[300vh] py-16 md:py-24">
			<div className="flex flex-col items-center text-center mb-12 md:mb-16">
				<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
					Our Impactful Projects
				</h2>
        	</div>
			<div className="sticky top-0 h-screen overflow-hidden">
				{images.map(({ src, alt }, index) => {
					if (index >= pictures.length) return null;
					const { scale } = pictures[index];

					return (
						<motion.div
							key={index}
							style={{ scale }}
							className='absolute top-0 flex h-full w-full items-center justify-center'
						>
							<div
                className={cn(
                  'relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 shadow-lg',
                  imagePositions[index]
                )}
              >
								<div className="relative w-full h-full rounded-md overflow-hidden">
									<Image
										src={src || '/placeholder.svg'}
										alt={alt || `Parallax image ${index + 1}`}
										fill
										className="object-contain"
									/>
								</div>
							</div>
						</motion.div>
					);
				})}
			</div>
		</div>
	);
}
