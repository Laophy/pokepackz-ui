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
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	const [sets, setSets] = useState([]);
	const [loadingSets, setLoadingSets] = useState(true);

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
