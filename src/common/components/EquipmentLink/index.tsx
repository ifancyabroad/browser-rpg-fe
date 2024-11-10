import { Link } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { IArmour, IWeapon } from "common/types";
import { openEquipmentModal } from "features/modals";

interface IProps {
	item: IArmour | IWeapon;
}

export const EquipmentLink: React.FC<IProps> = ({ item }) => {
	const dispatch = useAppDispatch();

	const openEquipmentDetailsModal = () => {
		dispatch(openEquipmentModal({ item }));
	};

	return (
		<Link component="button" onClick={openEquipmentDetailsModal}>
			{item.name}
		</Link>
	);
};
