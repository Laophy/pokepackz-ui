import React, { useEffect, useRef, useState } from "react";
import {
	Stack,
	Image,
	useToast,
	Text,
	CircularProgress,
} from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

export default function OpenPackSlider({ set, cards, startSlide }) {
	const [reward, setReward] = useState({});
	const [loading, setLoading] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);

	const sliderContainer = useRef(null);
	const toast = useToast();

	useEffect(() => {
		if (!loading) {
			requestFreePack();
		}
	}, [startSlide]);

	const requestFreePack = async () => {
		let openPackResponse;
		try {
			setLoading(true);
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

			if (openPackResponse?.reward) {
				const scrollFinish = handleRandomScroll(
					openPackResponse?.reward?.card?.id
				);
				toast({
					title: "Success",
					description: `You have won a ${openPackResponse?.reward?.card?.name}`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
				if (scrollFinish) {
					const newReward = openPackResponse?.reward?.card;
					setReward(newReward);
				}
			}
		} catch (e) {
			console.warn(e.message);
		}
		setLoading(false);
	};

	const handleRandomScroll = (rewardID) => {
		const scrollableDiv = sliderContainer.current;
		const cardPosition = cards.findIndex((c) => c?.id === rewardID); // position in card array used in the slider

		if (scrollableDiv) {
			// Calculate a random position within the scrollable content
			const maxScrollLeft =
				scrollableDiv.scrollWidth - scrollableDiv.clientWidth;
			// const randomScrollLeft = Math.floor(Math.random() * maxScrollLeft) + 0;

			// Set the scroll position to the random value on the x-axis
			// scrollableDiv.scrollLeft = randomScrollLeft;

			// const cardPosInSlider = scrollableDiv.children[cardPosition];
			// if (cardPosInSlider) {
			// 	cardPosInSlider.scrollIntoView({ behavior: "smooth" });
			// } else {
			// 	scrollableDiv.scrollLeft = 0;
			// }

			const targetCard = scrollableDiv.children[cardPosition]; // Index 9 for the 10th card
			if (targetCard) {
				const container = scrollableDiv;
				const cardLeft = targetCard.offsetLeft;
				const cardWidth = targetCard.clientWidth;
				const containerWidth = container.clientWidth;

				const scrollTo = cardLeft - containerWidth / 2 + cardWidth / 2;
				container.scrollLeft = scrollTo - (Math.floor(Math.random() * 150) + 1);

				// Set the selected card and reset after a delay
				setSelectedCard(targetCard);
				setTimeout(() => {
					setSelectedCard(null);
				}, 3000); // Reset after 3 seconds (adjust as needed)
			}

			//console.log(`max: ${maxScrollLeft} picked: ${randomScrollLeft}`);
		}

		return true;
	};

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
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={"row"}
				width={"100%"}
				minHeight={"200px"}
				m={1}
				p={2}
			>
				<Stack
					alignItems={"center"}
					justifyContent={"space-between"}
					flexDirection={"row"}
					ref={sliderContainer}
					overflow={"hidden"}
					scrollBehavior={"smooth"}
					m={2}
				>
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
								opacity={
									selectedCard === sliderContainer.current.children[index]
										? 1
										: 0.4
								}
								transition={"opacity 0.3s"}
							/>
						))}
				</Stack>
			</Stack>
			<ChevronUpIcon />
			<Text>
				{loading ? (
					<CircularProgress
						isIndeterminate
						color="teal.300"
						objectFit="contain"
					/>
				) : reward && reward?.name ? (
					`${reward?.name} $${reward?.cardmarket?.prices?.avg30}`
				) : (
					"$0.00"
				)}
			</Text>
		</Stack>
	);
}
