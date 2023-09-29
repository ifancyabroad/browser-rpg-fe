import { Button, Card, CardHeader } from "@mui/material";
import { getSkillType, SKILL_TYPE_NAME_MAP, State } from "common/utils";
import { ISkill } from "common/types";
import { SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { postAction } from "features/game";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const secondaryText = `Level ${skill.level} ${SKILL_TYPE_NAME_MAP[getSkillType(skill)]}`;

	const handleUseSkill = () => {
		dispatch(postAction({ id: skill.id }));
	};

	if (!character) {
		return null;
	}

	const isBattle = character.state === State.Battle;

	return (
		<Card>
			<CardHeader
				avatar={<SkillIcon skill={skill} />}
				title={skill.name}
				subheader={secondaryText}
				action={
					isBattle ? (
						<Button onClick={handleUseSkill} variant="contained">
							Use
						</Button>
					) : (
						<Button variant="contained">View</Button>
					)
				}
			/>
		</Card>
	);
};
