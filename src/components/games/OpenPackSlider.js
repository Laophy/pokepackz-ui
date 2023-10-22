import React, { useEffect, useRef } from "react";
import { Stack, Image, useToast } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function OpenPackSlider({ set, cards, startSlide }) {
	const sliderContainer = useRef(null);
	const toast = useToast();

	useEffect(() => {
		const requestFreePack = async () => {
			let openPackResponse;
			try {
				const res = await fetch(
					`${process.env.REACT_APP_API_ENDPOINT}/api/packs/open`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							set: set,
							tryFree: true,
						}),
					}
				);
				openPackResponse = await res.json();

				if (openPackResponse) {
					console.log(openPackResponse);
					toast({
						title: "Success",
						description: `You have won a ${openPackResponse?.reward?.card?.name}`,
						status: "success",
						duration: 2000,
						isClosable: true,
					});
					handleRandomScroll();
				}
			} catch (e) {
				console.warn(e.message);
			}
		};

		requestFreePack();

		const handleRandomScroll = () => {
			const scrollableDiv = sliderContainer.current;

			if (scrollableDiv) {
				// Calculate a random position within the scrollable content
				const maxScrollLeft =
					scrollableDiv.scrollWidth - scrollableDiv.clientWidth;
				const randomScrollLeft = Math.floor(Math.random() * maxScrollLeft) + 0;

				// Set the scroll position to the random value on the x-axis
				scrollableDiv.scrollLeft = randomScrollLeft;

				//console.log(`max: ${maxScrollLeft} picked: ${randomScrollLeft}`);
			}
		};
	}, [startSlide]);

	return (
		<Stack
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			overflow={"hidden"}
			p="5"
			m="1"
		>
			<Stack
				alignItems={"flex-start"}
				justifyContent={"flex-start"}
				flexDirection={"row"}
				width={"100%"}
				minHeight={"200px"}
				m={1}
				p={2}
				ref={sliderContainer}
				overflow={"hidden"}
				scrollBehavior={"smooth"}
			>
				<Stack flexDirection={"row"}>
					{cards &&
						cards.map((card, index) => (
							<Image
								key={`${card?.name}_${index}`}
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
						))}
				</Stack>
			</Stack>
			<ChevronUpIcon />
		</Stack>
	);
}
