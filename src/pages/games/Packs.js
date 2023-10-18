import { ArrowDownIcon, CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	CircularProgress,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useEffect, useState } from "react";

export default function Packs() {
	const [filter, setFilter] = useState("featured");
	const [sets, setSets] = useState([]);

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	useEffect(() => {
		try {
			fetch(`${process.env.REACT_APP_API_ENDPOINT}/pokemon/sets`)
				.then((response) => response.json())
				.then((data) => setSets(data.message));
		} catch (error) {
			console.warn(error);
		}
	}, []);

	return (
		<Container as={Stack} maxWidth={"full"}>
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
				{sets?.data ? (
					sets?.data?.map((set) => {
						return (
							<PackCard
								price={Math.floor(Math.random() * (800 - 1) + 1)}
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
