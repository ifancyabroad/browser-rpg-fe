import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#56E39F",
		},
		secondary: {
			main: "#0091ad",
		},
		background: {
			default: "#171d1c",
			paper: "#293132",
		},
		mode: "dark",
	},
	typography: {
		allVariants: {
			fontFamily: "'Open Sans', sans-serif",
		},
	},

	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					scrollbarColor: "#6b6b6b #293132",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						backgroundColor: "#293132",
						width: 12,
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "#6b6b6b",
						minHeight: 24,
						border: "3px solid #293132",
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "#959595",
					},
					"&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
						backgroundColor: "#293132",
					},
				},
			},
		},
		MuiStack: {
			defaultProps: {
				useFlexGap: true,
			},
		},
	},
});

export default theme;
