import { IconButton } from "@mui/material";
import { useAppDispatch } from "common/hooks";
import { openCharacterSheet } from "features/character";
import MenuIcon from "@mui/icons-material/Menu";

export const CharacterButton: React.FC = () => {
	const dispatch = useAppDispatch();

	const handleDrawerToggle = () => {
		dispatch(openCharacterSheet());
	};

	return (
		<IconButton
			onClick={handleDrawerToggle}
			sx={{
				display: { md: "none" },
				position: "absolute",
				top: 8,
				left: 8,
				zIndex: 1,
			}}
		>
			<MenuIcon />
		</IconButton>
	);
};
