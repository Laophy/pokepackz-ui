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
	const [randomCards, setRandomCards] = useState([]);
	const [reward, setReward] = useState({});
	const [loading, setLoading] = useState(true);
	const [selectedCard, setSelectedCard] = useState(null);

	const cardsRef = useRef(null);
	const toast = useToast();

	// useEffect(() => {
	// 	setupDeck(null);
	// 	console.log(randomCards);
	// }, []);

	useEffect(() => {
		if (!loading) {
			requestFreePack();
		} else {
			setupDeck(null);
			setLoading(false);
		}
	}, [startSlide]);

	const requestFreePack = async () => {
		// Reset slider
		cardsRef.current.scrollLeft = 0;

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
				const newReward = openPackResponse?.reward?.card;

				const scrollFinish = handleRandomScroll(
					openPackResponse?.reward?.card?.id,
					newReward
				);
				toast({
					title: "Success",
					description: `You have won a ${openPackResponse?.reward?.card?.name}`,
					status: "success",
					duration: 2000,
					isClosable: true,
				});
				if (scrollFinish) {
					setReward(newReward);
				}
			}
		} catch (e) {
			console.warn(e.message);
		}
		setLoading(false);
	};

	const handleRandomScroll = (rewardID, newReward) => {
		// Get a random deck first...
		const newDeck = setupDeck(newReward);
		const cardPosition = newDeck.findIndex((c) => c?.id === rewardID); // position in card array used in the slider

		if (cardsRef) {
			const targetCard = cardsRef.current.children[cardPosition];
			if (targetCard) {
				const cardLeft = targetCard.offsetLeft;
				const cardWidth = targetCard.clientWidth;
				const containerWidth = cardsRef.current.clientWidth;
				let translateTo = -cardLeft + containerWidth / 2 - cardWidth / 2;

				// Apply smooth scrolling with CSS transitions on the individual cards
				cardsRef.current.style.transition = "transform 5s"; // Linear easing for a smooth transition
				cardsRef.current.style.transitionTimingFunction =
					"cubic-bezier(0.5, 3, 4, 5)";
				cardsRef.current.style.transform = `translateX(${translateTo}px)`;

				// Set the selected card and reset after a delay
				setSelectedCard(targetCard);
				setTimeout(() => {
					setSelectedCard(null);

					// Reset the cards to their original position
					cardsRef.current.style.transition = "transform 1s ease-in-out"; // Adjust the duration and easing
					cardsRef.current.style.transform = "translateX(0)";
				}, 7500); // Reset after 0.5 seconds (should match the transition duration)
			}
		}

		return true;
	};

	const setupDeck = (rewardCard) => {
		// Generate 15 cards and place the won card in position 10
		const totalCards = 75;
		let randomCards = [];

		if (!rewardCard) {
			for (let i = 0; i < totalCards; i++) {
				const randomCard = cards[Math.floor(Math.random() * cards.length) + 1];
				randomCards.push(randomCard);
			}
		} else {
			for (let i = 0; i < totalCards; i++) {
				const randomCard = cards[Math.floor(Math.random() * cards.length)];
				if (randomCard?.id !== rewardCard?.id && randomCard !== undefined)
					randomCards.push(randomCard);
			}

			// Set the reward card
			randomCards[65] = rewardCard;
		}

		setRandomCards(randomCards);

		//console.log(randomCards);
		return randomCards;
	};

	return (
		<Stack
			flexDirection={"column"}
			justifyContent={"center"}
			alignItems={"center"}
			p="5"
			m="1"
		>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexDirection={"row"}
				width={"100%"}
				minHeight={"200px"}
				overflow={"hidden"}
				m={1}
				p={2}
			>
				<Stack
					alignItems={"center"}
					justifyContent={"flex-start"}
					flexDirection={"row"}
					ref={cardsRef}
					transition={"transform 5s ease-in-out"}
					width={"100%"}
					m={2}
				>
					{randomCards &&
						randomCards.map((card, index) => (
							<Image
								key={index}
								rounded={"lg"}
								height={"100%"}
								width={150}
								objectFit={"contain"}
								src={card?.images?.large}
								alt={card?.name}
								transform={
									selectedCard === cardsRef.current.children[index]
										? "translateX(0)"
										: "translateX(0)"
								}
								opacity={
									selectedCard === cardsRef.current.children[index] ? 1 : 0.4
								}
								transition={"opacity 5s"}
							/>
						))}
				</Stack>
			</Stack>
			<ChevronUpIcon />

			{loading ? (
				<CircularProgress
					isIndeterminate
					color="teal.300"
					objectFit="contain"
				/>
			) : reward && reward?.name ? (
				<Text>{`${reward?.name} $${reward?.cardmarket?.prices?.avg30}`}</Text>
			) : (
				<Text>{"$0.00"}</Text>
			)}
		</Stack>
	);
}
