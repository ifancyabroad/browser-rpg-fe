import { Box, Link, Stack, Typography } from "@mui/material";
import { EquipmentIcon, EquipmentLink, HoverButton } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import {
	EQUIPMENT_TYPE_NAME_MAP,
	ITEM_RARITY_COLOR_MAP,
	ITEM_RARITY_NAME_MAP,
	ItemRarity,
	REWARD_GOLD_MULTIPLIER,
} from "common/utils";
import { openEquipmentModal } from "features/modals";
import goldIcon from "assets/images/icons/GoldCoinTen.png";
import { Fragment } from "react";

interface IGoldProps {
	level: number;
	onTake: () => Promise<void>;
}

export const Gold: React.FC<IGoldProps> = ({ level, onTake }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const gold = REWARD_GOLD_MULTIPLIER * level;

	const handleTakeItem = () => {
		onTake();
	};

	return (
		<HoverButton
			component={Box}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<Box component="img" src={goldIcon} width={40} height={40} alt={`${gold}g`} />
				<Typography color="text.secondary">{gold} Gold</Typography>
			</Box>
			<Link component="button" onClick={handleTakeItem} disabled={isLoading}>
				Take
			</Link>
		</HoverButton>
	);
};

interface IItemProps {
	item: IArmour | IWeapon;
	replaceItems: (IArmour | IWeapon)[];
	onTakeItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const TreasureItem: React.FC<IItemProps> = ({ item, replaceItems, onTakeItem }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const { name, level, type } = item;

	const handleTakeItem = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		e.preventDefault();
		onTakeItem(item);
	};

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<Box
			sx={{
				width: "100%",
			}}
		>
			<HoverButton
				component={Box}
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					gap: 3,
					p: 1,
				}}
				onClick={openEquipmentDetailsModal}
			>
				<Box display="flex" alignItems="center" gap={2} overflow="hidden">
					<EquipmentIcon equipment={item} width={40} />
					<Stack overflow="hidden">
						<Typography color={ITEM_RARITY_COLOR_MAP[level as ItemRarity]} noWrap>
							{name}
						</Typography>
						<Typography>
							{ITEM_RARITY_NAME_MAP[level as ItemRarity]} {EQUIPMENT_TYPE_NAME_MAP[type]}
						</Typography>
					</Stack>
				</Box>

				<Link component="button" onClick={handleTakeItem} disabled={isLoading}>
					Take
				</Link>
			</HoverButton>

			{replaceItems.length > 0 && (
				<Typography component="p" variant="caption">
					Replace:{" "}
					{replaceItems.map((replaceItem, index) => (
						<Fragment key={replaceItem.id}>
							<EquipmentLink item={replaceItem} />
							{index < replaceItems.length - 1 && ", "}
						</Fragment>
					))}
				</Typography>
			)}
		</Box>
	);
};
