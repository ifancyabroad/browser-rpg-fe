import { Box, Link, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { ConfirmationModal, openEquipmentModal } from "features/modals";
import { Fragment, useState } from "react";
import { EquipmentIcon, HoverButton } from "common/components";
import { ITEM_RARITY_COLOR_MAP, ItemRarity } from "common/utils";

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
	const discountMultiplier = character?.discountMultiplier ?? 1;
	const { name, price, level } = item;
	const merchantPrice = Math.round(price * discountMultiplier);
	const isDisabled = Boolean(price > gold);

	const handleBuyItem = async () => {
		await onBuyItem(item);
		setIsConfirmationOpen(false);
	};

	const openConfirmationModal = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
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
			<HoverButton
				component={Box}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 3,
					p: 1,
					overflow: "hidden",
				}}
				onClick={openEquipmentDetailsModal}
			>
				<Box display="flex" alignItems="center" gap={2} overflow="hidden">
					<EquipmentIcon equipment={item} width={40} />
					<Stack overflow="hidden">
						<Typography color={ITEM_RARITY_COLOR_MAP[level as ItemRarity]} noWrap>
							{name}
						</Typography>
						<Typography>Price {merchantPrice}g</Typography>
					</Stack>
				</Box>
				<Link component="button" onClick={openConfirmationModal} disabled={isDisabled}>
					Buy
				</Link>
			</HoverButton>

			<ConfirmationModal
				title="Are you sure?"
				content={`Item will cost ${merchantPrice}g`}
				handleClose={closeConfirmationModal}
				handleConfirm={handleBuyItem}
				open={isConfirmationOpen}
				disabled={isLoading}
			/>
		</Fragment>
	);
};
