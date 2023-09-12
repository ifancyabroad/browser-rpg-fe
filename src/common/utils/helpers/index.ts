import { ISkill } from "common/types";
import { EffectType, SkillType, Target } from "common/utils/enums";

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
