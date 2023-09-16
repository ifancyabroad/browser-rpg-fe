import { IArmour, IEquipment, ISkill, IWeapon } from "common/types";
import { EffectType, EquipmentSlot, EquipmentType, SkillType, Target, WeaponSize } from "common/utils/enums";
import { EQUIPMENT_SLOT_TYPE_MAP } from "../constants";

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

const getFilteredSlots = (equipmentType: EquipmentType, isTwoHandedWeaponEquipped: boolean) =>
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
