import { Button, Card, CardHeader } from "@mui/material";
import { State } from "common/utils";
import { ISkill } from "common/types";
import { SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { postAction } from "features/battle";
import { openErrorModal, openSkillModal } from "features/modals";
import { closeCharacterSheet } from ".";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.battle.status);
	const isLoading = status === "loading";
	const secondaryText = skill.maxUses ? `${skill.remaining}/${skill.maxUses}` : undefined;
	const isExhausted = Boolean(skill.maxUses && skill.remaining <= 0);
	const isDisabled = isLoading || isExhausted;

	const handleUseSkill = async () => {
		try {
			await dispatch(postAction({ id: skill.id })).unwrap();
			dispatch(closeCharacterSheet());
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleViewSkill = (e: React.SyntheticEvent<HTMLButtonElement>) => {
		dispatch(openSkillModal({ skill }));
	};

	if (!character) {
		return null;
	}

	const isBattle = character.state === State.Battle;

	return (
		<Card>
			<CardHeader
				avatar={<SkillIcon skill={skill} />}
				title={skill.name}
				subheader={secondaryText}
				action={
					isBattle ? (
						<Button onClick={handleUseSkill} variant="contained" disabled={isDisabled}>
							Use
						</Button>
					) : (
						<Button variant="contained" onClick={handleViewSkill}>
							View
						</Button>
					)
				}
			/>
		</Card>
	);
};
