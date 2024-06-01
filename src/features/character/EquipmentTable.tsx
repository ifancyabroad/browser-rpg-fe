import { IEquipment } from "common/types";
import { Stack } from "@mui/material";
import { EquipmentItem } from "./EquipmentItem";
import { EQUIPMENT_SLOTS } from "common/utils";

interface IProps {
	equipment: IEquipment;
}

export const EquipmentTable: React.FC<IProps> = ({ equipment }) => {
	return (
		<Stack>
			{EQUIPMENT_SLOTS.map((slot, index) => (
				<EquipmentItem key={index} slot={slot} equipment={equipment[slot]} />
			))}
		</Stack>
	);
};
