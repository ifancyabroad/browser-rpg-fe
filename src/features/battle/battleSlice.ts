import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { IActionPayload, IApiError, IBattle, ICharacter, ITreasurePayload } from "common/types";
import { Zone } from "common/utils";

interface IGameState {
	battle: IBattle | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IGameState = {
	battle: null,
	status: "idle",
};

export const startBattle = createAsyncThunk("battle/startBattle", async (payload: Zone, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ battle: IBattle; character: ICharacter }>("/api/battle/start", payload);
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const nextBattle = createAsyncThunk("battle/nextBattle", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.post<{ battle: IBattle; character: ICharacter }>("/api/battle/next");
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchBattle = createAsyncThunk("battle/fetchBattle", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<{ battle: IBattle; character: ICharacter }>("/api/battle");
		return response.data;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const postAction = createAsyncThunk(
	"battle/postAction",
	async (payload: IActionPayload, { rejectWithValue }) => {
		try {
			const response = await axios.post<{ battle: IBattle; character: ICharacter }>(
				"/api/battle/action",
				payload,
			);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<IApiError>;
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data.error);
		}
	},
);

export const takeTreasure = createAsyncThunk(
	"character/takeTreasure",
	async (payload: ITreasurePayload, { rejectWithValue }) => {
		try {
			const response = await axios.post<{ battle: IBattle; character: ICharacter }>(
				"/api/battle/takeTreasure",
				payload,
			);
			return response.data;
		} catch (err) {
			const error = err as AxiosError<IApiError>;
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data.error);
		}
	},
);

export const battleSelector = (state: RootState) => state.battle;

export const battleSlice = createSlice({
	name: "battle",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(startBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(startBattle.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(startBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(nextBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(nextBattle.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(nextBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchBattle.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchBattle.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(fetchBattle.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(postAction.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(postAction.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(postAction.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(takeTreasure.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(takeTreasure.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.battle = action.payload.battle;
		});
		builder.addCase(takeTreasure.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
// export const { } = battleSlice.actions;

export default battleSlice.reducer;
