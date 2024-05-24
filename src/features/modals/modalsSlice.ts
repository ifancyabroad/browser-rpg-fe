import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IArmour, ICharacterClass, ISkill, IWeapon } from "common/types";

interface ModalsState {
	loginModalOpen: boolean;
	registrationModalOpen: boolean;
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
	rewardsModalOpen: boolean;
	gameOverModalOpen: boolean;
	levelUpModalOpen: boolean;
	equipmentModal: {
		open: boolean;
		item?: IArmour | IWeapon;
	};
	skillModal: {
		open: boolean;
		skill?: ISkill;
	};
	characterClassModal: {
		open: boolean;
		characterClass?: ICharacterClass;
	};
	treasureModalOpen: boolean;
	shopModalOpen: boolean;
	battleModalOpen: boolean;
}

const initialState: ModalsState = {
	loginModalOpen: false,
	registrationModalOpen: false,
	confirmationModalOpen: false,
	errorModal: {
		open: false,
	},
	replaceItemModal: {
		open: false,
	},
	rewardsModalOpen: false,
	gameOverModalOpen: false,
	levelUpModalOpen: false,
	equipmentModal: {
		open: false,
	},
	skillModal: {
		open: false,
	},
	characterClassModal: {
		open: false,
	},
	treasureModalOpen: false,
	shopModalOpen: false,
	battleModalOpen: false,
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
		openRegistrationModal: (state) => {
			state.registrationModalOpen = true;
		},
		closeRegistrationModal: (state) => {
			state.registrationModalOpen = false;
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
		openRewardsModal: (state) => {
			state.rewardsModalOpen = true;
		},
		closeRewardsModal: (state) => {
			state.rewardsModalOpen = false;
		},
		openGameOverModal: (state) => {
			state.gameOverModalOpen = true;
		},
		closeGameOverModal: (state) => {
			state.gameOverModalOpen = false;
		},
		openLevelUpModal: (state) => {
			state.levelUpModalOpen = true;
		},
		closeLevelUpModal: (state) => {
			state.levelUpModalOpen = false;
		},
		openEquipmentModal: (state, action: PayloadAction<{ item: IArmour | IWeapon }>) => {
			state.equipmentModal.open = true;
			state.equipmentModal.item = action.payload.item;
		},
		closeEquipmentModal: (state) => {
			state.equipmentModal.open = false;
			state.equipmentModal.item = undefined;
		},
		openSkillModal: (state, action: PayloadAction<{ skill: ISkill }>) => {
			state.skillModal.open = true;
			state.skillModal.skill = action.payload.skill;
		},
		closeSkillModal: (state) => {
			state.skillModal.open = false;
			state.skillModal.skill = undefined;
		},
		openCharacterClassModal: (state, action: PayloadAction<{ characterClass: ICharacterClass }>) => {
			state.characterClassModal.open = true;
			state.characterClassModal.characterClass = action.payload.characterClass;
		},
		closeCharacterClassModal: (state) => {
			state.characterClassModal.open = false;
			state.characterClassModal.characterClass = undefined;
		},
		openTreasureModal: (state) => {
			state.treasureModalOpen = true;
		},
		closeTreasureModal: (state) => {
			state.treasureModalOpen = false;
		},
		openShopModal: (state) => {
			state.shopModalOpen = true;
		},
		closeShopModal: (state) => {
			state.shopModalOpen = false;
		},
		openBattleModal: (state) => {
			state.battleModalOpen = true;
		},
		closeBattleModal: (state) => {
			state.battleModalOpen = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	openLoginModal,
	closeLoginModal,
	openRegistrationModal,
	closeRegistrationModal,
	openConfirmationModal,
	closeConfirmationModal,
	openErrorModal,
	closeErrorModal,
	openReplaceItemModal,
	closeReplaceItemModal,
	openRewardsModal,
	closeRewardsModal,
	openGameOverModal,
	closeGameOverModal,
	openLevelUpModal,
	closeLevelUpModal,
	openEquipmentModal,
	closeEquipmentModal,
	openSkillModal,
	closeSkillModal,
	openCharacterClassModal,
	closeCharacterClassModal,
	openTreasureModal,
	closeTreasureModal,
	openShopModal,
	closeShopModal,
	openBattleModal,
	closeBattleModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
