import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentSlotIcon, EquipmentTypeIcon } from "common/components";
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
			<TableRow>
				<TableCell component="th" scope="row" width={30}>
					<EquipmentSlotIcon slot={slot} width={24} />
				</TableCell>
				<TableCell>
					<Typography variant="body2" color="secondary.main">
						{EQUIPMENT_SLOT_NAME_MAP[slot]}
					</Typography>
				</TableCell>
				<TableCell align="right">
					<Typography variant="body2">None</Typography>
				</TableCell>
			</TableRow>
		);
	}

	return (
		<TableRow>
			<TableCell component="th" scope="row" width={30}>
				<EquipmentTypeIcon equipment={equipment} width={24} />
			</TableCell>
			<TableCell>
				<Typography variant="body2" color="secondary.main">
					{EQUIPMENT_SLOT_NAME_MAP[slot]}
				</Typography>
			</TableCell>
			<TableCell align="right">
				<Button variant="text" onClick={handleViewEquipment}>
					{equipment?.name}
				</Button>
			</TableCell>
		</TableRow>
	);
};
