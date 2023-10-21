import {
	ArrowBackIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	InfoIcon,
	LinkIcon,
} from "@chakra-ui/icons";
import {
	Flex,
	Container,
	Button,
	Stack,
	Divider,
	useToast,
	Text,
	Box,
	Avatar,
	SkeletonCircle,
	Image,
	useColorModeValue,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BattleRewardCard from "../../components/games/BattleRewardCard";
import { useEffect, useState } from "react";

export default function BattleViewer() {
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	// Game State coming from game API
	const [rounds, setRounds] = useState(1);
	const [currentRound, setCurrentRound] = useState(0);

	const [cost, setCost] = useState(0);

	const [players, setPlayers] = useState(4); // Total player rows
	const [playerObjects, setPlayerObjects] = useState([
		{ battleID: 1 },
		{ battleID: 2 },
		{ battleID: 3 },
		{ battleID: 4 },
	]); // Array of users in the current battle in order
	const [playerAdded, setPlayerAdded] = useState(false);
	const [gamemode, setGamemode] = useState("1v1v1v1"); // Calculates winner / payout

	// Extra Game Details
	const { battleURL } = useParams();
	const toast = useToast();

	return (
		<Container as={Stack} maxW={"100%"}>
			<Divider />
			<Stack>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
					<Link to={"/battles"}>
						<Button
							variant={"ghost"}
							colorScheme={"teal"}
							size={"md"}
							leftIcon={<ArrowBackIcon />}
						>
							{"Battles"}
						</Button>
					</Link>
					<Button variant={"ghost"} colorScheme={"black"} size={"md"}>
						{`${currentRound}/${rounds}`}
					</Button>
					<Button variant={"ghost"} colorScheme={"teal"} size={"md"}>
						{`Cost ₤${cost.toFixed(2)}`}
					</Button>
				</Flex>
			</Stack>
			<Divider />
			<Stack>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
					<Button
						variant={"solid"}
						colorScheme={"gray"}
						size={"md"}
						leftIcon={<LinkIcon />}
						onClick={() => {
							navigator.clipboard.writeText(window.location.href);
							toast({
								title: "",
								description: `Copied to clipboard ${window.location.href}`,
								status: "success",
								duration: 3000,
								isClosable: true,
							});
						}}
					>
						{"Share"}
					</Button>
					<Button
						variant={"solid"}
						colorScheme={"gray"}
						size={"md"}
						leftIcon={<InfoIcon />}
						onClick={() =>
							toast({
								title: "",
								description: "Provably fair algorithm",
								status: "success",
								duration: 3000,
								isClosable: true,
							})
						}
					>
						{"Fairness"}
					</Button>
				</Flex>
			</Stack>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"no-wrap"}
				flexDirection={"row"}
				overflow={"hidden"}
				bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
				height={500}
			>
				<ChevronRightIcon />
				<Stack
					justifyContent={"space-around"}
					direction={{ base: "row" }}
					width={"100%"}
				>
					{playerObjects.map((player) => {
						return (
							<Box p={2}>
								<Stack
									alignItems={"center"}
									justifyContent={"center"}
									direction={{ base: "column", md: "column", sm: "column" }}
									flexWrap={"no-wrap"}
									spacing={2}
								>
									<Image
										rounded={"lg"}
										height={32}
										width={32}
										objectFit={"contain"}
										src={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										alt="#"
									/>
									<Image
										rounded={"lg"}
										height={32}
										width={32}
										objectFit={"contain"}
										src={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										alt="#"
									/>
									<Image
										rounded={"lg"}
										height={32}
										width={32}
										objectFit={"contain"}
										src={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										alt="#"
									/>
									<Image
										rounded={"lg"}
										height={32}
										width={32}
										objectFit={"contain"}
										src={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										alt="#"
									/>
									<Image
										rounded={"lg"}
										height={32}
										width={32}
										objectFit={"contain"}
										src={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										alt="#"
									/>
								</Stack>
							</Box>
						);
					})}
				</Stack>
				<ChevronLeftIcon />
			</Stack>
			<Stack
				direction={{ base: "column", md: "row", sm: "column" }}
				spacing={2}
			>
				{playerObjects.map((player) => {
					return (
						<Box w={"full"} h={"full"} p={2}>
							<Stack alignItems={"center"} justifyContent={"center"}>
								<Stack
									alignItems={"center"}
									justifyContent={"center"}
									flexDirection={"row"}
								>
									{player?.user ? (
										<Avatar
											size="sm"
											name={player?.user.username}
											src={player?.user.photoURL}
										/>
									) : (
										""
									)}
									<Text fontWeight="semibold">
										{player?.user?.username ? (
											player?.user?.username
										) : (
											<Button
												variant={"solid"}
												colorScheme={"teal"}
												size={"sm"}
												value={player?.battleID}
											>
												Join Battle ₤{cost.toFixed(2)}
											</Button>
										)}
									</Text>
								</Stack>
								<Text fontWeight="semibold" color={"gray.400"}>
									₤0.00
								</Text>
								<Stack
									alignItems={"center"}
									justifyContent={"center"}
									direction={{ base: "row", md: "row", sm: "column" }}
									flexWrap={"wrap"}
								>
									<BattleRewardCard
										price={5}
										rarity={"common"}
										name={"Pokemon Card"}
										imageURL={`https://images.pokemontcg.io/base1/${
											Math.floor(Math.random() * 102) + 1
										}_hires.png`}
										chance={98}
									/>
								</Stack>
							</Stack>
						</Box>
					);
				})}
			</Stack>
		</Container>
	);
}
