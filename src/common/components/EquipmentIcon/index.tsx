import { Box } from "@mui/material";
import { IArmour, IWeapon } from "common/types";

interface IProps {
	equipment: IWeapon | IArmour;
	width?: number;
}

export const EquipmentIcon: React.FC<IProps> = ({ equipment, width = 40 }) => {
	return (
		<Box sx={{ height: width, width, img: { verticalAlign: "middle" } }}>
			{equipment.icon ? (
				<img src={equipment.icon} alt={equipment.name} width={width} />
			) : (
				<img src={`https://via.placeholder.com/${width}`} alt={equipment.name} />
			)}
		</Box>
	);
};
