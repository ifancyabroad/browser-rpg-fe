import { Box, ButtonBase, Typography } from "@mui/material";
import { ISkill } from "common/types";
import { ImageBorder, SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { openSkillModal } from "features/modals";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	// const status = useAppSelector((state) => state.battle.status);
	// const isLoading = status === "loading";
	// const secondaryText = skill.maxUses ? `${skill.remaining}/${skill.maxUses}` : undefined;
	// const isExhausted = Boolean(skill.maxUses && skill.remaining <= 0);
	// const isDisabled = isLoading || isExhausted;

	// const handleUseSkill = async () => {
	// 	try {
	// 		await dispatch(postAction({ id: skill.id })).unwrap();
	// 		dispatch(closeCharacterSheet());
	// 	} catch (err) {
	// 		const { message } = err as Error;
	// 		dispatch(openErrorModal({ message }));
	// 	}
	// };

	const handleViewSkill = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(openSkillModal({ skill }));
	};

	if (!character) {
		return null;
	}

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
				<Typography variant="body2">{skill.description}</Typography>
			</Box>
		</ButtonBase>
	);
};
