import { ISkill } from "common/types";
import { SkillItem } from "./SkillItem";
import { Box, Stack, Typography } from "@mui/material";

interface IProps {
	skills: ISkill[];
}

export const SkillTable: React.FC<IProps> = ({ skills }) => {
	const emptySlots = Array.from({ length: 5 - skills.length }).fill(null);

	return (
		<Stack spacing={1}>
			{skills.map((skill) => (
				<SkillItem key={skill.id} skill={skill} />
			))}
			{emptySlots.map((_, index) => (
				<Box
					key={index}
					sx={{
						height: "58px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						border: "2px dashed",
						borderColor: "grey.600",
					}}
				>
					<Typography textAlign="center">Empty</Typography>
				</Box>
			))}
		</Stack>
	);
};
