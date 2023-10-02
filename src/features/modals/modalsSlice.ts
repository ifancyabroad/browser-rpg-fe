import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArmour, IWeapon } from "common/types";

interface ModalsState {
	loginModalOpen: boolean;
	confirmationModalOpen: boolean;
	errorModal: {
		open: boolean;
		title?: string;
		message?: string;
	};
	replaceItemModal: {
		open: boolean;
		item?: IArmour | IWeapon;
	};
	battleCompleteModalOpen: boolean;
}

const initialState: ModalsState = {
	loginModalOpen: false,
	confirmationModalOpen: false,
	errorModal: {
		open: false,
	},
	replaceItemModal: {
		open: false,
	},
	battleCompleteModalOpen: false,
};

export const modalsSlice = createSlice({
	name: "modals",
	initialState,
	reducers: {
		openLoginModal: (state) => {
			state.loginModalOpen = true;
		},
		closeLoginModal: (state) => {
			state.loginModalOpen = false;
		},
		openConfirmationModal: (state) => {
			state.confirmationModalOpen = true;
		},
		closeConfirmationModal: (state) => {
			state.confirmationModalOpen = false;
		},
		openErrorModal: (state, action: PayloadAction<{ title?: string; message?: string }>) => {
			state.errorModal.open = true;
			state.errorModal.title = action.payload.title;
			state.errorModal.message = action.payload.message;
		},
		closeErrorModal: (state) => {
			state.errorModal.open = false;
			state.errorModal.title = undefined;
			state.errorModal.message = undefined;
		},
		openReplaceItemModal: (
			state,
			action: PayloadAction<{ title?: string; message?: string; item: IArmour | IWeapon }>,
		) => {
			state.replaceItemModal.open = true;
			state.replaceItemModal.item = action.payload.item;
		},
		closeReplaceItemModal: (state) => {
			state.replaceItemModal.open = false;
			state.replaceItemModal.item = undefined;
		},
		openBattleCompleteModal: (state) => {
			state.battleCompleteModalOpen = true;
		},
		closeBattleCompleteModal: (state) => {
			state.battleCompleteModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openLoginModal,
	closeLoginModal,
	openConfirmationModal,
	closeConfirmationModal,
	openErrorModal,
	closeErrorModal,
	openReplaceItemModal,
	closeReplaceItemModal,
	openBattleCompleteModal,
	closeBattleCompleteModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
