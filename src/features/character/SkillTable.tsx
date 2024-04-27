import { ISkill } from "common/types";
import { SkillItem } from "./SkillItem";
import { Table, TableBody, TableContainer } from "@mui/material";

interface IProps {
	skills: ISkill[];
}

export const SkillTable: React.FC<IProps> = ({ skills }) => {
	return (
		<TableContainer>
			<Table size="small">
				<TableBody>
					{skills.map((skill) => (
						<SkillItem key={skill.id} skill={skill} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
