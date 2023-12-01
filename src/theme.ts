import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#67628a",
		},
		secondary: {
			main: "#8b9a3b",
		},
		success: {
			main: "#397a41",
		},
		background: {
			default: "#33333a",
			paper: "#182029",
		},
		mode: "dark",
	},
	typography: {
		h1: {
			fontFamily: "'Cinzel', serif",
		},
		h2: {
			fontFamily: "'Cinzel', serif",
		},
		h3: {
			fontFamily: "'Cinzel', serif",
		},
		h4: {
			fontFamily: "'Cinzel', serif",
		},
		h5: {
			fontFamily: "'Cinzel', serif",
		},
		h6: {
			fontFamily: "'Cinzel', serif",
		},
		allVariants: {
			fontFamily: "'Merriweather', serif",
		},
	},

	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					boxShadow: "inset 0px 0px 15px 0px rgba(0,0,0,0.8), 0px 0px 0px 1px rgba(255,255,255,0.06)",
				},
			},
		},
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
