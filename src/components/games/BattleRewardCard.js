import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
} from "@chakra-ui/react";

export default function BattleRewardCard({
	imageURL,
	price,
	chance,
	name,
	rarity,
}) {
	return (
		<Center py={12} mt={-12}>
			<Box
				role={"group"}
				p={6}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"lg"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}
			>
				<Stack align={"center"}>
					<Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
						{chance}%
					</Text>
				</Stack>
				<Box
					rounded={"lg"}
					mt={1}
					pos={"relative"}
					height={"230px"}
					_after={{
						transition: "all .3s ease",
						content: '""',
						w: "full",
						h: "full",
						pos: "absolute",
						top: 5,
						left: 0,
						backgroundImage: `url(${imageURL})`,
						filter: "blur(15px)",
						zIndex: -1,
					}}
					_groupHover={{
						_after: {
							filter: "blur(20px)",
						},
					}}
				>
					<Image
						rounded={"lg"}
						height={230}
						width={282}
						objectFit={"contain"}
						src={imageURL}
						alt="Pokemon Card"
					/>
				</Box>
				<Stack pt={10} align={"center"}>
					<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
						{name}
					</Heading>
					<Stack direction={"row"} align={"center"}>
						<Text fontWeight={300} fontSize={"gl"} mt={-3}>
							${price}
						</Text>
					</Stack>
				</Stack>
			</Box>
		</Center>
	);
}
