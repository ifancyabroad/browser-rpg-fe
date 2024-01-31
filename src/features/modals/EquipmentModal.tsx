import { Box, Dialog, Grid, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeEquipmentModal } from "./modalsSlice";
import { ARMOUR_TYPE_NAME_MAP, EQUIPMENT_TYPE_NAME_MAP, WEAPON_SIZE_NAME_MAP } from "common/utils";
import { Fragment } from "react";
import {
	GameDialogActions,
	GameDialogButton,
	GameDialogCloseButton,
	GameDialogContent,
	GameDialogPaper,
	GameModalTitle,
	IconWrapper,
	ImageBorder,
	Parchment,
	PropertyList,
} from "common/components";
import equipmentIcon from "assets/images/ui/EquipmentIcon.png";
import { ReactComponent as CrossIcon } from "assets/images/ui/CrossIcon.svg";

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
		<Dialog open={open} onClose={handleClose} PaperComponent={GameDialogPaper}>
			<GameModalTitle title="Equipment" icon={equipmentIcon} />
			<GameDialogContent>
				<GameDialogCloseButton onClick={handleClose} />
				<Parchment>
					<Typography variant="h5" mb={2}>
						{name}
					</Typography>
					<Grid container spacing={2} mb={3}>
						<Grid item xs={12} md={6} display={{ xs: "none", md: "block" }}>
							<ImageBorder>
								<Box
									component="img"
									src={icon || "https://via.placeholder.com/1024"}
									alt={name}
									maxWidth="100%"
								/>
							</ImageBorder>
						</Grid>
						<Grid item xs={12} md={6}>
							<Stack spacing={1} mb={3}>
								<Box display="flex" gap={1}>
									<Typography variant="body2" fontWeight="bold">
										Type:
									</Typography>
									<Typography variant="body2">{EQUIPMENT_TYPE_NAME_MAP[type]}</Typography>
								</Box>
								{isArmour && (
									<Fragment>
										<Box display="flex" gap={1}>
											<Typography variant="body2" fontWeight="bold">
												Armour Type:
											</Typography>
											<Typography variant="body2">
												{item.armourType && ARMOUR_TYPE_NAME_MAP[item.armourType]}
											</Typography>
										</Box>
										<Box display="flex" gap={1}>
											<Typography variant="body2" fontWeight="bold">
												Armour Class:
											</Typography>
											<Typography variant="body2">{item.armourClass}</Typography>
										</Box>
									</Fragment>
								)}
								{isWeapon && (
									<Fragment>
										<Box display="flex" gap={1}>
											<Typography variant="body2" fontWeight="bold">
												Size:
											</Typography>
											<Typography variant="body2">{WEAPON_SIZE_NAME_MAP[item.size]}</Typography>
										</Box>
										<Box display="flex" gap={1}>
											<Typography variant="body2" fontWeight="bold">
												Damage:
											</Typography>
											<Typography variant="body2">
												{item.min}-{item.max}
											</Typography>
										</Box>
									</Fragment>
								)}
								<Box display="flex" gap={1}>
									<Typography variant="body2" fontWeight="bold">
										Price:
									</Typography>
									<Typography variant="body2">{price}g</Typography>
								</Box>
							</Stack>
						</Grid>
					</Grid>
					<Stack spacing={2}>
						<Box>
							<Typography variant="h6">Description</Typography>
							<Typography variant="body2">{description}</Typography>
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
				</Parchment>
			</GameDialogContent>
			<GameDialogActions>
				<GameDialogButton onClick={handleClose}>
					Close
					<IconWrapper>
						<CrossIcon width={20} height={20} />
					</IconWrapper>
				</GameDialogButton>
			</GameDialogActions>
		</Dialog>
	);
};
