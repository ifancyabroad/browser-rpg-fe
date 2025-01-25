import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import axios, { AxiosError } from "axios";
import { IApiError, IHistoryPayload, IHistoryResponse, IOverallStats } from "common/types";
import { HistorySortStat } from "common/utils";

interface IStatsState {
	overall: IOverallStats | null;
	history: IHistoryResponse;
	sort: HistorySortStat;
	order: "asc" | "desc";
	status: "idle" | "loading" | "succeeded" | "failed";
	historyStatus: "idle" | "loading" | "succeeded" | "failed";
	error?: string;
}

const initialState: IStatsState = {
	overall: null,
	history: {
		history: [],
		count: 0,
		page: 0,
	},
	sort: HistorySortStat.UpdatedAt,
	order: "desc",
	status: "idle",
	historyStatus: "idle",
};

export const fetchOverall = createAsyncThunk("stats/overall", async (_, { rejectWithValue }) => {
	try {
		const response = await axios.get<{ overall: IOverallStats }>("/api/stats/overall?characterClass=all");
		return response.data.overall;
	} catch (err) {
		const error = err as AxiosError<IApiError>;
		if (!error.response) {
			throw err;
		}
		return rejectWithValue(error.response.data.error);
	}
});

export const fetchHistory = createAsyncThunk(
	"stats/history",
	async (payload: IHistoryPayload | void, { rejectWithValue }) => {
		try {
			const response = await axios.get<{ history: IHistoryResponse }>("/api/stats/history", {
				params: payload,
			});
			return response.data.history;
		} catch (err) {
			const error = err as AxiosError<IApiError>;
			if (!error.response) {
				throw err;
			}
			return rejectWithValue(error.response.data.error);
		}
	},
);

export const statsSelector = (state: RootState) => state.stats;

export const statsSlice = createSlice({
	name: "stats",
	initialState,
	reducers: {
		setSort: (state, action) => {
			state.sort = action.payload;
		},
		setOrder: (state, action) => {
			state.order = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchOverall.pending, (state) => {
			state.status = "loading";
		});
		builder.addCase(fetchOverall.fulfilled, (state, action) => {
			state.status = "succeeded";
			state.overall = action.payload;
		});
		builder.addCase(fetchOverall.rejected, (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		});
		builder.addCase(fetchHistory.pending, (state) => {
			state.historyStatus = "loading";
		});
		builder.addCase(fetchHistory.fulfilled, (state, action) => {
			state.historyStatus = "succeeded";
			state.history = action.payload;
		});
		builder.addCase(fetchHistory.rejected, (state, action) => {
			state.historyStatus = "failed";
			state.error = action.error.message;
		});
	},
});

// Action creators are generated for each case reducer function
export const { setSort, setOrder } = statsSlice.actions;

export default statsSlice.reducer;
