import { IEquipment } from "common/types";
import { Stack } from "@mui/material";
import { EquipmentCard } from "./EquipmentCard";
import { EQUIPMENT_SLOTS } from "common/utils";

interface IProps {
	equipment: IEquipment;
}

export const EquipmentList: React.FC<IProps> = ({ equipment }) => {
	return (
		<Stack spacing={2} my={2}>
			{EQUIPMENT_SLOTS.map((slot, index) => (
				<EquipmentCard key={index} slot={slot} equipment={equipment[slot]} />
			))}
		</Stack>
	);
};
