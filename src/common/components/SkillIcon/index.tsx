import { Box } from "@mui/material";
import { ISkill } from "common/types";

interface IProps {
	skill: ISkill;
	width?: number;
}

export const SkillIcon: React.FC<IProps> = ({ skill, width = 40 }) => {
	if (skill.icon) {
		return <Box component="img" sx={{ verticalAlign: "middle" }} src={skill.icon} alt={skill.name} width={width} />;
	}

	return (
		<Box
			component="img"
			sx={{ verticalAlign: "middle" }}
			src={`https://via.placeholder.com/${width}`}
			alt={skill.name}
		/>
	);
};
