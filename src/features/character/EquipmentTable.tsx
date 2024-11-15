import { IEquipment } from "common/types";
import { Box, Link, Stack } from "@mui/material";
import { EquipmentItem } from "./EquipmentItem";
import { EQUIPMENT_SLOTS, EquipmentSlot } from "common/utils";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { getCanSwapWeapons, swapWeapons } from "./characterSlice";
import { openErrorModal } from "features/modals";

interface IProps {
	equipment: IEquipment;
}

export const EquipmentTable: React.FC<IProps> = ({ equipment }) => {
	const dispatch = useAppDispatch();
	const canSwap = useAppSelector(getCanSwapWeapons);
	const status = useAppSelector((state) => state.character.status);
	const isDisabled = status === "loading";

	const handleSwap = async () => {
		try {
			await dispatch(swapWeapons()).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Stack>
			{EQUIPMENT_SLOTS.map((slot, index) => (
				<Fragment>
					<EquipmentItem key={index} slot={slot} equipment={equipment[slot]} />
					{slot === EquipmentSlot.Hand1 && canSwap && (
						<Box display="flex" justifyContent="flex-end" px={1}>
							<Link component="button" onClick={handleSwap} disabled={isDisabled}>
								Swap
							</Link>
						</Box>
					)}
				</Fragment>
			))}
		</Stack>
	);
};
