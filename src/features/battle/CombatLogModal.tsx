import { Dialog, DialogActions, DialogContent, DialogTitle, Link } from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { CombatLog } from "./CombatLog";
import { closeCombatLogModal } from "features/modals";

export const CombatLogModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const open = useAppSelector((state) => state.modals.combatLogModalOpen);

	const handleClose = () => {
		dispatch(closeCombatLogModal());
	};

	return (
		<Dialog open={open} maxWidth="md">
			<DialogTitle textAlign="center">Combat Log</DialogTitle>
			<DialogContent>
				<CombatLog />
			</DialogContent>
			<DialogActions>
				<Link component="button" onClick={handleClose}>
					Close
				</Link>
			</DialogActions>
		</Dialog>
	);
};
