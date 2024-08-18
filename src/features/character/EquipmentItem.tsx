import { Box, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot, ITEM_RARITY_COLOR_MAP, ItemRarity } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentIcon, HoverButton } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openEquipmentModal } from "features/modals";

interface IProps {
	equipment: IWeapon | IArmour | null;
	slot: EquipmentSlot;
}

export const EquipmentItem: React.FC<IProps> = ({ equipment, slot }) => {
	const dispatch = useAppDispatch();

	const handleViewEquipment = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		if (equipment) {
			dispatch(openEquipmentModal({ item: equipment }));
		}
	};

	if (!equipment) {
		return (
			<Box display="flex" alignItems="center" border="1px solid transparent" gap={2} p={1}>
				<Box
					sx={{
						height: "32px",
						width: "32px",
						border: "2px dashed",
						borderColor: "grey.600",
					}}
				/>
				<Typography color="secondary.main">{EQUIPMENT_SLOT_NAME_MAP[slot]}</Typography>
			</Box>
		);
	}

	return (
		<HoverButton
			onClick={handleViewEquipment}
			sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={2}>
				<EquipmentIcon equipment={equipment} width={32} />
				<Typography color="secondary.main">{EQUIPMENT_SLOT_NAME_MAP[slot]}</Typography>
			</Box>
			<Typography color={ITEM_RARITY_COLOR_MAP[equipment.level as ItemRarity]} textAlign="right" noWrap>
				{equipment.name}
			</Typography>
		</HoverButton>
	);
};
