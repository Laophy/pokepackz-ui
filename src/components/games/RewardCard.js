import {
	Box,
	Center,
	useColorModeValue,
	Heading,
	Text,
	Stack,
	Image,
} from "@chakra-ui/react";

export default function RewardCard({ card, imageURL, price, chance, name }) {
	return (
		<Center py={12}>
			<Box
				role={"group"}
				p={6}
				maxW={"330px"}
				w={"full"}
				bg={useColorModeValue("white", "gray.800")}
				boxShadow={"lg"}
				rounded={"lg"}
				pos={"relative"}
				zIndex={1}
			>
				<Box
					rounded={"lg"}
					mt={-12}
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
						alt="#"
					/>
				</Box>
				<Stack pt={10} align={"center"}>
					<Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
						{name}
					</Heading>
					<Stack direction={"row"} align={"center"}>
						<Text fontWeight={800} fontSize={"xl"}>
							${price}
						</Text>
					</Stack>
					{/* <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
						{chance}%
					</Text> */}
				</Stack>
			</Box>
		</Center>
	);
}
