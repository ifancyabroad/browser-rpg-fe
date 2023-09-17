import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EquipmentSlot } from "common/utils";

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
		title?: string;
		message?: string;
		slots: EquipmentSlot[];
	};
}

const initialState: ModalsState = {
	loginModalOpen: false,
	confirmationModalOpen: false,
	errorModal: {
		open: false,
	},
	replaceItemModal: {
		open: false,
		slots: [],
	},
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
			action: PayloadAction<{ title?: string; message?: string; slots: EquipmentSlot[] }>,
		) => {
			state.replaceItemModal.open = true;
			state.replaceItemModal.title = action.payload.title;
			state.replaceItemModal.message = action.payload.message;
			state.replaceItemModal.slots = action.payload.slots;
		},
		closeReplaceItemModal: (state) => {
			state.replaceItemModal.open = false;
			state.replaceItemModal.title = undefined;
			state.replaceItemModal.message = undefined;
			state.replaceItemModal.slots = [];
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
} = modalsSlice.actions;

export default modalsSlice.reducer;
