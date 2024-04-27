import { createTheme, darken } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#fce94f",
		},
		secondary: {
			main: "#8f5902",
		},
		success: {
			main: "#8ae234",
		},
		info: {
			main: "#204a87",
		},
		text: {
			primary: "#babdb6",
			secondary: "#ffffff",
		},
		background: {
			default: "#000000",
			paper: "#040204",
		},
		mode: "dark",
	},
	typography: {
		h1: {
			fontFamily: "monospace",
			color: "#fff",
		},
		h2: {
			fontFamily: "monospace",
			color: "#fff",
		},
		h3: {
			fontFamily: "monospace",
			color: "#fff",
		},
		h4: {
			fontFamily: "monospace",
			color: "#fff",
		},
		h5: {
			fontFamily: "monospace",
			color: "#fff",
		},
		h6: {
			fontFamily: "monospace",
			color: "#fff",
		},
		allVariants: {
			fontFamily: "monospace",
		},
		fontFamily: "monospace",
	},

	components: {
		MuiChip: {
			styleOverrides: {
				root: {
					fontFamily: "monospace",
				},
				sizeSmall: {
					fontSize: "12px",
				},
			},
		},
		MuiBadge: {
			styleOverrides: {
				badge: {
					fontFamily: "monospace",
					borderRadius: 0,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				disableRipple: true,
				variant: "outlined",
			},
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
				text: {
					textTransform: "none",
					textDecoration: "underline",
					padding: "0",
					minWidth: "auto",
					textAlign: "left",
					"&:hover": {
						textDecoration: "underline",
						backgroundColor: "transparent",
					},
				},
			},
		},
		MuiIconButton: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				colorPrimary: {
					border: "2px solid",
					borderColor: "#762222",
					backgroundColor: darken("#762222", 0.2),
					color: "#ffffff",
					"&:hover": {
						backgroundColor: "#762222",
					},
					"&:disabled": {
						backgroundColor: "#424242",
						borderColor: "#616161",
					},
				},
				colorSecondary: {
					border: "2px solid",
					borderColor: "#8b9a3b",
					backgroundColor: darken("#8b9a3b", 0.2),
					color: "#ffffff",
					"&:hover": {
						backgroundColor: "#8b9a3b",
					},
					"&:disabled": {
						backgroundColor: "#424242",
						borderColor: "#616161",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					borderRadius: 0,
					border: "1px solid #000",
					outline: "2px solid #7d623c",
				},
			},
		},
		MuiStack: {
			defaultProps: {
				useFlexGap: true,
			},
		},
		MuiTooltip: {
			styleOverrides: {
				tooltip: {
					borderRadius: "0",
					border: "1px solid #000",
					outline: "2px solid #7d623c",
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundImage: "none",
				},
			},
		},
		MuiDialogTitle: {
			defaultProps: {
				variant: "h5",
			},
			styleOverrides: {
				root: {
					padding: "16px",
				},
			},
		},
		MuiDialogContent: {
			styleOverrides: {
				root: {
					padding: "16px",
				},
			},
		},
		MuiDialogContentText: {
			styleOverrides: {
				root: {
					color: "#babdb6",
				},
			},
		},
		MuiDialogActions: {
			styleOverrides: {
				root: {
					justifyContent: "center",
					padding: "16px",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					border: "1px solid #babdb6",
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					// scrollbarColor: "#6b6b6b #293132",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						width: 8,
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						borderRadius: 8,
						backgroundColor: "#6b6b6b",
						minHeight: 24,
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
	},
});

export default theme;
