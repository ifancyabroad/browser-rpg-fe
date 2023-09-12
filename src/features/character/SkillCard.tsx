import { Button, Card, CardHeader } from "@mui/material";
import { getSkillType, SKILL_TYPE_NAME_MAP } from "common/utils";
import { ISkill } from "common/types";
import { SkillIcon } from "common/components";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
	const secondaryText = `Level ${skill.level} ${SKILL_TYPE_NAME_MAP[getSkillType(skill)]}`;

	return (
		<Card>
			<CardHeader
				avatar={<SkillIcon skill={skill} />}
				title={skill.name}
				subheader={secondaryText}
				action={<Button variant="contained">View</Button>}
			/>
		</Card>
	);
};
