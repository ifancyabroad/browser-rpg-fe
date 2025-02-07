import React, { useState } from "react";
import { styled } from "@mui/system";
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface IOption {
	label: string;
	value: string;
}

interface SelectProps {
	options: IOption[];
	value: string;
	onChange: (value: string) => void;
}

const SelectWrapper = styled("div")({
	position: "relative",
	width: "100%",
	display: "flex",
	alignItems: "stretch",
});

const SelectContainer = styled("div")(({ theme }) => ({
	position: "relative",
	width: "100%",
	border: "1px solid #757575",
	backgroundColor: "#000",
	color: "#fff",
	padding: theme.spacing(1),
	textAlign: "center",
	lineHeight: 1.25,
	fontSize: 14,
	cursor: "pointer",
	WebkitTapHighlightColor: "transparent",

	"&:hover": {
		borderColor: "#fff",
	},
}));

const DropdownMenu = styled("ul")({
	listStyle: "none",
	margin: 0,
	padding: 0,
	background: "#000",
	border: "1px solid #757575",
	maxHeight: 400,
	overflowY: "auto",
});

const DropdownItem = styled("li")(({ theme }) => ({
	padding: theme.spacing(1),
	fontSize: 14,
	lineHeight: 1.25,
	textAlign: "center",
	cursor: "pointer",
	WebkitTapHighlightColor: "transparent",
	"&:hover": {
		color: "#FFF",
	},
}));

export const Select: React.FC<SelectProps> = ({ options, value, onChange }) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const selected = options.find((option) => option.value === value);

	const handleToggle = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleSelect = (option: string) => {
		onChange(option);
		handleClose();
	};

	return (
		<ClickAwayListener onClickAway={handleClose}>
			<SelectWrapper>
				<SelectContainer onClick={handleToggle}>
					{selected?.label || "Select an option"}
					<ArrowDropDownIcon
						sx={{
							position: "absolute",
							right: 10,
							top: "50%",
							transform: "translateY(-50%)",
						}}
					/>
				</SelectContainer>
				<Popper
					open={Boolean(anchorEl)}
					anchorEl={anchorEl}
					sx={{ width: "100%", zIndex: 1 }}
					placement="bottom-start"
					disablePortal
				>
					<DropdownMenu>
						{options.map(({ label, value }) => (
							<DropdownItem key={value} onClick={() => handleSelect(value)}>
								{label}
							</DropdownItem>
						))}
					</DropdownMenu>
				</Popper>
			</SelectWrapper>
		</ClickAwayListener>
	);
};
