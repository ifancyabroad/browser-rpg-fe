import { TableCell, TableRow, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentSlotIcon, EquipmentTypeIcon, TableRowButton } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openEquipmentModal } from "features/modals";

interface IProps {
	equipment: IWeapon | IArmour | null;
	slot: EquipmentSlot;
}

export const EquipmentItem: React.FC<IProps> = ({ equipment, slot }) => {
	const dispatch = useAppDispatch();

	const handleViewEquipment = (e: React.SyntheticEvent<HTMLTableRowElement>) => {
		if (equipment) {
			dispatch(openEquipmentModal({ item: equipment }));
		}
	};

	if (!equipment) {
		return (
			<TableRow>
				<TableCell component="th" scope="row" width={30}>
					<EquipmentSlotIcon slot={slot} width={24} />
				</TableCell>
				<TableCell>
					<Typography color="secondary.main">{EQUIPMENT_SLOT_NAME_MAP[slot]}</Typography>
				</TableCell>
				<TableCell align="center" colSpan={2} sx={{ fontStyle: "italic", color: "text.disabled" }}>
					Nothing equipped
				</TableCell>
			</TableRow>
		);
	}

	return (
		<TableRowButton onClick={handleViewEquipment}>
			<TableCell component="th" scope="row" width={30}>
				<EquipmentTypeIcon equipment={equipment} width={24} />
			</TableCell>
			<TableCell sx={{ color: "secondary.main" }}>{EQUIPMENT_SLOT_NAME_MAP[slot]}</TableCell>
			<TableCell>Level {equipment.level}</TableCell>
			<TableCell align="right" sx={{ color: "text.secondary" }}>
				{equipment?.name}
			</TableCell>
		</TableRowButton>
	);
};
