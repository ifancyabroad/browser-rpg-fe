import { IEquipment } from "common/types";
import { Table, TableBody, TableContainer } from "@mui/material";
import { EquipmentItem } from "./EquipmentItem";
import { EQUIPMENT_SLOTS } from "common/utils";
import { TransparentPaper } from "common/components";

interface IProps {
	equipment: IEquipment;
}

export const EquipmentTable: React.FC<IProps> = ({ equipment }) => {
	return (
		<TableContainer component={TransparentPaper} sx={{ my: 2 }}>
			<Table size="small">
				<TableBody>
					{EQUIPMENT_SLOTS.map((slot, index) => (
						<EquipmentItem key={index} slot={slot} equipment={equipment[slot]} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
