import { Box, IconButton, Stack, Typography, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { ConfirmationModal, openEquipmentModal } from "features/modals";
import { Fragment, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Wrapper = styled(Box)(({ theme }) => ({
	display: "flex",
	alignItems: "stretch",

	"&:nth-child(odd)": {
		boxShadow: "inset 0 0 5px rgba(0, 0, 0, 0.349)",
		backgroundColor: "rgba(29, 28, 25, 0.349)",
	},
}));

interface IProps {
	item: IArmour | IWeapon;
	onBuyItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const ShopItem: React.FC<IProps> = ({ item, onBuyItem }) => {
	const dispatch = useAppDispatch();
	const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const character = useAppSelector((state) => state.character.character);
	const gold = character?.gold ?? 0;
	const { icon, name, price } = item;
	const isDisabled = Boolean(price > gold);

	const handleBuyItem = async () => {
		await onBuyItem(item);
		setIsConfirmationOpen(false);
	};

	const openConfirmationModal = () => {
		setIsConfirmationOpen(true);
	};

	const closeConfirmationModal = () => {
		setIsConfirmationOpen(false);
	};

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<Fragment>
			<Wrapper display="flex" alignItems="stretch">
				<Box
					component="img"
					sx={{ height: 85, width: 85, objectFit: "contain" }}
					src={icon || "https://via.placeholder.com/1024"}
					alt={name}
				/>
				<Box
					flex={1}
					display="flex"
					alignItems="center"
					justifyContent="space-between"
					gap={1}
					p={2}
					overflow="hidden"
				>
					<Stack flex={1} minWidth={0}>
						<Typography color="text.secondary" noWrap>
							{name}
						</Typography>
						<Typography variant="body2">Price: {price}g</Typography>
					</Stack>
					<Box display="flex" alignItems="center" gap={1}>
						<IconButton onClick={openEquipmentDetailsModal} color="secondary">
							<SearchIcon />
						</IconButton>
						<IconButton onClick={openConfirmationModal} color="primary" disabled={isDisabled}>
							<ShoppingCartIcon />
						</IconButton>
					</Box>
				</Box>
			</Wrapper>

			<ConfirmationModal
				title="Are you sure?"
				content={`Item will cost ${price}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleBuyItem}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
