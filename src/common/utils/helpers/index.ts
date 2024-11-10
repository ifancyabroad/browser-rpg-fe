import { IArmour, IEquipment, ISkill, ITileProperties, IWeapon, TProperty } from "common/types";
import {
	DamageType,
	EffectType,
	EquipmentSlot,
	EquipmentType,
	SkillType,
	Target,
	WeaponSize,
} from "common/utils/enums";
import { ACTION_TILES, DAMAGE_CONFIG, EQUIPMENT_SLOT_TYPE_MAP, PROPERTY_CONFIG } from "common/utils/constants";
import TiledMap from "tiled-types";

export const getSkillType = (skill: ISkill) => {
	const { effects } = skill;
	const offensiveEffectTypes = effects
		.filter((effect) => effect.target === Target.Enemy)
		.map((effect) => effect.type);
	const defensiveEffectTypes = effects.filter((effect) => effect.target === Target.Self).map((effect) => effect.type);

	if (offensiveEffectTypes.includes(EffectType.WeaponDamage)) {
		return SkillType.WeaponAttack;
	}

	if (offensiveEffectTypes.includes(EffectType.Damage)) {
		return SkillType.Attack;
	}

	if (offensiveEffectTypes.includes(EffectType.Status) || offensiveEffectTypes.includes(EffectType.Auxiliary)) {
		return SkillType.Debuff;
	}

	if (defensiveEffectTypes.includes(EffectType.Heal)) {
		return SkillType.Heal;
	}

	if (defensiveEffectTypes.includes(EffectType.Status) || defensiveEffectTypes.includes(EffectType.Auxiliary)) {
		return SkillType.Buff;
	}

	return SkillType.Other;
};

const handSlots = [EquipmentSlot.Hand1, EquipmentSlot.Hand2];

export const getFilteredSlots = (equipmentType: EquipmentType, isTwoHandedWeaponEquipped: boolean) =>
	EQUIPMENT_SLOT_TYPE_MAP[equipmentType].filter((slot) => !(handSlots.includes(slot) && isTwoHandedWeaponEquipped));

export const getAvailableItemSlot = (
	item: IArmour | IWeapon,
	equipment: IEquipment,
	isTwoHandedWeaponEquipped: boolean,
) => {
	if ("size" in item && item.size === WeaponSize.TwoHanded) {
		const isBothHandsFree = handSlots.every((slot) => equipment[slot] === null);
		return isBothHandsFree ? EquipmentSlot.Hand1 : undefined;
	}

	const slots = getFilteredSlots(item.type, isTwoHandedWeaponEquipped);
	return slots.find((slot) => equipment[slot] === null);
};

export const getItemsToReplace = (
	item: IArmour | IWeapon,
	equipment: IEquipment,
	isTwoHandedWeaponEquipped: boolean,
) => {
	const slots = EQUIPMENT_SLOT_TYPE_MAP[item.type];

	if (getAvailableItemSlot(item, equipment, isTwoHandedWeaponEquipped)) {
		return [];
	}

	if (isTwoHandedWeaponEquipped && slots.includes(EquipmentSlot.Hand2)) {
		return [equipment.hand1 as IWeapon];
	}

	return slots.map((slot) => equipment[slot]).filter((it) => it !== null) as (IArmour | IWeapon)[];
};

export const mapToArray = <T extends object>(object: T) => {
	return Object.keys(object).map((id) => ({
		...object[id as keyof typeof object],
		id,
	}));
};

export const getPropertyConfig = (property: TProperty) => {
	const { properties } = PROPERTY_CONFIG[property.type];
	return properties.find((prop) => prop.key === property.name);
};

export const getPropertyText = (property: TProperty) => {
	const config = getPropertyConfig(property);
	const { prefix, suffix } = PROPERTY_CONFIG[property.type];

	if (!config) {
		return "";
	}

	const { name } = config;

	return `${property.value >= 0 ? prefix : ""}${property.value}${suffix} ${name}`;
};

export const getDamageTypeConfig = (damageType: DamageType) => {
	return DAMAGE_CONFIG.find(({ key }) => key === damageType);
};

export const getDeterminer = (name: string) => (name.match(/^[aeiou]/i) ? "an" : "a");

export const getIsActionTile = (tile: ITileProperties) => {
	return ACTION_TILES.includes(tile.type);
};

export const decodeLayerData = function (data: string): number[] {
	// Bits on the far end of the 32-bit global tile ID are used for tile flags
	const FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
	const FLIPPED_VERTICALLY_FLAG = 0x40000000;
	const FLIPPED_DIAGONALLY_FLAG = 0x20000000;
	const ROTATED_HEXAGONAL_120_FLAG = 0x10000000;

	const binaryString = window.atob(data);
	const len = binaryString.length;
	const bytes: number[] = new Array(len / 4);

	// Interpret binaryString as an array of bytes representing little-endian encoded uint32 values.
	for (let i = 0; i < len; i += 4) {
		bytes[i / 4] =
			(binaryString.charCodeAt(i) |
				(binaryString.charCodeAt(i + 1) << 8) |
				(binaryString.charCodeAt(i + 2) << 16) |
				(binaryString.charCodeAt(i + 3) << 24)) >>>
			0;
	}

	// Extract and clear the flip flags.
	for (let i = 0; i < bytes.length; i++) {
		const globalTileID = bytes[i];
		bytes[i] =
			globalTileID &
			~(
				FLIPPED_HORIZONTALLY_FLAG |
				FLIPPED_VERTICALLY_FLAG |
				FLIPPED_DIAGONALLY_FLAG |
				ROTATED_HEXAGONAL_120_FLAG
			);
	}

	// Resolve the tile by subtracting the local tileset firstgid.
	// This is done in reverse order to avoid modifying the globalTileID while iterating.
	// The firstgid is always 1 because we only have one tileset.
	for (let i = bytes.length - 1; i >= 0; i--) {
		const tileID = bytes[i];
		if (1 <= tileID) {
			bytes[i] = tileID - 1;
		}
	}

	return bytes;
};

export const decodeMap = function (map: TiledMap) {
	const { layers } = map;
	const decodedLayers = layers.map((layer) => {
		if ("data" in layer) {
			const data = decodeLayerData(layer.data as string);
			return { ...layer, data };
		}
		return layer;
	});

	return {
		...map,
		layers: decodedLayers,
	} as TiledMap;
};

export const getRandomElement = <T>(arr: T[]) => {
	return arr[Math.floor(Math.random() * arr.length)];
};
