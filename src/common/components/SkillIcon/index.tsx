import { Box } from "@mui/material";
import { ISkill } from "common/types";

interface IProps {
	skill: ISkill;
	width?: number;
}

export const SkillIcon: React.FC<IProps> = ({ skill, width = 40 }) => {
	return (
		<Box sx={{ height: width, width, img: { verticalAlign: "middle" } }}>
			{skill.icon ? (
				<img src={skill.icon} alt={skill.name} width={width} />
			) : (
				<img src={`https://via.placeholder.com/${width}`} alt={skill.name} />
			)}
		</Box>
	);
};
