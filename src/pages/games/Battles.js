import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Heading,
	Stack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BattleCard from "../../components/games/BattleCard";

export default function Battles() {
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<Container as={Stack} maxW={"6xl"}>
			<Stack
				alignItems={"center"}
				justifyContent={"space-between"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<Flex>
					<Link to={"/packs/#featured"}>
						<Heading as="h3" size="lg">
							Battles
						</Heading>
					</Link>
				</Flex>
				<Flex>
					<Link to={"/battles/createbattle"}>
						<Button variant={"solid"} colorScheme={"teal"} size={"md"}>
							Create Battle
						</Button>
					</Link>
				</Flex>
			</Stack>
			<BattleCard packs={""} active={true} battleURL={"ndauw778b3ndun3"} />
			<BattleCard packs={""} active={false} battleURL={"dnas83nnkf"} />
		</Container>
	);
}
