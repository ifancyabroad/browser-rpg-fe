import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closePotionSellerModal, openErrorModal } from "./modalsSlice";
import { HoverButton } from "common/components";
import healthPotion from "assets/images/icons/Res_49_health.png";
import { Fragment, useEffect, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { buyPotion } from "features/character";
import { getRandomElement, MAX_POTIONS, POTION_SELLER_QUOTES } from "common/utils";
import potionSeller from "assets/images/icons/Human_66_nobg.png";

export const PotionSellerModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.potionSellerModalOpen);
	const character = useAppSelector((state) => state.character.character);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const [isMaxConfirmationOpen, setIsMaxConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const [currentQuote, setCurrentQuote] = useState(getRandomElement(POTION_SELLER_QUOTES));
	const currentPotions = character?.potions ?? 0;
	const availablePotions = MAX_POTIONS - currentPotions;

	useEffect(() => {
		if (!open) {
			setCurrentQuote(getRandomElement(POTION_SELLER_QUOTES));
		}
	}, [open]);

	const handleClose = () => {
		dispatch(closePotionSellerModal());
	};

	const handleBuyPotion = async () => {
		try {
			await dispatch(buyPotion({ quantity: 1 })).unwrap();
			setIsConfirmationOpen(false);
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleBuyMaxPotions = async () => {
		try {
			await dispatch(buyPotion({ quantity: availablePotions })).unwrap();
			setIsMaxConfirmationOpen(false);
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

	const openMaxConfirmationModal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		setIsMaxConfirmationOpen(true);
	};

	const closeMaxConfirmationModal = () => {
		setIsMaxConfirmationOpen(false);
	};

	if (!character) {
		return null;
	}

	const { gold, potions, potionPrice } = character;
	const canAfford = gold >= potionPrice;
	const maxPotionsReached = potions >= MAX_POTIONS;
	const isDisabled = Boolean(!canAfford || maxPotionsReached);
	const maxPrice = potionPrice * availablePotions;
	const canAffordMax = gold >= maxPrice;
	const isDisabledMax = Boolean(!canAffordMax || maxPotionsReached);

	return (
		<Fragment>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
					<Box>
						<Box
							component="img"
							src={potionSeller}
							alt="Potion Seller"
							width={40}
							borderRadius="50%"
							sx={{ verticalAlign: "middle" }}
							mr={1}
						/>
						Potion Seller
					</Box>
					<Typography component="span" fontSize={16}>
						<Typography component="span" color="secondary">
							Gold:{" "}
						</Typography>
						{gold}
					</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText textAlign="center" fontStyle="italic" mb={2}>
						{currentQuote}
					</DialogContentText>

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
								<Typography>Price {potionPrice}g</Typography>
							</Stack>
						</Box>
						<Link component="button" onClick={openConfirmationModal} disabled={isDisabled}>
							Buy
						</Link>
					</HoverButton>

					<Box display="flex" justifyContent="center" alignItems="center" gap={2} textAlign="center" mt={1}>
						<DialogContentText sx={{ color: "text.secondary" }}>
							Potions: {potions}/{MAX_POTIONS}
						</DialogContentText>

						<DialogContentText>
							<Link component="button" onClick={openMaxConfirmationModal} disabled={isDisabledMax}>
								Max
							</Link>{" "}
							({maxPrice}g)
						</DialogContentText>
					</Box>

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
				content={`Item will cost ${potionPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleBuyPotion}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>

			<ConfirmationModal
				title="Are you sure?"
				content={`You will buy ${availablePotions} potions for ${maxPrice}g`}
				handleClose={closeMaxConfirmationModal}
				handleConfirm={handleBuyMaxPotions}
				open={isMaxConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
