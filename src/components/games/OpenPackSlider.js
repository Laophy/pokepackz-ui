import React, { useEffect, useRef, useState } from "react";
import { Stack, Text, Image, CircularProgress } from "@chakra-ui/react";
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
				transition={`${Math.floor(Math.random() * 2) + 1}s all ease-in`}
			>
				<Stack
					alignItems={"center"}
					justifyContent={"center"}
					flexDirection={"row"}
					m={1}
					ref={sliderContainer}
					transform={`translateX(${sliderState}px)`}
					transition={`${Math.floor(Math.random() * 2) + 1}s all ease-out`}
				>
					{cards.length > 0 ? (
						cards.map((card) => (
							<Image
								rounded={"lg"}
								height={"100%"}
								width={150}
								objectFit={"contain"}
								src={card?.images?.large}
								alt={card?.name}
								opacity={1}
								transition={"0.2s all ease-out"}
								_hover={{
									transform: "scale(1.1)",
									transition: "0.2s all ease-in",
								}}
							/>
						))
					) : (
						<CircularProgress
							isIndeterminate
							color="teal.300"
							objectFit="contain"
							maxW={{ base: "100%" }}
						/>
					)}
				</Stack>
			</Stack>
			<ChevronUpIcon />
			<Text>$0.00</Text>
		</Stack>
	);
}
