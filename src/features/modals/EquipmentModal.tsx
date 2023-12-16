import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	Grid,
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
		<Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" scroll="body">
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<Box
							component="img"
							src={icon || "https://via.placeholder.com/1024"}
							alt={name}
							maxWidth="100%"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<Typography variant="h4" mb={2}>
							{name}
						</Typography>
						<Stack spacing={1} mb={3}>
							<Box display="flex" gap={1}>
								<Typography variant="body1">Type:</Typography>
								<DialogContentText>{EQUIPMENT_TYPE_NAME_MAP[type]}</DialogContentText>
							</Box>
							{isArmour && (
								<Fragment>
									<Box display="flex" gap={1}>
										<Typography variant="body1">Armour Type:</Typography>
										<DialogContentText>
											{item.armourType && ARMOUR_TYPE_NAME_MAP[item.armourType]}
										</DialogContentText>
									</Box>
									<Box display="flex" gap={1}>
										<Typography variant="body1">Armour Class:</Typography>
										<DialogContentText>{item.armourClass}</DialogContentText>
									</Box>
								</Fragment>
							)}
							{isWeapon && (
								<Fragment>
									<Box display="flex" gap={1}>
										<Typography variant="body1">Size:</Typography>
										<DialogContentText>{WEAPON_SIZE_NAME_MAP[item.size]}</DialogContentText>
									</Box>
									<Box display="flex" gap={1}>
										<Typography variant="body1">Damage:</Typography>
										<DialogContentText>
											{item.min}-{item.max}
										</DialogContentText>
									</Box>
								</Fragment>
							)}
							<Box display="flex" gap={1}>
								<Typography variant="body1">Price:</Typography>
								<DialogContentText>{price}g</DialogContentText>
							</Box>
						</Stack>
						<Stack spacing={2}>
							<Box>
								<Typography variant="h6">Description</Typography>
								<DialogContentText>{description}</DialogContentText>
							</Box>
							{properties && properties.length && (
								<Box>
									<Typography variant="h6">Properties</Typography>
									<Stack spacing={1}>
										<PropertyList properties={properties} />
									</Stack>
								</Box>
							)}
						</Stack>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color="primary" variant="contained">
					Close
				</Button>
			</DialogActions>
		</Dialog>
	);
};
