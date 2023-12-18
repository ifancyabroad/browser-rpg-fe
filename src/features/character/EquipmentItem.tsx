import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentSlotIcon, EquipmentTypeIcon } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openEquipmentModal } from "features/modals";
import VisibilityIcon from "@mui/icons-material/Visibility";

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
			<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
				<TableCell component="th" scope="row" width={30}>
					<EquipmentSlotIcon slot={slot} width={24} />
				</TableCell>
				<TableCell>
					<Typography variant="body2" color="text.secondary" fontStyle="italic">
						{EQUIPMENT_SLOT_NAME_MAP[slot]}
					</Typography>
				</TableCell>
				<TableCell align="right">
					<Typography variant="body2" color="text.secondary">
						None
					</Typography>
				</TableCell>
				<TableCell />
			</TableRow>
		);
	}

	return (
		<TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
			<TableCell component="th" scope="row" width={30}>
				<EquipmentTypeIcon equipment={equipment} width={24} />
			</TableCell>
			<TableCell>
				<Typography variant="body2" color="text.secondary" fontStyle="italic">
					{EQUIPMENT_SLOT_NAME_MAP[slot]}
				</Typography>
			</TableCell>
			<TableCell align="right">{equipment?.name}</TableCell>
			<TableCell align="right">
				<IconButton aria-label="view" color="primary" onClick={handleViewEquipment}>
					<VisibilityIcon />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};
