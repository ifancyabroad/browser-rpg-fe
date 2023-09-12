import { ISkill } from "common/types";
import { SkillCard } from "./SkillCard";
import { Stack } from "@mui/material";

interface IProps {
	skills: ISkill[];
}

export const SkillList: React.FC<IProps> = ({ skills }) => {
	return (
		<Stack spacing={2} my={2}>
			{skills.map((skill) => (
				<SkillCard skill={skill} />
			))}
		</Stack>
	);
};
