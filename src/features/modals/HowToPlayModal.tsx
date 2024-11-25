import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeHowToPlayModal } from "./modalsSlice";
import tavern from "assets/images/tutorial/tile319.png";
import dungeon from "assets/images/tutorial/tile365.png";
import merchant from "assets/images/tutorial/tile549.png";
import hut from "assets/images/tutorial/tile326.png";

export const HowToPlayModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.howToPlayModalOpen);

	const handleClose = () => {
		localStorage.setItem("tutorial", "true");
		dispatch(closeHowToPlayModal());
	};

	return (
		<Dialog open={open} aria-labelledby="how-to-play-dialog-title" onClose={handleClose} maxWidth="sm">
			<DialogTitle id="how-to-play-dialog-title" textAlign="center">
				How to Play
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="left" mb={2}>
					Welcome to{" "}
					<Box component="span" color="text.secondary">
						Browser Heroes
					</Box>
					! As a hero you have been tasked with defeating the evil monsters that plague the land and thereby
					ensuring the safety of the peaceful townsfolk.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Objective
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Progress as far as you can through the zones, defeating monsters and collecting treasure along the
					way.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Controls
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Use the mouse to navigate around town and click the buttons to interact with the game.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Town
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Here you can purchase items from the shop, rest to restore abilities and health or leave the town to
					fight monsters.
				</DialogContentText>
				<Stack spacing={1} mb={2}>
					<DialogContentText textAlign="left" display="flex" alignItems="center" gap={1}>
						<img src={tavern} alt="Tavern" /> -{" "}
						<span>
							<Box component="span" color="text.secondary">
								Tavern:
							</Box>{" "}
							Rest to restore abilities and health.
						</span>
					</DialogContentText>
					<DialogContentText textAlign="left" display="flex" alignItems="center" gap={1}>
						<img src={merchant} alt="Merchant" /> -{" "}
						<span>
							<Box component="span" color="text.secondary">
								Merchant:
							</Box>{" "}
							Purchase items from the shop.
						</span>
					</DialogContentText>
					<DialogContentText textAlign="left" display="flex" alignItems="center" gap={1}>
						<img src={hut} alt="Hut" /> -{" "}
						<span>
							<Box component="span" color="text.secondary">
								Potion Seller:
							</Box>{" "}
							Purchase potions to restore health.
						</span>
					</DialogContentText>
					<DialogContentText textAlign="left" display="flex" alignItems="center" gap={1}>
						<img src={dungeon} alt="Dungeon" /> -{" "}
						<span>
							<Box component="span" color="text.secondary">
								Exit:
							</Box>{" "}
							Leave the town to fight monsters.
						</span>
					</DialogContentText>
				</Stack>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Combat
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Once you leave the town, you will face a series of monsters. Click on your abilities to defeat them
					and progress through the levels.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Experience
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Defeating monsters will earn you experience points. Gain enough experience points to level up and
					improve your attributes and abilities.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Equipment
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Collect equipment from defeated monsters and the shop to improve your chances of survival.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Potions
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Purchase potions from the potion seller to restore health during combat.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "info.light" }}>
					Multiplier
				</DialogContentText>
				<DialogContentText textAlign="left" mb={2}>
					Defeat monsters in succession to increase your multiplier and earn more gold.
				</DialogContentText>
				<DialogContentText textAlign="left" sx={{ color: "text.secondary" }}>
					Good Luck Hero!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
