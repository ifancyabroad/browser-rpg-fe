import { IEquipment } from "common/types";
import { Stack } from "@mui/material";
import { EquipmentCard } from "./EquipmentCard";
import { EquipmentSlot } from "common/utils";

interface IProps {
	equipment: IEquipment;
}

export const EquipmentList: React.FC<IProps> = ({ equipment }) => {
	return (
		<Stack spacing={2} my={2}>
			{Object.keys(equipment).map((slot, index) => {
				const item = equipment[slot as EquipmentSlot];

				return <EquipmentCard key={index} slot={slot as EquipmentSlot} equipment={item} />;
			})}
		</Stack>
	);
};
