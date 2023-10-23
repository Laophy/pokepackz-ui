import { useEffect } from "react";
import { auth } from "./firebase";

import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setLoading } from "./redux/userSlice";

import Footer from "./components/navigation/Footer";
import Navbar from "./components/navigation/Navbar";
import Profile from "./pages/account/Profile";

import Account from "./layouts/Account";
import Deposits from "./pages/account/Deposits";
import Withdrawls from "./pages/account/Withdrawls";
import Claims from "./pages/account/Claims";
import Sales from "./pages/account/Sales";
import Affiliate from "./pages/account/Affiliate";
import History from "./pages/account/History";
import Fairness from "./pages/account/Fairness";
import Security from "./pages/account/Security";
import Packs from "./pages/games/Packs";
import Battles from "./pages/games/Battles";
import Rewards from "./pages/games/Rewards";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CreateBattleScreen from "./pages/games/CreateBattleScreen";
import Cart from "./pages/games/Cart";
import Error from "./pages/auth/Error";
import OpenPack from "./pages/games/OpenPack";
import BattleViewer from "./pages/games/BattleViewer";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				dispatch(
					loginUser({
						uid: authUser?.uid,
						username: authUser?.displayName,
						email: authUser?.email,
						photoURL: authUser?.photoURL,
					})
				);
				dispatch(setLoading(false));
			} else {
				console.log("User not logged in");
			}
		});
	}, []);

	// Grabbing a user from global storage via redux
	const user = useSelector((state) => state.data.user.user);

	return (
		<div className="App">
			<Navbar
				websiteContent={
					user ? (
						<Routes>
							<Route path={"*"} element={<Error />} />
							<Route path={"/"} element={<Packs />} />
							<Route path={"/account/login"} element={<Login />} />
							<Route path={"/account/register"} element={<Register />} />

							<Route path={"/packs"} element={<Packs />} />
							<Route path={"/packs/:packId"} element={<OpenPack />} />
							<Route path={"/battles"} element={<Battles />} />
							<Route path={"/battles/:battleURL"} element={<BattleViewer />} />
							<Route
								path={"/battles/createbattle"}
								element={<CreateBattleScreen />}
							/>
							<Route path={"/cart"} element={<Cart />} />
							<Route path={"/rewards"} element={<Rewards />} />

							<Route
								path={"/account/profile"}
								element={
									<Account
										accountElement={<Profile />}
										currentPage={"profile"}
									/>
								}
							/>
							<Route
								path={"/account/deposits"}
								element={
									<Account
										accountElement={<Deposits />}
										currentPage={"deposits"}
									/>
								}
							/>
							<Route
								path={"/account/withdrawls"}
								element={
									<Account
										accountElement={<Withdrawls />}
										currentPage={"withdrawls"}
									/>
								}
							/>
							<Route
								path={"/account/claims"}
								element={
									<Account accountElement={<Claims />} currentPage={"claims"} />
								}
							/>
							<Route
								path={"/account/sales"}
								element={
									<Account accountElement={<Sales />} currentPage={"sales"} />
								}
							/>
							<Route
								path={"/account/history"}
								element={
									<Account
										accountElement={<History />}
										currentPage={"history"}
									/>
								}
							/>
							<Route
								path={"/account/affiliate"}
								element={
									<Account
										accountElement={<Affiliate />}
										currentPage={"affiliate"}
									/>
								}
							/>
							<Route
								path={"/account/fairness"}
								element={
									<Account
										accountElement={<Fairness />}
										currentPage={"fairness"}
									/>
								}
							/>
							<Route
								path={"/account/security"}
								element={
									<Account
										accountElement={<Security />}
										currentPage={"security"}
									/>
								}
							/>
						</Routes>
					) : (
						<Routes>
							<Route path={"*"} element={<Error />} />
							<Route path={"/"} element={<Packs />} />
							<Route path={"/account/login"} element={<Login />} />
							<Route path={"/account/register"} element={<Register />} />

							<Route path={"/packs"} element={<Packs />} />
							<Route path={"/packs/:packId"} element={<OpenPack />} />

							<Route path={"/battles"} element={<Battles />} />
							<Route path={"/battles/:battleURL"} element={<BattleViewer />} />
							<Route path={"/battles/createbattle"} element={<Login />} />
							<Route path={"/cart"} element={<Login />} />
							<Route path={"/rewards"} element={<Rewards />} />
						</Routes>
					)
				}
			/>
			<Footer />
		</div>
	);
}

export default App;
