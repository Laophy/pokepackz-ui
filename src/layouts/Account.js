import {
	Avatar,
	Flex,
	Text,
	Image,
	Container,
	SimpleGrid,
	Menu,
	MenuItem,
	MenuItemOption,
	MenuOptionGroup,
	Stack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Account({ accountElement, currentPage }) {
	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<div>
			<Container as={Stack} maxW={"5xl"}>
				<Stack>
					<SimpleGrid templateColumns={{ sm: "1fr 5fr", md: "0fr 5fr" }}>
						<Stack width="220px" mr={2}>
							<Menu>
								<MenuItem minH="48px">
									<Flex alignItems={"center"} justifyContent={"space-between"}>
										<Avatar size={"sm"} mr="12px" src={user?.photoURL} />
										<Text noOfLines={1} fontSize="lg">
											{user?.username ? user?.username : "User"}
										</Text>
									</Flex>
								</MenuItem>
								<MenuOptionGroup
									title="Account"
									type="radio"
									defaultValue={"profile"}
									value={currentPage}
								>
									<MenuItemOption value="profile">
										<Link to={"/account/profile"}>Profile</Link>
									</MenuItemOption>
									<MenuItemOption value="deposits">
										<Link to={"/account/deposits"}>Deposits</Link>
									</MenuItemOption>
									<MenuItemOption value="withdrawls">
										<Link to={"/account/withdrawls"}>Withdrawls</Link>
									</MenuItemOption>
									<MenuItemOption value="claims">
										<Link to={"/account/claims"}>Claims</Link>
									</MenuItemOption>
									<MenuItemOption value="sales">
										<Link to={"/account/sales"}>Sales</Link>
									</MenuItemOption>
									<MenuItemOption value="history">
										<Link to={"/account/history"}>History</Link>
									</MenuItemOption>
									<MenuItemOption value="affiliate">
										<Link to={"/account/affiliate"}>Affiliate</Link>
									</MenuItemOption>
									<MenuOptionGroup title="Settings"></MenuOptionGroup>
									<MenuItemOption value="fairness">
										<Link to={"/account/fairness"}>Fairness</Link>
									</MenuItemOption>
									<MenuItemOption value="security">
										<Link to={"/account/security"}>Security</Link>
									</MenuItemOption>
								</MenuOptionGroup>
							</Menu>
						</Stack>
						<Stack width="100%">{accountElement}</Stack>
					</SimpleGrid>
				</Stack>
			</Container>
		</div>
	);
}
