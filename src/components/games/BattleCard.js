import React from "react";
import {
	Stack,
	Text,
	Button,
	Image,
	SkeletonCircle,
	Avatar,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function BattleCard({ packs, active, battleURL }) {
	return (
		<Stack p="5" boxShadow="lg" m="1" borderRadius="sm">
			<Stack
				direction={{ base: "column", md: "row" }}
				justifyContent="space-between"
				alignItems="center"
			>
				<Stack alignItems={"center"} justifyContent={"center"}>
					<Text fontWeight="semibold">Players</Text>
					<Stack
						alignItems={"center"}
						justifyContent={"center"}
						flexDirection={"row"}
					>
						<Avatar
							size="sm"
							name="Pokemon Traine"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"
						/>{" "}
						<Avatar
							size="sm"
							name="Pokemon Trainer"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"
						/>{" "}
						<Text fontWeight="semibold">X</Text>
						{/* <SkeletonCircle size="32px" />
						<SkeletonCircle size="32px" /> */}
						<Avatar
							size="sm"
							name="Pokemon Traine"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"
						/>{" "}
						<Avatar
							size="sm"
							name="Pokemon Trainer"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5f321b49-5fa7-407b-aaa0-cca6992d3d7c/d5s04qj-d26a072a-3294-4da7-8ab9-a1be78141275.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvZi81ZjMyMWI0OS01ZmE3LTQwN2ItYWFhMC1jY2E2OTkyZDNkN2MvZDVzMDRxai1kMjZhMDcyYS0zMjk0LTRkYTctOGFiOS1hMWJlNzgxNDEyNzUuZ2lmIn1dXX0.hiDasOecg6-_ze0YZLGVbl4nKudKH9jPepKtZqUlS48"
						/>{" "}
					</Stack>
				</Stack>
				<Stack
					alignItems={"center"}
					justifyContent={"flex-start"}
					flexDirection={"row"}
					overflowX={"scroll"}
					position={"relative"}
					m={2}
				>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/base1/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/base2/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/ex5/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/ex5/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/ex5/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/xy1/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/xy1/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/xy1/logo.png"}
						alt="#"
					/>
					<Image
						rounded={"lg"}
						height={132}
						width={32}
						objectFit={"contain"}
						src={"https://images.pokemontcg.io/xy1/logo.png"}
						alt="#"
					/>
				</Stack>
				<Stack direction={{ base: "column", md: "row" }}>
					{active ? (
						<Link to={`/battles/${battleURL}`}>
							<Button colorScheme="teal" variant={"solid"}>
								View Battle
							</Button>
						</Link>
					) : (
						<Link to={`/battles/${battleURL}`}>
							<Button colorScheme="teal" variant={"outline"}>
								Join Battle
							</Button>
						</Link>
					)}
				</Stack>
			</Stack>
		</Stack>
	);
}
