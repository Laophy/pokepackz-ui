import { Container, Stack, CircularProgress, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useEffect, useState } from "react";

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
				setSets(pokemonSets?.data.reverse());
			}

			// Set our sets with the data returned
			setLoadingSets(false);
		};

		getPokemonSets();
	}, []);

	return (
		<Container as={Stack} maxWidth={"full"}>
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
		</Container>
	);
}
