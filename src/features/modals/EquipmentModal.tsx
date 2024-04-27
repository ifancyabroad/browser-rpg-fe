import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Stack,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeEquipmentModal } from "./modalsSlice";
import { ARMOUR_TYPE_NAME_MAP, EQUIPMENT_TYPE_NAME_MAP, WEAPON_SIZE_NAME_MAP } from "common/utils";
import { Fragment } from "react";
import { PropertyList } from "common/components";

export const EquipmentModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, item } = useAppSelector((state) => state.modals.equipmentModal);

	const handleClose = () => {
		dispatch(closeEquipmentModal());
	};

	if (!item) {
		return null;
	}

	const { name, description, icon, type, price, properties } = item;
	const isArmour = "armourType" in item;
	const isWeapon = "weaponType" in item;

	return (
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" scroll="body">
			<DialogTitle>{name}</DialogTitle>
			<DialogContent>
				<Box
					component="img"
					src={icon || "https://via.placeholder.com/1024"}
					alt={name}
					width="100%"
					maxWidth={300}
				/>
				<Stack spacing={1} mb={3}>
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Type:</Typography>
						<DialogContentText>{EQUIPMENT_TYPE_NAME_MAP[type]}</DialogContentText>
					</Box>
					{isArmour && (
						<Fragment>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Armour Type:</Typography>
								<DialogContentText>
									{item.armourType && ARMOUR_TYPE_NAME_MAP[item.armourType]}
								</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Armour Class:</Typography>
								<DialogContentText>{item.armourClass}</DialogContentText>
							</Box>
						</Fragment>
					)}
					{isWeapon && (
						<Fragment>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Size:</Typography>
								<DialogContentText>{WEAPON_SIZE_NAME_MAP[item.size]}</DialogContentText>
							</Box>
							<Box display="flex" gap={1}>
								<Typography color="secondary.main">Damage:</Typography>
								<DialogContentText>
									{item.min}-{item.max}
								</DialogContentText>
							</Box>
						</Fragment>
					)}
					<Box display="flex" gap={1}>
						<Typography color="secondary.main">Price:</Typography>
						<DialogContentText>{price}g</DialogContentText>
					</Box>
				</Stack>
				<Stack spacing={2}>
					<Box>
						<Typography color="info.main">Description</Typography>
						<DialogContentText>{description}</DialogContentText>
					</Box>
					{properties && properties.length && (
						<Box>
							<Typography color="info.main">Properties</Typography>
							<Stack spacing={1}>
								<PropertyList properties={properties} />
							</Stack>
						</Box>
					)}
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};
