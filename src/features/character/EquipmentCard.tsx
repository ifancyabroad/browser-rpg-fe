import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentTypeIcon } from "common/components";
import { useAppDispatch } from "common/hooks";
import { openEquipmentModal } from "features/modals";

interface IProps {
	equipment: IWeapon | IArmour | null;
	slot: EquipmentSlot;
}

export const EquipmentCard: React.FC<IProps> = ({ equipment, slot }) => {
	const dispatch = useAppDispatch();

	const handleViewEquipment = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		if (equipment) {
			dispatch(openEquipmentModal({ item: equipment }));
		}
	};

	if (!equipment) {
		return (
			<Card>
				<CardContent>
					<Typography variant="body2">{EQUIPMENT_SLOT_NAME_MAP[slot]}</Typography>
					<Typography variant="body2" color="textSecondary">
						None
					</Typography>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader
				avatar={<EquipmentTypeIcon equipment={equipment} />}
				title={EQUIPMENT_SLOT_NAME_MAP[slot]}
				subheader={equipment?.name}
				action={
					<Button variant="contained" onClick={handleViewEquipment}>
						View
					</Button>
				}
			/>
		</Card>
	);
};
