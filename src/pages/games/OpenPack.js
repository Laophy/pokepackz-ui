import { ArrowDownIcon, CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	Heading,
	CircularProgress,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import GameCard from "../../components/games/PackCard";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OpenPackCard from "../../components/games/OpenPackCard";
import RewardCard from "../../components/games/RewardCard";

export default function OpenPack({ title }) {
	const { packId } = useParams();
	const [filter, setFilter] = useState("featured");
	const [loadingCards, setLoadingCards] = useState(true);
	const [cards, setCards] = useState([]);
	const [set, setSet] = useState({});

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	useEffect(() => {
		try {
			fetch(`${process.env.REACT_APP_API_ENDPOINT}/pokemon/cards/${packId}`)
				.then((response) => response.json())
				.then((data) => {
					const sorted = data.message.data.sort(
						(a, b) => b.cardmarket.prices.avg30 - a.cardmarket.prices.avg30
					);
					setCards(sorted);
				})
				.then(() => setLoadingCards(false));
		} catch (error) {
			console.warn(error);
		}

		try {
			fetch(`${process.env.REACT_APP_API_ENDPOINT}/pokemon/sets/${packId}`)
				.then((response) => response.json())
				.then((data) => setSet(data.message.data));
		} catch (error) {
			console.warn(error);
		}
	}, []);

	return (
		<Container as={Stack} maxW={"6xl"}>
			<OpenPackCard
				set={set}
				price={Math.floor(Math.random() * (800 - 1) + 1)}
			/>
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
								price={card.cardmarket.prices.avg30}
								rarity={card.rarity}
								name={card.name}
								imageURL={card.images.small}
								card
							/>
						);
					})
				)}
			</Stack>
		</Container>
	);
}
