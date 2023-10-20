import {
	ArrowDownIcon,
	CalendarIcon,
	CheckCircleIcon,
	Search2Icon,
	UpDownIcon,
} from "@chakra-ui/icons";
import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	CircularProgress,
	InputLeftElement,
	Heading,
	InputGroup,
	Input,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Packs() {
	const [filter, setFilter] = useState("price");
	const [sets, setSets] = useState([]);
	const [loadingSets, setLoadingSets] = useState(true);

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	useEffect(() => {
		try {
			fetch(`${process.env.REACT_APP_API_ENDPOINT}/pokemon/sets`)
				.then((response) => response.json())
				.then((data) => {
					setSets(data.message.data.reverse());
				})
				.then(() => {
					setLoadingSets(false);
				});
		} catch (error) {
			console.warn(error);
		}
	}, []);

	useEffect(() => {
		setLoadingSets(true);
		const updateFilteredSets = () => {
			// Filter by featured, price, hot
			switch (filter) {
				case "price": {
					const sortedCards = sets.sort(
						(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
					);
					setSets(sortedCards);
					setLoadingSets(false);
					break;
				}
				case "release": {
					const sortedCards = sets.sort(
						(a, b) => new Date(a.releaseDate) - new Date(b.releaseDate)
					);
					setSets(sortedCards);
					setLoadingSets(false);
					break;
				}
				case "cards": {
					const sortedCards = sets.sort((a, b) => a.total - b.total);
					setSets(sortedCards);
					setLoadingSets(false);
					break;
				}
				default: {
					const sortedCards = sets.sort(
						(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
					);
					setSets(sortedCards);
					setLoadingSets(false);
				}
			}
		};

		updateFilteredSets();
	}, [filter]);

	return (
		<Container as={Stack} maxWidth={"6xl"}>
			<Stack
				alignItems={"center"}
				justifyContent={"space-between"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<Flex>
					<Button
						variant={"solid"}
						colorScheme={filter === "price" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<ArrowDownIcon />}
						onClick={(e) => {
							setFilter("price");
						}}
					>
						Price
					</Button>
					<Button
						variant={"solid"}
						colorScheme={filter === "release" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<CalendarIcon />}
						onClick={(e) => {
							setFilter("release");
						}}
					>
						Release Date
					</Button>
					<Button
						variant={"solid"}
						colorScheme={filter === "cards" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<CheckCircleIcon />}
						onClick={(e) => {
							setFilter("cards");
						}}
					>
						Cards
					</Button>
				</Flex>
			</Stack>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				{!loadingSets ? (
					sets?.map((set) => {
						return (
							<PackCard
								key={set.id}
								price={set.total}
								name={set.name}
								imageURL={set.images.logo}
								tag={set.ptcgoCode}
								packId={set.id}
							/>
						);
					})
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
			</Stack>
			{/* <Button
				variant={"solid"}
				colorScheme={"teal"}
				size={"md"}
				width={"full"}
				leftIcon={<ArrowDownIcon />}
			>
				Load More
			</Button> */}
		</Container>
	);
}
