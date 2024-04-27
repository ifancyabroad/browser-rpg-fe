import { Button, TableCell, TableRow, Typography } from "@mui/material";
import { ISkill } from "common/types";
import { SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openSkillModal } from "features/modals";
import { SKILL_TYPE_NAME_MAP, getSkillType } from "common/utils";

interface IProps {
	skill: ISkill;
}

export const SkillItem: React.FC<IProps> = ({ skill }) => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);

	const handleViewSkill = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(openSkillModal({ skill }));
	};

	if (!character) {
		return null;
	}

	const type = getSkillType(skill);

	return (
		<TableRow>
			<TableCell component="th" scope="row" width={30}>
				<SkillIcon skill={skill} />
			</TableCell>
			<TableCell>
				<Button variant="text" onClick={handleViewSkill}>
					{skill.name}
				</Button>
			</TableCell>
			<TableCell>
				<Typography variant="body2">
					Level {skill.level} {SKILL_TYPE_NAME_MAP[type]}
				</Typography>
			</TableCell>
		</TableRow>
	);
};
