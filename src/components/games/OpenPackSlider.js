import React, { useEffect, useRef, useState } from "react";
import { Stack, Text, Image } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function OpenPackSlider({ set, cards, startSlide }) {
	const sliderContainer = useRef(null);
	const [sliderState, setSliderState] = useState(0);

	useEffect(() => {
		const scrollTo =
			Math.floor(Math.random() * sliderContainer.current.scrollWidth) + 0;
		setSliderState(scrollTo);
		console.log(scrollTo);
	}, [startSlide]);

	return (
		<Stack
			direction={{ base: "column" }}
			justifyContent="center"
			alignItems="center"
			overflow={"hidden"}
			p="5"
			boxShadow="lg"
			m="1"
			borderRadius="sm"
		>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={"row"}
				m={1}
			>
				<Stack
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"row"}
					m={1}
					ref={sliderContainer}
					transform={`translateX(${sliderState}px)`}
					transition={"1s all ease-out"}
				>
					{cards &&
						cards
							.slice(14)
							.map((card) => (
								<Image
									rounded={"lg"}
									height={"100%"}
									width={150}
									objectFit={"contain"}
									src={card?.images?.large}
									alt={card?.name}
									opacity={1}
								/>
							))}
				</Stack>
			</Stack>
			<ChevronUpIcon />
			<Text>$0.00</Text>
		</Stack>
	);
}
