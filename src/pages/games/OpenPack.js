import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Flex,
	Container,
	Button,
	Stack,
	Heading,
	CircularProgress,
	Divider,
	Image,
	Text,
	useBreakpointValue,
	useToast,
	Progress,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RewardCard from "../../components/games/RewardCard";
import OpenPackSlider from "../../components/games/OpenPackSlider";

export default function OpenPack({ title }) {
	const { packId } = useParams();

	const [startSlide, setStartSlide] = useState(false);

	const [loadingCards, setLoadingCards] = useState(true);
	const [cards, setCards] = useState([]);
	const [set, setSet] = useState({});

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);
	const toast = useToast();

	useEffect(() => {
		const getPokemonCards = async () => {
			let cards;

			try {
				const res = await fetch(
					`${process.env.REACT_APP_API_ENDPOINT}/api/pokemon/sets/${packId}/cards`
				);
				cards = await res.json();
			} catch (e) {
				toast({
					title: "Network Error",
					description: `${e.message}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}

			if (cards) {
				// Sort the cards by price in reward view
				const cardsSortedByPrice = cards?.data?.sort(
					(a, b) => b?.cardmarket?.prices?.avg30 - a?.cardmarket?.prices?.avg30
				);

				// Set current reward cards
				setCards(cardsSortedByPrice);
				setLoadingCards(false);
			}
		};
		getPokemonCards();

		const getPokemonSet = async () => {
			let set;

			try {
				const res = await fetch(
					`${process.env.REACT_APP_API_ENDPOINT}/api/pokemon/sets/${packId}`
				);
				set = await res.json();
			} catch (e) {
				toast({
					title: "Network Error",
					description: `${e.message}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}

			// Update current set state
			setSet(set.data);
		};

		getPokemonSet();
	}, [packId]);

	return (
		<Container as={Stack} maxW={"6xl"}>
			<Divider />
			<Stack>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
					<Link to={"/packs"}>
						<Button
							variant={"ghost"}
							colorScheme={"teal"}
							size={"md"}
							leftIcon={<ArrowBackIcon />}
						>
							{"Back"}
						</Button>
					</Link>
					<Button variant={"ghost"} colorScheme={"teal"} size={"md"}>
						$0.00
					</Button>
				</Flex>
			</Stack>
			{cards.length > 0 ? (
				<OpenPackSlider set={set} cards={cards} startSlide={startSlide} />
			) : (
				<Progress size="xs" isIndeterminate m={20} />
			)}
			<Stack direction={{ base: "column", md: "row" }}>
				<Flex p={8} flex={1} align={"center"} justify={"space-between"}>
					<Stack spacing={6} w={"full"} maxW={"lg"}>
						<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
							<Text
								as={"span"}
								position={"relative"}
								_after={{
									content: "''",
									width: "full",
									height: useBreakpointValue({ base: "20%", md: "30%" }),
									position: "absolute",
									bottom: 1,
									left: 0,
									bg: "teal.400",
									zIndex: -1,
								}}
							>
								{set?.name ? set?.name : "Loading..."}
							</Text>
							<br />{" "}
							<Text color={"teal.400"} as={"span"}>
								{set?.series} Series
							</Text>{" "}
						</Heading>
						<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
							{set?.name
								? `There is a total of ${
										set?.printedTotal
								  } printed cards in this set. ${
										set?.name
								  } set was released on ${new Date(
										set?.releaseDate
								  ).toDateString()} and is in the ${set?.series} series.`
								: "Loading..."}
						</Text>
						<Stack direction={{ base: "column", md: "row" }} spacing={4}>
							<Button
								rounded={"full"}
								bg={"teal.400"}
								color={"white"}
								_hover={{
									bg: "teal.500",
								}}
							>
								Buy for $0.00
							</Button>
							<Button
								rounded={"full"}
								onClick={() => setStartSlide(!startSlide)}
							>
								Try Free
							</Button>
						</Stack>
					</Stack>
				</Flex>
				<Flex align={"center"} justify={"center"}>
					{set?.images?.logo ? (
						<Image
							alt={`Loot box for pack ${title}`}
							objectFit={"cover"}
							maxH={400}
							maxW={450}
							src={set?.images?.logo}
						/>
					) : (
						<CircularProgress
							isIndeterminate
							color="teal.300"
							objectFit="contain"
							maxW={{ base: "100%" }}
							m={5}
							p={2}
							mr={"auto"}
							ml={"auto"}
						/>
					)}
				</Flex>
			</Stack>
			<Heading size="lg">In This Pack</Heading>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				{loadingCards ? (
					<CircularProgress
						isIndeterminate
						color="teal.300"
						objectFit="contain"
						maxW={{ base: "100%" }}
						m={5}
						p={2}
						mr={"auto"}
						ml={"auto"}
					/>
				) : (
					cards?.map((card) => {
						return (
							<RewardCard
								key={card?.id}
								price={card?.cardmarket?.prices?.avg30}
								rarity={card?.rarity}
								name={card?.name}
								imageURL={card?.images?.small}
								card={card}
							/>
						);
					})
				)}
			</Stack>
		</Container>
	);
}
