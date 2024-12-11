import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeBattleModal,
	closeRewardsModal,
	openErrorModal,
	openFinalBattleModal,
	openLevelUpModal,
	openTreasureModal,
} from "./modalsSlice";
import { getExperienceProgress, getLevelUpAvailable } from "features/character";
import { getTreasureAvailable, nextBattle, returnToTown } from "features/battle";
import { FINAL_LEVEL } from "common/utils/constants";

export const RewardsModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.rewardsModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const showLevelUp = useAppSelector(getLevelUpAvailable);
	const showTreasure = useAppSelector(getTreasureAvailable);
	const character = useAppSelector((state) => state.character.character);
	const progress = useAppSelector(getExperienceProgress);

	const handleReturnToTown = async () => {
		dispatch(closeBattleModal());
		dispatch(closeRewardsModal());

		try {
			await dispatch(returnToTown()).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleNextBattle = async () => {
		if (battle && battle.level === FINAL_LEVEL - 1) {
			dispatch(openFinalBattleModal());
			return;
		}

		dispatch(closeRewardsModal());

		try {
			await dispatch(nextBattle()).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleClaimTreasure = () => {
		dispatch(openTreasureModal());
	};

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	const handleClose = () => {
		dispatch(closeRewardsModal());
	};

	if (!battle || !battle.reward || !character) {
		return null;
	}

	const { experience, gold } = battle.reward;
	const { name, boss, hero } = battle.enemy;
	const prefix = boss || hero ? "" : "the ";
	const nextBattleLevel = character.maxBattleLevel + 1;
	const nextBattleBoss = nextBattleLevel % 10 === 0;

	return (
		<Dialog open={open} aria-labelledby="rewards-dialog-title" maxWidth="sm">
			<DialogTitle id="rewards-dialog-title" textAlign="center">
				Victory!
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center" mb={2}>
					You have defeated {prefix}{" "}
					<Box component="span" color="primary.main">
						{name}
					</Box>{" "}
					and earned{" "}
					<Box component="span" color="text.secondary">
						{experience} experience
					</Box>{" "}
					and{" "}
					<Box component="span" color="text.secondary">
						{gold} gold
					</Box>
					.
				</DialogContentText>
				<DialogContentText textAlign="center">
					Next battle:{" "}
					<Box component="span" color="text.secondary">
						{nextBattleLevel}
					</Box>
					{nextBattleBoss && (
						<Box component="span" color="error.main">
							{" "}
							(Boss)
						</Box>
					)}
				</DialogContentText>
				<DialogContentText textAlign="center">
					Remaining potions:{" "}
					<Box component="span" color={character.potions > 0 ? "text.secondary" : "error.main"}>
						{character.potions}
					</Box>
				</DialogContentText>
				<DialogContentText textAlign="center">
					Current gold:{" "}
					<Box component="span" color="text.secondary">
						{character.gold}
					</Box>
				</DialogContentText>
				{character.nextLevelExperience &&
					(showLevelUp ? (
						<DialogContentText textAlign="center" sx={{ color: "text.secondary" }}>
							New level reached!{" "}
							<Link component="button" onClick={handleLevelUp} disabled={isLoading}>
								Click here
							</Link>{" "}
							to level up.
						</DialogContentText>
					) : (
						<DialogContentText textAlign="center">
							Next level progress:{" "}
							<Box component="span" color="text.secondary">
								{Math.round(progress)}%
							</Box>
						</DialogContentText>
					))}
			</DialogContent>
			<DialogActions>
				{showTreasure && (
					<Link component="button" color="info.light" onClick={handleClaimTreasure} disabled={isLoading}>
						Claim Treasure
					</Link>
				)}
				<Link component="button" color="text.secondary" onClick={handleReturnToTown} disabled={isLoading}>
					Return to Town
				</Link>
				<Link component="button" onClick={handleNextBattle} disabled={isLoading}>
					Continue
				</Link>
				<Link component="button" color="text.secondary" onClick={handleClose} disabled={isLoading}>
					What happened?
				</Link>
			</DialogActions>
		</Dialog>
	);
};
