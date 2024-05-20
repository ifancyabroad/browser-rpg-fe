import { Box, Stack, Typography } from "@mui/material";
import { ISkill } from "common/types";
import { HoverButton, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openSkillModal } from "features/modals";
import { SKILL_TYPE_NAME_MAP, getSkillType } from "common/utils";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";

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
		<HoverButton
			onClick={handleViewSkill}
			sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, p: 1 }}
		>
			<Box display="flex" alignItems="center" gap={1}>
				<SkillIcon skill={skill} />
				<Stack>
					<Typography color="text.secondary">{skill.name}</Typography>
					{skill.level > 0 && (
						<Typography variant="body2">
							Level {skill.level} {SKILL_TYPE_NAME_MAP[type]}
						</Typography>
					)}
				</Stack>
			</Box>

			{skill.maxUses > 0 ? (
				<Typography color="text.secondary" variant="body2">
					{skill.remaining}/{skill.maxUses}
				</Typography>
			) : (
				<Typography variant="body2">
					<AllInclusiveIcon fontSize="small" />
				</Typography>
			)}
		</HoverButton>
	);
};
