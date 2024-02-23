import portraitFrame from "assets/images/ui/CharacterPortraitFrame.png";
import nameFrame from "assets/images/ui/ModalTitleFrame.png";
import healthBarFrame from "assets/images/ui/CharacterHealthBarFrame.png";
import buttonFrame from "assets/images/ui/CharacterPortraitButtonFrame.png";
import levelUpIcon from "assets/images/ui/LevelUpIcon.png";
import { useAppDispatch } from "common/hooks";
import { Box, ButtonBase, Stack, Typography, styled } from "@mui/material";
import { openLevelUpModal } from "features/modals";
import { IActiveEffect, IStatus } from "common/types";
import { AuxiliaryEffect, StatusEffect } from "common/components";

const Wrapper = styled(Box)({
	display: "flex",
	alignItems: "flex-start",
	filter: "drop-shadow(0px 20px 30px rgba(0,0,0,0.25))",
	"&.character-portrait .portrait-image": {
		height: "114px",
		marginTop: "16px",
	},
});

const PortraitWrapper = styled(Box)({
	position: "relative",
	backgroundImage: `url(${portraitFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "128px",
	height: "128px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 2,
});

const PortraitImage = styled("img")({
	height: "80px",
});

const NameWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${nameFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	padding: theme.spacing(2),
	paddingLeft: "60px",
	width: "257px",
	height: "66px",
	display: "flex",
	alignItems: "center",
	marginLeft: "-60px",
	marginBottom: "-13px",
}));

const HealthBarWrapper = styled(Box)({
	position: "relative",
	backgroundImage: `url(${healthBarFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "256px",
	height: "48px",
	display: "flex",
	alignItems: "center",
	marginLeft: "-16px",
	padding: "13px 10px",
});

const HealthBar = styled(Box)({
	position: "relative",
	height: "100%",
	backgroundImage: "linear-gradient(90deg, #b83000 0%, #ff4200 100%)",
	boxShadow: "inset 0px 0px 4px 0px rgba(255,255,255,0.3)",
	display: "flex",
	alignItems: "center",
	transition: "width 0.5s ease-in-out",
	":after": {
		content: "''",
		position: "absolute",
		right: 0,
		top: "50%",
		transform: "translateY(-50%)",
		width: "32px",
		height: "32px",
		backgroundImage: "linear-gradient(90deg, rgba(241,62,0,0) 0%, rgba(241,62,0,0) 0%, #ff4200 100%)",
	},
});

const PortraitButton = styled(ButtonBase)({
	position: "absolute",
	bottom: -10,
	right: -10,
	width: "65px",
	height: "65px",
	cursor: "pointer",
	backgroundImage: `url(${buttonFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
});

const EffectsWrapper = styled(Stack)({
	flexDirection: "row",
	gap: "4px",
	position: "absolute",
	left: 0,
	top: "100%",
	zIndex: 2,
	paddingLeft: "6px",
});

interface IProps {
	className?: string;
	value: number;
	max: number;
	label: string;
	portrait: string;
	auxiliaryEffects: IActiveEffect[];
	statusEffects: IStatus[];
	showLevelUp?: boolean;
}

export const Portrait: React.FC<IProps> = ({
	className,
	value,
	max,
	label,
	portrait,
	auxiliaryEffects,
	statusEffects,
	showLevelUp,
}) => {
	const dispatch = useAppDispatch();

	const handleLevelUp = () => {
		dispatch(openLevelUpModal());
	};

	const normalisedValue = value < 0 ? 0 : value > max ? 100 : ((value - 0) * 100) / (max - 0);

	return (
		<Wrapper className={className}>
			<PortraitWrapper>
				<PortraitImage className="portrait-image" src={portrait} alt={label} />

				{showLevelUp && (
					<PortraitButton aria-label="Level up" onClick={handleLevelUp}>
						<img src={levelUpIcon} alt="Level Up" width="34" />
					</PortraitButton>
				)}
			</PortraitWrapper>
			<Box>
				<NameWrapper>
					<Typography variant="h6" fontSize={18} noWrap>
						{label}
					</Typography>
				</NameWrapper>
				<HealthBarWrapper>
					<Box sx={{ width: "100%", height: "100%", overflowX: "clip", overflowY: "visible" }}>
						<HealthBar sx={{ width: `${normalisedValue}%` }}>
							<Typography
								variant="body2"
								color="white"
								fontSize={12}
								fontWeight="bold"
								paddingLeft="10px"
								zIndex={1}
							>
								{value}/{max}
							</Typography>
						</HealthBar>
					</Box>

					<EffectsWrapper direction="row" spacing={1}>
						{auxiliaryEffects.map((effect) => (
							<AuxiliaryEffect key={effect.effect} {...effect} />
						))}
						{statusEffects.map((effect) => (
							<StatusEffect key={effect.skill.id} {...effect} />
						))}
					</EffectsWrapper>
				</HealthBarWrapper>
			</Box>
		</Wrapper>
	);
};
