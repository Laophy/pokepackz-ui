import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	useToast,
	Heading,
	Text,
	CardBody,
	CardFooter,
	Card,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GameCard from "../../components/games/PackCard";

export default function CreateBattleScreen() {
	const [players, setPlayers] = useState("1v1");
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);
	const toast = useToast();

	return (
		<Container as={Stack} maxW={"6xl"}>
			<Stack
				alignItems={"center"}
				justifyContent={"space-between"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<Flex>
					<Heading as="h3" size="lg">
						Battle
					</Heading>
				</Flex>
				<Flex>
					<Link to={"/battles"}>
						<Button
							variant={"ghost"}
							colorScheme={"teal"}
							size={"md"}
							mr={4}
							onClick={(e) => {
								toast({
									title: "Error",
									description: "Battle Canceled",
									status: "error",
									duration: 2000,
									isClosable: true,
								});
							}}
						>
							Cancel
						</Button>
					</Link>
					<Link to={"/battles"}>
						<Button
							variant={"solid"}
							colorScheme={"teal"}
							size={"md"}
							onClick={(e) => {
								toast({
									title: "Success",
									description: "Battle was created joining now!",
									status: "success",
									duration: 2000,
									isClosable: true,
								});
							}}
						>
							Create
						</Button>
					</Link>
				</Flex>
			</Stack>
			<Heading as="h4" size="md" mt={10}>
				Select Players
			</Heading>
			<Stack direction={{ base: "column", md: "row" }} spacing={4}>
				<Button
					variant={players && players === "1v1" ? "solid" : "outline"}
					colorScheme={"teal"}
					size={"lg"}
					w={"full"}
					h={"full"}
					p={2}
					onClick={(e) => setPlayers("1v1")}
				>
					<Stack>
						<Text>1 vs 1</Text>
						<Text>2 Players</Text>
					</Stack>
				</Button>
				<Button
					variant={players && players === "1v1v1" ? "solid" : "outline"}
					colorScheme={"teal"}
					size={"lg"}
					w={"full"}
					h={"full"}
					p={2}
					onClick={(e) => setPlayers("1v1v1")}
				>
					<Stack>
						<Text>1 vs 1 vs 1</Text>
						<Text>3 Players</Text>
					</Stack>
				</Button>
				<Button
					variant={players && players === "1v1v1v1" ? "solid" : "outline"}
					colorScheme={"teal"}
					size={"lg"}
					w={"full"}
					h={"full"}
					p={2}
					onClick={(e) => setPlayers("1v1v1v1")}
				>
					<Stack>
						<Text>1 vs 1 vs 1 vs 1</Text>
						<Text>4 Players</Text>
					</Stack>
				</Button>
				<Button
					variant={players && players === "2v2" ? "solid" : "outline"}
					colorScheme={"teal"}
					size={"lg"}
					w={"full"}
					h={"full"}
					p={2}
					onClick={(e) => setPlayers("2v2")}
				>
					<Stack>
						<Text>2 vs 2</Text>
						<Text>4 Players</Text>
					</Stack>
				</Button>
			</Stack>
			<Heading as="h4" size="md" mt={10}>
				Selected Packs
			</Heading>
			<Button
				variant={"solid"}
				colorScheme={"gray"}
				size={"lg"}
				w={"full"}
				p={2}
			>
				+
			</Button>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
				mt={1}
			>
				<GameCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Mystery Box"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 10000)}
					imageURL={"https://txdxe.com/cdn/shop/products/MB.jpg?v=1637944316"}
					tag={"HOT"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<GameCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Mystery Box"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 10000)}
					imageURL={"https://txdxe.com/cdn/shop/products/MB.jpg?v=1637944316"}
					tag={"HOT"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<GameCard
					price={Math.floor(Math.random() * (800 - 1) + 1)}
					name={"Mystery Box"}
					rating={Math.floor(Math.random() * 6)}
					numReviews={Math.floor(Math.random() * 10000)}
					imageURL={"https://txdxe.com/cdn/shop/products/MB.jpg?v=1637944316"}
					tag={"HOT"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
			</Stack>
			<Heading as="h4" size="md" mt={10}>
				Summary
			</Heading>
			<Stack>
				<Card>
					<CardBody>
						<Container
							as={Stack}
							maxW={"6xl"}
							py={4}
							direction={{ base: "column", md: "row" }}
							spacing={4}
							justify={{ base: "center", md: "space-between" }}
							align={{ base: "center", md: "center" }}
						>
							<Text fontSize={"lg"}>Packs / Rounds</Text>
							<Stack direction={"row"}>
								<Text fontSize={"lg"}>0</Text>
							</Stack>
						</Container>
						<Container
							as={Stack}
							maxW={"6xl"}
							py={4}
							direction={{ base: "column", md: "row" }}
							spacing={4}
							justify={{ base: "center", md: "space-between" }}
							align={{ base: "center", md: "center" }}
						>
							<Text fontSize={"lg"}>Players</Text>
							<Stack direction={"row"}>
								<Text fontSize={"lg"}>{players}</Text>
							</Stack>
						</Container>
						<Container
							as={Stack}
							maxW={"6xl"}
							py={4}
							direction={{ base: "column", md: "row" }}
							spacing={4}
							justify={{ base: "center", md: "space-between" }}
							align={{ base: "center", md: "center" }}
						>
							<Text fontSize={"lg"}>Total Cost</Text>
							<Stack direction={"row"}>
								<Text fontSize={"lg"}>$0</Text>
							</Stack>
						</Container>
					</CardBody>
				</Card>
			</Stack>
			<Button
				variant={"solid"}
				colorScheme={"teal"}
				size={"lg"}
				w={"full"}
				p={2}
				mt={5}
			>
				Create Battle ($0.00)
			</Button>
		</Container>
	);
}
