import { ISkill } from "common/types";
import { SkillCard } from "./SkillCard";
import { Stack } from "@mui/material";
import { Parchment } from "common/components";

interface IProps {
	skills: ISkill[];
}

export const SkillList: React.FC<IProps> = ({ skills }) => {
	return (
		<Parchment sx={{ minHeight: 460, my: 2 }}>
			<Stack spacing={2}>
				{skills.map((skill) => (
					<SkillCard key={skill.id} skill={skill} />
				))}
			</Stack>
		</Parchment>
	);
};
