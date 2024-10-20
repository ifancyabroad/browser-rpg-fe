import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {
	closeBattleModal,
	closeRewardsModal,
	openErrorModal,
	openLevelUpModal,
	openTreasureModal,
} from "./modalsSlice";
import { getLevelUpAvailable } from "features/character";
import { getTreasureAvailable, nextBattle, returnToTown } from "features/battle";

export const RewardsModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.rewardsModalOpen);
	const battle = useAppSelector((state) => state.battle.battle);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const showLevelUp = useAppSelector(getLevelUpAvailable);
	const showTreasure = useAppSelector(getTreasureAvailable);

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

	if (!battle || !battle.reward) {
		return null;
	}

	const { experience, gold } = battle.reward;
	const { name, boss } = battle.enemy;
	const prefix = boss ? "" : "the ";

	return (
		<Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm">
			<DialogTitle id="form-dialog-title" textAlign="center">
				Victory!
			</DialogTitle>
			<DialogContent>
				<DialogContentText textAlign="center">
					You have defeated{" "}
					<Box component="span" color="primary.main">
						{prefix}
						{name}
					</Box>
					. You gain{" "}
					<Box component="span" color="text.secondary">
						{experience} experience
					</Box>{" "}
					and{" "}
					<Box component="span" color="text.secondary">
						{gold} gold
					</Box>
					.
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{showTreasure && (
					<Link component="button" onClick={handleClaimTreasure} disabled={isLoading}>
						Claim Treasure
					</Link>
				)}
				{showLevelUp && (
					<Link component="button" onClick={handleLevelUp} disabled={isLoading}>
						Level Up
					</Link>
				)}
				<Link component="button" color="text.secondary" onClick={handleReturnToTown} disabled={isLoading}>
					Return to Town
				</Link>
				<Link component="button" onClick={handleNextBattle} disabled={isLoading}>
					Continue
				</Link>
			</DialogActions>
		</Dialog>
	);
};
