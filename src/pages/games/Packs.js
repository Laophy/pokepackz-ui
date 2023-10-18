import { ArrowDownIcon, CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import { Flex, Container, SimpleGrid, Button, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useState } from "react";

export default function Packs() {
	const [filter, setFilter] = useState("featured");

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<Container as={Stack} maxWidth={"5xl"}>
			<Stack alignItems={"center"} justifyContent={"space-between"}>
				<Flex>
					<Button
						variant={"solid"}
						colorScheme={filter === "featured" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<CheckCircleIcon />}
						onClick={(e) => setFilter("featured")}
					>
						Featured
					</Button>
					<Button
						variant={"solid"}
						colorScheme={filter === "hot" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<UpDownIcon />}
						onClick={(e) => setFilter("hot")}
					>
						Hot
					</Button>
					<Button
						variant={"solid"}
						colorScheme={filter === "price" ? "teal" : "gray"}
						size={"md"}
						mr={4}
						leftIcon={<ArrowDownIcon />}
						onClick={(e) => setFilter("price")}
					>
						Price
					</Button>
				</Flex>
			</Stack>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Scarlet & Violet 151"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/sv3pt5/logo.png"}
					tag={"HOT"}
					packId={"sv3pt5"}
				/>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Obsidian Flames"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/sv3/logo.png"}
					tag={"Featured"}
					packId={"sv3"}
				/>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Mystery Pack"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/sve/logo.png"}
					tag={"NEW"}
					packId={"sve"}
				/>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Paldea Evolved"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/sv2/logo.png"}
					tag={"HOT"}
					packId={"sv2"}
				/>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Mystery Pack"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/svp/logo.png"}
					tag={"Featured"}
					packId={"svp"}
				/>
				<PackCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Scarlet & Violet"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 2500)}
					imageURL={"https://images.pokemontcg.io/sv1/logo.png"}
					tag={"NEW"}
					packId={"sv1"}
				/>
			</Stack>
			<Button
				variant={"solid"}
				colorScheme={"teal"}
				size={"md"}
				width={"full"}
				leftIcon={<ArrowDownIcon />}
			>
				Load More
			</Button>
		</Container>
	);
}
