import { createTheme } from "@mui/material/styles";

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
			},
		},
		MuiIconButton: {
			defaultProps: {
				disableRipple: true,
			},
		},
		MuiPaper: {
			defaultProps: {
				elevation: 0,
			},
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
					backgroundColor: "#040204",
					color: "currentcolor",
					border: "1px solid #000",
					outline: "2px solid #7d623c",
				},
			},
		},
		MuiDialog: {
			defaultProps: {
				fullWidth: true,
				maxWidth: "xs",
				transitionDuration: 0,
			},
			styleOverrides: {
				paper: {
					backgroundImage: "none",
				},
			},
		},
		MuiDialogTitle: {
			defaultProps: {
				variant: "h6",
			},
			styleOverrides: {
				root: {
					padding: "16px",
					fontSize: "1rem",
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
			defaultProps: {
				disableSpacing: true,
			},
			styleOverrides: {
				root: {
					justifyContent: "center",
					padding: "16px",
					paddingTop: "0",
					gap: "16px",
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					border: "none",
					fontSize: "16px",
				},
				sizeSmall: {
					padding: "6px",
				},
			},
		},
		MuiCardActions: {
			styleOverrides: {
				root: {
					padding: "8px 16px",
					justifyContent: "center",
					gap: "16px",
				},
			},
		},
		MuiTextField: {
			defaultProps: {
				variant: "outlined",
				autoComplete: "off",
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					borderRadius: 0,
				},
			},
		},
		MuiTabs: {
			styleOverrides: {
				root: {
					minHeight: 32,
				},
				indicator: {
					display: "none",
				},
				flexContainer: {
					gap: "4px",
				},
			},
		},
		MuiTab: {
			defaultProps: {
				disableRipple: true,
			},
			styleOverrides: {
				root: {
					borderRadius: 0,
					border: "1px solid #757575",
					backgroundColor: "#000",
					color: "#babdb6",
					padding: "8px 16px",
					minHeight: 32,
					textTransform: "none",
					"&:hover": {
						borderColor: "#FFF",
						color: "#FFF",
					},
					"&.Mui-selected": {
						borderColor: "#8ae234",
						color: "#FFF",
					},
				},
			},
		},
		MuiLink: {
			styleOverrides: {
				root: {
					"&:disabled": {
						color: "#757575",
						cursor: "default",
					},
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					// scrollbarColor: "#6b6b6b #293132",
					"&::-webkit-scrollbar, & *::-webkit-scrollbar": {
						width: 2,
					},
					"&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
						backgroundColor: "#7d623c",
						minHeight: 24,
					},
					"&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
						backgroundColor: "#8f5902",
					},
					"&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
						backgroundColor: "#8f5902",
					},
					"&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
						backgroundColor: "#8f5902",
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
