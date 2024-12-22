import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link } from "@mui/material";

interface IProps {
	open: boolean;
	title: string;
	content: string | JSX.Element;
	handleClose: () => void;
}

export const InfoModal: React.FC<IProps> = ({ open, title, content, handleClose }) => (
	<Dialog open={open} onClose={handleClose} aria-labelledby="info-dialog-title">
		<DialogTitle id="info-dialog-title" textAlign="center">
			{title}
		</DialogTitle>
		<DialogContent>
			<DialogContentText textAlign="center">{content}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Link component="button" onClick={handleClose}>
				Close
			</Link>
		</DialogActions>
	</Dialog>
);
