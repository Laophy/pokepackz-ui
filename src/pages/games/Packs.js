import {
	Container,
	Stack,
	CircularProgress,
	useToast,
	SimpleGrid,
	Flex,
	Heading,
	InputGroup,
	InputLeftElement,
	Input,
	Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useEffect, useState } from "react";
import { Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

export default function Packs() {
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);
	const toast = useToast();

	const [sets, setSets] = useState([]);
	const [loadingSets, setLoadingSets] = useState(true);

	useEffect(() => {
		const getPokemonSets = async () => {
			let pokemonSets;
			try {
				const res = await fetch(
					`${process.env.REACT_APP_API_ENDPOINT}/api/pokemon/sets`
				);
				pokemonSets = await res.json();
			} catch (e) {
				toast({
					title: "Network Error",
					description: `${e.message}`,
					status: "error",
					duration: 3000,
					isClosable: true,
				});
			}

			if (pokemonSets) {
				setSets(
					pokemonSets?.data
						.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate))
						.reverse()
				);
			}

			// Set our sets with the data returned
			setLoadingSets(false);
		};

		getPokemonSets();
	}, []);

	return (
		<Container as={Stack} maxWidth={"5xl"}>
			<Stack
				alignItems={"center"}
				justifyContent={"space-between"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<Flex>
					<Heading as="h3" size="lg">
						Packs
					</Heading>
				</Flex>
				<Flex>
					<InputGroup>
						<InputLeftElement pointerEvents="none">
							<Search2Icon color="gray.300" />
						</InputLeftElement>
						<Input type="text" placeholder="Search" />
					</InputGroup>
					<Link to={"/packs"}>
						<Button variant={"solid"} colorScheme={"teal"} size={"md"} ml={4}>
							Search
						</Button>
					</Link>
				</Flex>
			</Stack>
			<SimpleGrid minChildWidth="275px" spacing={4} mt={5}>
				{!loadingSets ? (
					sets.map((set) => {
						return <PackCard key={set.id} set={set} />;
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
			</SimpleGrid>
		</Container>
	);
}
