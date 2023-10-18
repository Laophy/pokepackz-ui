import { ArrowDownIcon, CheckCircleIcon, UpDownIcon } from "@chakra-ui/icons";
import {
	Flex,
	Container,
	SimpleGrid,
	Button,
	Stack,
	Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PackCard from "../../components/games/PackCard";
import { useState } from "react";

export default function Rewards() {
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<Container as={Stack} maxW={"5xl"}>
			<Stack alignItems={"center"} justifyContent={"space-between"}>
				<Flex>
					<Heading as="h3" size="lg">
						Rewards
					</Heading>
				</Flex>
			</Stack>
			<Stack
				alignItems={"center"}
				justifyContent={"center"}
				flexWrap={"wrap"}
				flexDirection={"row"}
			>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={102094}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 1"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 10"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 20"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 30"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 40"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 50"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 60"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 70"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
				<PackCard
					price={0}
					name={"Reward Box"}
					rating={5}
					numReviews={1}
					imageURL={
						"https://pokemongohub.net/wp-content/uploads/2018/07/QuestReward.png"
					}
					tag={"Level 80"}
					packId={"cljq2azo50acsoo5cri5fjqsa"}
				/>
			</Stack>
		</Container>
	);
}
