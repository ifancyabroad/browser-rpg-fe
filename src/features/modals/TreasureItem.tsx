import { Box, Link, Stack, Typography } from "@mui/material";
import { HoverButton } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { EQUIPMENT_TYPE_NAME_MAP } from "common/utils";
import { openEquipmentModal } from "features/modals";
import goldIcon from "assets/images/icons/GoldCoinTen.png";

interface IGoldProps {
	onTake: () => Promise<void>;
}

export const Gold: React.FC<IGoldProps> = ({ onTake }) => {
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";

	const handleTakeItem = () => {
		onTake();
	};

	return (
		<HoverButton
			component={Box}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<Box component="img" src={goldIcon} width={40} height={40} alt="25g" />
				<Typography color="text.secondary">25 Gold</Typography>
			</Box>
			<Link component="button" onClick={handleTakeItem} disabled={isLoading}>
				Take
			</Link>
		</HoverButton>
	);
};

interface IItemProps {
	item: IArmour | IWeapon;
	onTakeItem: (item: IArmour | IWeapon) => Promise<void>;
}

export const TreasureItem: React.FC<IItemProps> = ({ item, onTakeItem }) => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.character.status);
	const isLoading = status === "loading";
	const { icon, name, level, type } = item;

	const handleTakeItem = () => {
		onTakeItem(item);
	};

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<HoverButton
			component={Box}
			sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3, p: 1 }}
			onClick={openEquipmentDetailsModal}
		>
			<Box display="flex" alignItems="center" gap={2} overflow="hidden">
				<Box component="img" src={icon || "https://via.placeholder.com/40"} alt={name} width={40} height={40} />
				<Stack overflow="hidden">
					<Typography color="text.secondary" noWrap>
						{name}
					</Typography>
					<Typography>
						Level {level} {EQUIPMENT_TYPE_NAME_MAP[type]}
					</Typography>
				</Stack>
			</Box>

			<Link component="button" onClick={handleTakeItem} disabled={isLoading}>
				Take
			</Link>
		</HoverButton>
	);
};
