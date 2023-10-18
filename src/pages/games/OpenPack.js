import { ArrowDownIcon, CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import GameCard from "../../components/games/PackCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import OpenPackCard from "../../components/games/OpenPackCard";
import RewardCard from "../../components/games/RewardCard";

export default function OpenPack({ title }) {
	const { packId } = useParams();
	const [filter, setFilter] = useState("featured");

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<Container as={Stack} maxW={"6xl"}>
			<OpenPackCard
				title={"Catch em' All"}
				subTitle={"Mystery Box"}
				description={
					"Experience the thrill of the 'Catch em' All' pack - curated for budget warriors with big dreams. Unpack surprises that can turn into exciting wins!"
				}
				price={Math.floor(Math.random() * (800 - 1) + 1)}
				imageURL={
					"https://cdn.filestackcontent.com/auto_image/cache=expiry:max/VxPkwM9aSE6jhu3X18JD"
				}
			/>
			<Heading size="lg">In This Pack</Heading>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<RewardCard
					price={5}
					rarity={"common"}
					name={"Pokemon Go Pack"}
					imageURL={`https://images.pokemontcg.io/base1/${
						Math.floor(Math.random() * 102) + 1
					}.png`}
					chance={98}
				/>
				<RewardCard
					price={75}
					rarity={"common"}
					name={"VStar Universe Booster"}
					imageURL={`https://images.pokemontcg.io/base1/${
						Math.floor(Math.random() * 102) + 1
					}.png`}
					chance={1.0003}
				/>
				<RewardCard
					price={2500}
					rarity={"common"}
					name={"Sun and Moon Booster"}
					imageURL={`https://images.pokemontcg.io/base1/${
						Math.floor(Math.random() * 102) + 1
					}.png`}
					chance={0.0002}
				/>
			</Stack>
		</Container>
	);
}
