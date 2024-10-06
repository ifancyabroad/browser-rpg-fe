import { createAsyncThunk, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { IApiError, IContactPayload } from "common/types";

interface IContactState {
	open: boolean;
	sent: boolean;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IContactState = {
	open: false,
	sent: false,
	status: "idle",
};

export const sendContactForm = createAsyncThunk("contact", async (payload: IContactPayload, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ message: string }>("/api/contact", payload);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const contactSelector = (state: RootState) => state.contact;

export const getIsLoading = createSelector(contactSelector, ({ status }) => status === "loading");

export const contactSlice = createSlice({
	name: "contact",
	initialState,
	reducers: {
		openContactModal: (state) => {
			state.open = true;
		},
		closeContactModal: (state) => {
			state.open = false;
			state.sent = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(sendContactForm.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(sendContactForm.fulfilled, (state) => {
			state.status = "succeeded";
			state.sent = true;
		});
		builder.addCase(sendContactForm.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
export const { closeContactModal, openContactModal } = contactSlice.actions;

export default contactSlice.reducer;
