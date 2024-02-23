import { Box, Dialog, Stack, styled } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { closeShopModal, openErrorModal, openReplaceItemModal } from "./modalsSlice";
import { CharacterSheetTab, getAvailableItemSlot } from "common/utils";
import { useEffect } from "react";
import {
	GameDialogActions,
	GameDialogButton,
	GameDialogCloseButton,
	GameDialogContent,
	GameDialogPaper,
	GameModalTitle,
	IconWrapper,
} from "common/components";
import equipmentIcon from "assets/images/ui/EquipmentIcon.png";
import { ReactComponent as CrossIcon } from "assets/images/ui/CrossIcon.svg";
import { buyItem, getIsTwoHandedWeaponEquipped, setCharacterSheetTab, viewItems } from "features/character";
import { getCurrentLocation } from "features/dungeon";
import { IArmour, IWeapon } from "common/types";
import { ShopItem } from "./ShopItem";
import buttonFrame from "assets/images/ui/ModalButtonFrame.png";
import goldIcon from "assets/images/ui/GoldIcon.png";

const GoldWrapper = styled(Box)(({ theme }) => ({
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "140px",
	height: "55px",
	fontFamily: "'Cinzel', serif",
	padding: theme.spacing(1.5),
}));

export const ShopModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.shopModalOpen);
	const isTwoHandedWeaponEquipped = useAppSelector(getIsTwoHandedWeaponEquipped);
	const character = useAppSelector((state) => state.character.character);
	const availableItems = character ? character.availableItems : [];
	const location = useAppSelector(getCurrentLocation);

	useEffect(() => {
		dispatch(setCharacterSheetTab(CharacterSheetTab.Inventory));
		dispatch(viewItems());
	}, [dispatch]);

	if (!character || !location) {
		return null;
	}

	const handleClose = () => {
		dispatch(closeShopModal());
	};

	const handleBuyItem = async (item: IArmour | IWeapon) => {
		try {
			const slot = getAvailableItemSlot(item, character.equipment, isTwoHandedWeaponEquipped);
			if (slot) {
				await dispatch(buyItem({ id: item.id, slot, location })).unwrap();
				return Promise.resolve();
			}

			dispatch(openReplaceItemModal({ item }));
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose} PaperComponent={GameDialogPaper}>
			<GameModalTitle title="Shop" icon={equipmentIcon} />
			<GameDialogContent>
				<GameDialogCloseButton onClick={handleClose} />
				<Stack sx={{ height: "100%", overflowY: "auto" }}>
					{availableItems.map((item) => (
						<ShopItem key={item.id} item={item} onBuyItem={handleBuyItem} />
					))}
				</Stack>
			</GameDialogContent>
			<GameDialogActions sx={{ justifyContent: "space-between" }}>
				<GoldWrapper>
					<Box
						sx={{
							flex: 1,
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							gap: 1,
							height: "100%",
						}}
					>
						{character.gold}{" "}
						<Box component="img" src={goldIcon} alt="gold" width="20px" sx={{ verticalAlign: "middle" }} />
					</Box>
				</GoldWrapper>
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
