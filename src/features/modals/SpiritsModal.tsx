import {
	Box,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeSpiritsModal, openErrorModal } from "./modalsSlice";
import { Fragment, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";
import { disableSpirits } from "features/character";
import creature from "assets/images/icons/Monster_Ghost_nb.png";

export const SpiritsModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.spiritsModalOpen);
	const character = useAppSelector((state) => state.character.character);
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleClose = () => {
		dispatch(closeSpiritsModal());
	};

	const handleDisableSpirits = async () => {
		try {
			await dispatch(disableSpirits()).unwrap();
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

	const { gold, spiritsDisabled, disableSpiritsPrice } = character;
	const canAfford = gold >= disableSpiritsPrice;
	const isDisabled = Boolean(!canAfford || spiritsDisabled);

	return (
		<Fragment>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
					<Box>
						<Box
							component="img"
							src={creature}
							alt="Spirit warder"
							width={40}
							borderRadius="50%"
							sx={{ verticalAlign: "middle" }}
							mr={1}
						/>
						???
					</Box>
					<Typography component="span" fontSize={16}>
						<Typography component="span" color="secondary">
							Gold:{" "}
						</Typography>
						{gold}
					</Typography>
				</DialogTitle>
				<DialogContent>
					{spiritsDisabled ? (
						<DialogContentText textAlign="center" fontStyle="italic">
							The well is silent as the spirits are at rest.
						</DialogContentText>
					) : (
						<Fragment>
							<DialogContentText textAlign="center" fontStyle="italic" mb={2}>
								A mysterious voice from the bottom of the well offers to ward off the spirits of other
								heroes for a day but it will cost you.
							</DialogContentText>
							<DialogContentText textAlign="center" sx={{ color: "text.secondary" }}>
								<Link component="button" onClick={openConfirmationModal} disabled={isDisabled}>
									Donate
								</Link>{" "}
								({disableSpiritsPrice})g
							</DialogContentText>
						</Fragment>
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
				content={`It will cost ${disableSpiritsPrice}g to ward off the spirits until you rest again.`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleDisableSpirits}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
