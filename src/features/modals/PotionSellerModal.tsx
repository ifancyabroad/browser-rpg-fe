import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Link, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closePotionSellerModal, openErrorModal } from "./modalsSlice";
import { HoverButton } from "common/components";
import healthPotion from "assets/images/icons/Res_49_health.png";
import { Fragment, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { buyPotion } from "features/character";
import { MAX_POTIONS, POTION_PRICE } from "common/utils";

export const PotionSellerModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.potionSellerModalOpen);
	const character = useAppSelector((state) => state.character.character);
	const gold = character?.gold ?? 0;
	const potions = character?.potions ?? 0;
	const discountMultiplier = character?.discountMultiplier ?? 1;
	const merchantPrice = Math.round(POTION_PRICE * discountMultiplier);
	const canAfford = gold >= merchantPrice;
	const maxPotionsReached = potions >= MAX_POTIONS;
	const isDisabled = Boolean(!canAfford || maxPotionsReached);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleClose = () => {
		dispatch(closePotionSellerModal());
	};

	const handleBuyPotion = async () => {
		try {
			await dispatch(buyPotion()).unwrap();
			setIsConfirmationOpen(false);
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const openConfirmationModal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	if (!character) {
		return null;
	}

	return (
		<Fragment>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
					Potion Seller
					<Typography component="span" fontSize={16}>
						<Typography component="span" color="secondary">
							Gold:{" "}
						</Typography>
						{character.gold}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<HoverButton
						component={Box}
						isActive={true}
						sx={{
							cursor: "default",
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							gap: 3,
							p: 1,
						}}
					>
						<Box display="flex" alignItems="center" gap={2}>
							<Box sx={{ height: 40, width: 40, img: { verticalAlign: "middle" } }}>
								<img src={healthPotion} alt="Health potion" width="40" />
							</Box>
							<Stack>
								<Typography color="text.secondary">Health Potion</Typography>
								<Typography>Price {merchantPrice}g</Typography>
							</Stack>
						</Box>
						<Link component="button" onClick={openConfirmationModal} disabled={isDisabled}>
							Buy
						</Link>
					</HoverButton>

					{maxPotionsReached && (
						<Typography textAlign="center" color="success.main" mt={2}>
							You have reached the maximum number of potions.
						</Typography>
					)}
				</DialogContent>
				<DialogActions>
					<Link component="button" onClick={handleClose}>
						Close
					</Link>
				</DialogActions>
			</Dialog>

			<ConfirmationModal
				title="Are you sure?"
				content={`Item will cost ${merchantPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleBuyPotion}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
