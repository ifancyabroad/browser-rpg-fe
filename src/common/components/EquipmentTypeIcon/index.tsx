import { EQUIPMENT_TYPE_NAME_MAP, EquipmentType, WeaponType } from "common/utils";
import helmetIcon from "assets/images/icons/barbute.svg";
import amuletIcon from "assets/images/icons/emerald-necklace.svg";
import armourIcon from "assets/images/icons/armor-vest.svg";
import beltIcon from "assets/images/icons/belt.svg";
import glovesIcon from "assets/images/icons/gloves.svg";
import bootsIcon from "assets/images/icons/boots.svg";
import ringIcon from "assets/images/icons/diamond-ring.svg";
import weaponIcon from "assets/images/icons/broadsword.svg";
import shieldIcon from "assets/images/icons/shield.svg";
import axeIcon from "assets/images/icons/battle-axe.svg";
import bowIcon from "assets/images/icons/high-shot.svg";
import clubIcon from "assets/images/icons/wood-club.svg";
import crossbowIcon from "assets/images/icons/crossbow.svg";
import daggerIcon from "assets/images/icons/broad-dagger.svg";
import hammerIcon from "assets/images/icons/warhammer.svg";
import maceIcon from "assets/images/icons/flanged-mace.svg";
import spearIcon from "assets/images/icons/barbed-spear.svg";
import staffIcon from "assets/images/icons/wizard-staff.svg";
import swordIcon from "assets/images/icons/broadsword.svg";
import { Box, Tooltip } from "@mui/material";
import { IArmour, IWeapon } from "common/types";

const EQUIPMENT_TYPE_ICON_MAP: Record<EquipmentType | WeaponType, string> = {
	[EquipmentType.Amulet]: amuletIcon,
	[EquipmentType.Armour]: armourIcon,
	[EquipmentType.Belt]: beltIcon,
	[EquipmentType.Boots]: bootsIcon,
	[EquipmentType.Gloves]: glovesIcon,
	[EquipmentType.Helmet]: helmetIcon,
	[EquipmentType.Ring]: ringIcon,
	[EquipmentType.Shield]: shieldIcon,
	[EquipmentType.Weapon]: weaponIcon,
	[WeaponType.Axe]: axeIcon,
	[WeaponType.Bow]: bowIcon,
	[WeaponType.Club]: clubIcon,
	[WeaponType.Crossbow]: crossbowIcon,
	[WeaponType.Dagger]: daggerIcon,
	[WeaponType.Hammer]: hammerIcon,
	[WeaponType.Mace]: maceIcon,
	[WeaponType.Spear]: spearIcon,
	[WeaponType.Staff]: staffIcon,
	[WeaponType.Sword]: swordIcon,
};

interface IProps {
	equipment: IArmour | IWeapon;
	width?: number;
}

export const EquipmentTypeIcon: React.FC<IProps> = ({ equipment, width = 40 }) => {
	const type = "weaponType" in equipment ? equipment.weaponType : equipment.type;

	return (
		<Tooltip title={EQUIPMENT_TYPE_NAME_MAP[type]} placement="top">
			<Box sx={{ height: width, width, img: { verticalAlign: "middle" } }}>
				<img src={EQUIPMENT_TYPE_ICON_MAP[type]} alt={EQUIPMENT_TYPE_NAME_MAP[type]} width={width} />
			</Box>
		</Tooltip>
	);
};
