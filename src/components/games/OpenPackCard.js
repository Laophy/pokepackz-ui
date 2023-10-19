import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	CircularProgress,
	Container,
	Divider,
	Flex,
	Heading,
	Image,
	Spinner,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

export default function OpenPackCard({ set, title }) {
	const { packId, name } = useParams();

	return (
		<Container as={Stack} maxW={"100%"}>
			<Divider />
			<Stack>
				<Flex alignItems={"center"} justifyContent={"space-between"} w={"100%"}>
					<Link to={"/packs"}>
						<Button
							variant={"ghost"}
							colorScheme={"teal"}
							size={"md"}
							leftIcon={<ArrowBackIcon />}
						>
							{"Back"}
						</Button>
					</Link>
					<Button variant={"ghost"} colorScheme={"teal"} size={"md"}>
						$0.00
					</Button>
				</Flex>
			</Stack>
			<Stack direction={{ base: "column", md: "row" }}>
				<Flex p={8} flex={1} align={"center"} justify={"space-between"}>
					<Stack spacing={6} w={"full"} maxW={"lg"}>
						<Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
							<Text
								as={"span"}
								position={"relative"}
								_after={{
									content: "''",
									width: "full",
									height: useBreakpointValue({ base: "20%", md: "30%" }),
									position: "absolute",
									bottom: 1,
									left: 0,
									bg: "teal.400",
									zIndex: -1,
								}}
							>
								{set?.name ? set?.name : "Loading..."}
							</Text>
							<br />{" "}
							<Text color={"teal.400"} as={"span"}>
								{set?.series} Series
							</Text>{" "}
						</Heading>
						<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
							{`There is a total of ${set?.printedTotal} printed cards in this set. ${set?.name} set was released on ${set?.releaseDate} and is in the ${set?.series} series.`}
						</Text>
						<Stack direction={{ base: "column", md: "row" }} spacing={4}>
							<Button
								rounded={"full"}
								bg={"teal.400"}
								color={"white"}
								_hover={{
									bg: "teal.500",
								}}
							>
								Buy for $0.00
							</Button>
							<Button rounded={"full"}>Try Free</Button>
						</Stack>
					</Stack>
				</Flex>
				<Flex align={"center"} justify={"center"}>
					{set?.images?.logo ? (
						<Image
							alt={`Loot box for pack ${title}`}
							objectFit={"cover"}
							maxH={400}
							maxW={450}
							src={set?.images?.logo}
						/>
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
				</Flex>
			</Stack>
		</Container>
	);
}
