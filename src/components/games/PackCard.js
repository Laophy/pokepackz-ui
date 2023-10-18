import {
	Flex,
	Circle,
	Box,
	Image,
	Badge,
	useColorModeValue,
	Icon,
	chakra,
	Tooltip,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function Rating({ rating, numReviews }) {
	return (
		<Box display="flex" alignItems="center">
			{Array(5)
				.fill("")
				.map((_, i) => {
					const roundedRating = Math.round(rating * 2) / 2;
					if (roundedRating - i >= 1) {
						return (
							<BsStarFill
								key={i}
								style={{ marginLeft: "1" }}
								color={i < rating ? "teal.500" : "gray.300"}
							/>
						);
					}
					if (roundedRating - i === 0.5) {
						return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
					}
					return <BsStar key={i} style={{ marginLeft: "1" }} />;
				})}
			<Box as="span" ml="2" color="gray.600" fontSize="sm">
				{numReviews} review{numReviews > 1 && "s"}
			</Box>
		</Box>
	);
}

export default function PackCard({
	price,
	name,
	rating,
	numReviews,
	imageURL,
	tag,
	packId,
}) {
	const data = {
		isNew: tag,
		imageURL: imageURL,
		name: name,
		price: price,
		rating: rating,
		numReviews: numReviews,
		packId: packId,
	};

	return (
		<Flex p={2} alignItems="center" justifyContent="center">
			<Box
				bg={useColorModeValue("white", "gray.800")}
				w={"300px"}
				borderWidth="1px"
				rounded="lg"
				shadow="lg"
				position="relative"
			>
				{data.isNew && (
					<Circle
						size="10px"
						position="absolute"
						top={2}
						right={2}
						bg="red.200"
					/>
				)}

				<Image
					src={data.imageURL}
					alt={`Picture of ${data.name}`}
					roundedTop="lg"
					height={300}
					width={300}
					objectFit={"contain"}
				/>

				<Box p="6">
					<Box display="flex" alignItems="baseline">
						{data.isNew && (
							<Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
								{data.isNew}
							</Badge>
						)}
					</Box>
					<Flex mt="1" justifyContent="space-between" alignContent="center">
						<Box
							fontSize="2xl"
							fontWeight="semibold"
							as="h4"
							lineHeight="tight"
							isTruncated
						>
							{data.name}
						</Box>
						<Tooltip
							label="Open Pack"
							bg="white"
							placement={"top"}
							color={"gray.800"}
							fontSize={"1.2em"}
						>
							<Link to={`/packs/${data.packId}/${data.name}`}>
								<chakra.a display={"flex"}>
									<Icon as={FiShoppingCart} h={7} w={7} alignSelf={"center"} />
								</chakra.a>
							</Link>
						</Tooltip>
					</Flex>

					<Flex justifyContent="space-between" alignContent="center">
						<Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
							<Box as="span" color={"gray.600"} fontSize="lg">
								₤
							</Box>{" "}
							{data.price.toFixed(2)}
						</Box>
					</Flex>
				</Box>
			</Box>
		</Flex>
	);
}
