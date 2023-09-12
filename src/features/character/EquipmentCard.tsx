import { Button, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import { IArmour, IWeapon } from "common/types";
import { EquipmentTypeIcon } from "common/components";

interface IProps {
	equipment: IWeapon | IArmour | null;
	slot: EquipmentSlot;
}

export const EquipmentCard: React.FC<IProps> = ({ equipment, slot }) => {
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
				action={<Button variant="contained">View</Button>}
			/>
		</Card>
	);
};
