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
import { FiPackage } from "react-icons/fi";
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
				w={250}
				rounded="lg"
				boxShadow={"rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"}
				position="relative"
			>
				<Circle
					size="10px"
					position="absolute"
					top={2}
					right={2}
					bg="teal.200"
				/>

				<Image
					src={data.imageURL}
					alt={`Picture of ${data.name}`}
					roundedTop="lg"
					w={250}
					h={150}
					m={1}
					mr={"auto"}
					ml={"auto"}
					objectFit={"contain"}
				/>

				<Box p="6">
					<Box display="flex" alignItems="baseline">
						<Badge rounded="full" px="2" fontSize="0.8em" colorScheme="teal">
							{data.isNew ? data.isNew : "NEW"}
						</Badge>
					</Box>
					<Flex mt="1" justifyContent="space-between" alignContent="center">
						<Tooltip
							label={data.name}
							bg="white"
							placement={"top"}
							color={"teal.600"}
							fontSize={"1.2em"}
						>
							<Box
								fontSize="2xl"
								fontWeight="semibold"
								as="h4"
								lineHeight="tight"
								isTruncated
							>
								{data.name}
							</Box>
						</Tooltip>
					</Flex>

					<Flex justifyContent="space-between" alignContent="center">
						<Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
							<Box as="span" color={"gray.600"} fontSize="lg">
								$
							</Box>{" "}
							{data.price.toFixed(2)}
						</Box>
						<Tooltip
							label={`Open pack`}
							bg="white"
							placement={"top"}
							color={"teal.600"}
							fontSize={"1.2em"}
						>
							<Link to={`/packs/${data.packId}/${data.name}`}>
								<chakra.a display={"flex"}>
									<Icon as={FiPackage} h={7} w={7} alignSelf={"center"} />
								</chakra.a>
							</Link>
						</Tooltip>
					</Flex>
				</Box>
			</Box>
		</Flex>
	);
}
