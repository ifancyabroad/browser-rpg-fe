import { Dialog, Typography } from "@mui/material";
import {
	GameDialogActions,
	GameDialogButton,
	GameDialogCloseButton,
	GameDialogContent,
	GameDialogPaper,
	GameModalTitle,
	IconWrapper,
	Parchment,
} from "common/components";
import { ReactComponent as CrossIcon } from "assets/images/ui/CrossIcon.svg";
import { ReactComponent as TickIcon } from "assets/images/ui/TickIcon.svg";
import infoIcon from "assets/images/ui/InfoIcon.png";

interface IProps {
	open: boolean;
	title: string;
	content: string;
	handleClose: () => void;
	handleConfirm: () => void;
	disabled?: boolean;
}

export const ConfirmationModal: React.FC<IProps> = ({ open, title, content, handleClose, handleConfirm, disabled }) => (
	<Dialog open={open} onClose={handleClose} PaperComponent={GameDialogPaper}>
		<GameModalTitle title="Alert!" icon={infoIcon} />
		<GameDialogContent>
			<GameDialogCloseButton onClick={handleClose} />
			<Parchment>
				<Typography variant="h6">{title}</Typography>
				<Typography>{content}</Typography>
			</Parchment>
		</GameDialogContent>
		<GameDialogActions>
			<GameDialogButton onClick={handleClose}>
				Cancel
				<IconWrapper>
					<CrossIcon width={20} height={20} />
				</IconWrapper>
			</GameDialogButton>
			<GameDialogButton onClick={handleConfirm} disabled={disabled}>
				Confirm
				<IconWrapper>
					<TickIcon width={20} height={20} />
				</IconWrapper>
			</GameDialogButton>
		</GameDialogActions>
	</Dialog>
);
