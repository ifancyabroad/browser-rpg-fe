import { Button, Card, CardHeader } from "@mui/material";
import { State } from "common/utils";
import { ISkill } from "common/types";
import { SkillIcon } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { postAction } from "features/game";
import { openErrorModal } from "features/modals";

interface IProps {
	skill: ISkill;
}

export const SkillCard: React.FC<IProps> = ({ skill }) => {
	const dispatch = useAppDispatch();
	const character = useAppSelector((state) => state.character.character);
	const status = useAppSelector((state) => state.game.status);
	const isLoading = status === "loading";
	const secondaryText = skill.maxUses ? `${skill.remaining}/${skill.maxUses}` : undefined;

	const handleUseSkill = async () => {
		try {
			await dispatch(postAction({ id: skill.id })).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
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
						<Button onClick={handleUseSkill} variant="contained" disabled={isLoading}>
							Use
						</Button>
					) : (
						<Button variant="contained">View</Button>
					)
				}
			/>
		</Card>
	);
};
