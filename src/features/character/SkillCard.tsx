import { Box, ButtonBase, Typography } from "@mui/material";
import { ISkill } from "common/types";
import { ImageBorder, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openSkillModal } from "features/modals";
import { SKILL_TYPE_NAME_MAP, getSkillType } from "common/utils";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
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
		<ButtonBase
			onClick={handleViewSkill}
			sx={{ justifyContent: "flex-start", alignItems: "flex-start", textAlign: "left", gap: 2 }}
		>
			<ImageBorder>
				<SkillIcon skill={skill} />
			</ImageBorder>

			<Box>
				<Typography variant="h6" fontSize={16}>
					{skill.name}
				</Typography>
				<Typography variant="body2">
					Level {skill.level} {SKILL_TYPE_NAME_MAP[type]}
				</Typography>
			</Box>
		</ButtonBase>
	);
};
