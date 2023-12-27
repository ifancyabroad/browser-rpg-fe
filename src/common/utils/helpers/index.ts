import { IArmour, IEquipment, ISkill, IWeapon, TProperty } from "common/types";
import {
	DamageType,
	EffectType,
	EquipmentSlot,
	EquipmentType,
	SkillType,
	Target,
	WeaponSize,
} from "common/utils/enums";
import { DAMAGE_CONFIG, EQUIPMENT_SLOT_TYPE_MAP, PROPERTY_CONFIG } from "common/utils/constants";
import { keyframes } from "@mui/material";

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

export const getRoomCenter = (room: HTMLDivElement) => {
	if (!room.parentElement) {
		return;
	}

	const gridRect = room.parentElement.getBoundingClientRect();
	const roomRect = room.getBoundingClientRect();
	const top = roomRect.top - gridRect.top;
	const left = roomRect.left - gridRect.left;
	return {
		top: top + roomRect.height / 2,
		left: left + roomRect.width / 2,
	};
};

export interface IAnimationStep {
	left: number;
	top: number;
}

export const createAnimationFromPath = (steps: IAnimationStep[]) => {
	const duration = 100 / (steps.length - 1);
	const animationSteps = steps.map((step, index) => {
		const time = Math.round(duration * index);

		return `
			${time}% {
				left: ${step.left}px;
				top: ${step.top}px;
			}
		`;
	});

	const animation = keyframes(animationSteps);
	return `${animation} ${steps.length / 4}s ease 0s 1 normal forwards running`;
};
