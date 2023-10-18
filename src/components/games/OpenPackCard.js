import { ArrowBackIcon } from "@chakra-ui/icons";
import {
	Button,
	Container,
	Divider,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	useBreakpointValue,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

export default function OpenPackCard({
	title,
	subTitle,
	description,
	imageURL,
}) {
	const { packId, name, price } = useParams();

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
						₤{price}
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
								{name}
							</Text>
							<br />{" "}
							<Text color={"teal.400"} as={"span"}>
								{packId}
							</Text>{" "}
						</Heading>
						<Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
							{description}
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
								Buy for ₤{price}
							</Button>
							<Button rounded={"full"}>Try Free</Button>
						</Stack>
					</Stack>
				</Flex>
				<Flex align={"center"} justify={"center"}>
					<Image
						alt={`Loot box for pack ${title}`}
						objectFit={"cover"}
						maxH={400}
						maxW={450}
						src={`https://images.pokemontcg.io/${packId}/logo.png`}
					/>
				</Flex>
			</Stack>
		</Container>
	);
}
