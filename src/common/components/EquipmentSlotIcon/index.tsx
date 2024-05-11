import { EQUIPMENT_SLOT_NAME_MAP, EquipmentSlot } from "common/utils";
import headIcon from "assets/images/icons/barbute.svg";
import neckIcon from "assets/images/icons/emerald-necklace.svg";
import bodyIcon from "assets/images/icons/armor-vest.svg";
import waistIcon from "assets/images/icons/belt.svg";
import handsIcon from "assets/images/icons/gloves.svg";
import feetIcon from "assets/images/icons/boots.svg";
import fingerIcon from "assets/images/icons/diamond-ring.svg";
import handIcon from "assets/images/icons/hand.svg";
import { Box, Tooltip } from "@mui/material";

const EQUIPMENT_SLOT_ICON_MAP: Record<EquipmentSlot, string> = {
	[EquipmentSlot.Head]: headIcon,
	[EquipmentSlot.Neck]: neckIcon,
	[EquipmentSlot.Body]: bodyIcon,
	[EquipmentSlot.Waist]: waistIcon,
	[EquipmentSlot.Hands]: handsIcon,
	[EquipmentSlot.Feet]: feetIcon,
	[EquipmentSlot.Finger1]: fingerIcon,
	[EquipmentSlot.Finger2]: fingerIcon,
	[EquipmentSlot.Hand1]: handIcon,
	[EquipmentSlot.Hand2]: handIcon,
};

interface IProps {
	slot: EquipmentSlot;
	width?: number;
}

export const EquipmentSlotIcon: React.FC<IProps> = ({ slot, width = 40 }) => (
	<Tooltip title={EQUIPMENT_SLOT_NAME_MAP[slot]} placement="top">
		<Box sx={{ height: width, width, img: { verticalAlign: "middle" } }}>
			<img src={EQUIPMENT_SLOT_ICON_MAP[slot]} alt={EQUIPMENT_SLOT_NAME_MAP[slot]} width={width} />
		</Box>
	</Tooltip>
);
