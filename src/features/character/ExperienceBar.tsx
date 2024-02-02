import { Box, Typography, styled } from "@mui/material";
import { useAppSelector } from "common/hooks";
import counterFrame from "assets/images/ui/ExperienceBarCounterFrame.png";
import experienceBarFrame from "assets/images/ui/ExperienceBarFrame.png";

const CounterWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${counterFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "100px",
	height: "27px",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: theme.spacing(1),
	marginBottom: "-8px",
}));

const BarWrapper = styled(Box)(({ theme }) => ({
	position: "relative",
	backgroundImage: `url(${experienceBarFrame})`,
	backgroundRepeat: "no-repeat",
	backgroundSize: "100% 100%",
	width: "343px",
	height: "27px",
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(1),
}));

const Bar = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100%",
	backgroundImage: "linear-gradient(90deg, #1baa88 0%, #25eebe 100%)",
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
		width: "31px",
		height: "18px",
		backgroundImage: "linear-gradient(90deg, rgba(241,62,0,0) 0%, rgba(241,62,0,0) 0%, rgb(37,238,190) 100%)",
	},
}));

export const ExperienceBar: React.FC = () => {
	const character = useAppSelector((state) => state.character.character);

	if (!character) {
		return null;
	}

	const { experience, nextLevelExperience } = character;
	const normalisedValue =
		experience > nextLevelExperience ? 100 : ((experience - 0) * 100) / (nextLevelExperience - 0);

	return (
		<Box display="flex" flexDirection="column" alignItems="center">
			<CounterWrapper>
				<Typography variant="h6" fontSize="8px" textAlign="center">
					{experience} / {nextLevelExperience}
				</Typography>
			</CounterWrapper>

			<BarWrapper>
				<Bar sx={{ width: `${normalisedValue}%` }} />
			</BarWrapper>
		</Box>
	);
};
