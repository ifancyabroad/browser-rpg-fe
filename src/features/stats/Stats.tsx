import {
	Box,
	Container,
	Grid,
	Link,
	Stack,
	styled,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useEffect } from "react";
import { openCharacterModal, openErrorModal } from "features/modals";
import { Footer, Loader, PageLoader } from "common/components";
import { Header } from "../character/Header";
import { fetchHistory, fetchOverall, setOrder, setSort } from "./statsSlice";
import { HistorySortStat } from "common/utils";

const OverallStats: React.FC = () => {
	const dispatch = useAppDispatch();
	const overall = useAppSelector((state) => state.stats.overall);

	const handleViewHero = (id: string) => {
		dispatch(openCharacterModal({ id }));
	};

	if (!overall) {
		return <Typography>No stats available. Create a hero and start your adventure!</Typography>;
	}

	const { deaths, kills, victories, record, topHero } = overall;

	return (
		<Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2}>
			<Typography>
				<Box component="span" color="secondary.main">
					Total Victories:
				</Box>{" "}
				{victories}
			</Typography>
			<Typography>
				<Box component="span" color="secondary.main">
					Total Kills:
				</Box>{" "}
				{kills}
			</Typography>
			<Typography>
				<Box component="span" color="secondary.main">
					Total Deaths:
				</Box>{" "}
				{deaths}
			</Typography>
			<Typography>
				<Box component="span" color="secondary.main">
					Record
				</Box>{" "}
				{record}
			</Typography>
			<Typography>
				<Box component="span" color="secondary.main">
					Top Hero:
				</Box>{" "}
				<Link component="button" onClick={handleViewHero.bind(null, topHero.id)}>
					{topHero.name}
				</Link>
			</Typography>
		</Box>
	);
};

interface TablePaginationActionsProps {
	count: number;
	page: number;
	rowsPerPage: number;
	onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
}

const TablePaginationActions = (props: TablePaginationActionsProps) => {
	const { count, page, rowsPerPage, onPageChange } = props;
	const status = useAppSelector((state) => state.stats.historyStatus);
	const isLoading = status === "loading";
	const firstPage = 0;
	const lastPage = Math.max(0, Math.ceil(count / rowsPerPage) - 1);
	const isPreviousDisabled = isLoading || page === firstPage;
	const isNextDisabled = isLoading || page >= lastPage;

	const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, firstPage);
	};

	const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page - 1);
	};

	const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, page + 1);
	};

	const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		onPageChange(event, lastPage);
	};

	return (
		<Box sx={{ flexShrink: 0, ml: 2.5, display: "flex", alignItems: "center", gap: 1.5 }}>
			<Link
				component="button"
				color="text.secondary"
				onClick={handleFirstPageButtonClick}
				disabled={isPreviousDisabled}
				aria-label="first page"
			>
				First
			</Link>
			<Link
				component="button"
				onClick={handleBackButtonClick}
				disabled={isPreviousDisabled}
				aria-label="previous page"
			>
				Previous
			</Link>
			<Link component="button" onClick={handleNextButtonClick} disabled={isNextDisabled} aria-label="next page">
				Next
			</Link>
			<Link
				component="button"
				color="text.secondary"
				onClick={handleLastPageButtonClick}
				disabled={isNextDisabled}
				aria-label="last page"
			>
				Last
			</Link>
		</Box>
	);
};

const TableHeaderCell = styled(TableCell)(({ theme }) => ({
	color: theme.palette.info.light,
	"&:hover": {
		cursor: "pointer",
		textDecoration: "underline",
	},
	"&.active": {
		textDecoration: "underline",
	},
}));

const StickyTableCell = styled(TableHeaderCell)(({ theme }) => ({
	backgroundColor: "#000",
	position: "sticky",
	left: 0,
	zIndex: 1,
}));

const DEFAULT_SORTS: Record<HistorySortStat, "asc" | "desc"> = {
	[HistorySortStat.Name]: "asc",
	[HistorySortStat.Level]: "desc",
	[HistorySortStat.CharacterClass]: "asc",
	[HistorySortStat.Day]: "desc",
	[HistorySortStat.Kills]: "desc",
	[HistorySortStat.UpdatedAt]: "desc",
};

export const HistoryTable: React.FC = () => {
	const dispatch = useAppDispatch();
	const { history, count, page } = useAppSelector((state) => state.stats.history);
	const sort = useAppSelector((state) => state.stats.sort);
	const order = useAppSelector((state) => state.stats.order);
	const status = useAppSelector((state) => state.stats.historyStatus);
	const isLoading = status === "loading";
	const noHistory = history.length === 0 && status === "succeeded";

	const handleChangePage = async (event: unknown, newPage: number) => {
		try {
			await dispatch(fetchHistory({ page: newPage, sort, order })).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleChangeSort = async (property: HistorySortStat) => {
		try {
			let newOrder = order;
			if (sort === property) {
				newOrder = order === "asc" ? "desc" : "asc";
			} else {
				newOrder = DEFAULT_SORTS[property];
			}
			dispatch(setOrder(newOrder));
			dispatch(setSort(property));
			await dispatch(fetchHistory({ sort: property, order: newOrder })).unwrap();
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	const handleViewHero = (id: string) => {
		dispatch(openCharacterModal({ id }));
	};

	const getClassName = (property: HistorySortStat) => {
		return sort === property ? "active" : "";
	};

	return (
		<div>
			<TableContainer sx={{ minHeight: 400 }}>
				<Table size="small">
					<TableHead>
						<TableRow>
							<StickyTableCell
								className={getClassName(HistorySortStat.Name)}
								sx={{ minWidth: 100 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.Name)}
							>
								Name
							</StickyTableCell>
							<TableHeaderCell
								align="right"
								className={getClassName(HistorySortStat.Level)}
								sx={{ minWidth: 100 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.Level)}
							>
								Level
							</TableHeaderCell>
							<TableHeaderCell
								align="right"
								className={getClassName(HistorySortStat.CharacterClass)}
								sx={{ minWidth: 100 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.CharacterClass)}
							>
								Class
							</TableHeaderCell>
							<TableHeaderCell
								align="right"
								className={getClassName(HistorySortStat.Day)}
								sx={{ minWidth: 100 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.Day)}
							>
								Day
							</TableHeaderCell>
							<TableHeaderCell
								align="right"
								className={getClassName(HistorySortStat.Kills)}
								sx={{ minWidth: 100 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.Kills)}
							>
								Kills
							</TableHeaderCell>
							<TableHeaderCell
								align="right"
								className={getClassName(HistorySortStat.UpdatedAt)}
								sx={{ minWidth: 200 }}
								onClick={handleChangeSort.bind(null, HistorySortStat.UpdatedAt)}
							>
								Date
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoading ? (
							<TableRow>
								<TableCell component="th" scope="row" colSpan={6} align="center">
									<Loader />
								</TableCell>
							</TableRow>
						) : noHistory ? (
							<TableRow>
								<TableCell component="th" scope="row" colSpan={6} align="center">
									No characters found.
								</TableCell>
							</TableRow>
						) : (
							history.map((row) => (
								<TableRow key={row.id}>
									<StickyTableCell component="th" scope="row" sx={{ minWidth: 100 }}>
										<Link component="button" onClick={handleViewHero.bind(null, row.id)}>
											{row.name}
										</Link>
									</StickyTableCell>
									<TableCell align="right" sx={{ minWidth: 100 }}>
										{row.level}
									</TableCell>
									<TableCell align="right" sx={{ minWidth: 100 }}>
										{row.characterClass}
									</TableCell>
									<TableCell align="right" sx={{ minWidth: 100 }}>
										{row.day}
									</TableCell>
									<TableCell align="right" sx={{ minWidth: 100 }}>
										{row.kills}
									</TableCell>
									<TableCell align="right" sx={{ minWidth: 200, whiteSpace: "nowrap" }}>
										{new Date(row.updatedAt).toLocaleDateString()}{" "}
										{new Date(row.updatedAt).toLocaleTimeString()}
									</TableCell>
								</TableRow>
							))
						)}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component="div"
				count={count}
				rowsPerPage={10}
				rowsPerPageOptions={[]}
				page={page}
				onPageChange={handleChangePage}
				ActionsComponent={TablePaginationActions}
			/>
		</div>
	);
};

export const Stats: React.FC = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector((state) => state.stats.status);
	const isLoading = status === "loading";

	useEffect(() => {
		const fetchData = async () => {
			try {
				await Promise.all([dispatch(fetchOverall()).unwrap(), dispatch(fetchHistory()).unwrap()]);
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<Box
			sx={{
				minHeight: "100svh",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Header />

			<Box flex={1}>
				<Container maxWidth="md">
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Stack spacing={2} mb={4}>
								<Typography color="text.secondary">Overall Stats</Typography>
								<OverallStats />
							</Stack>

							<Stack spacing={2}>
								<Typography color="text.secondary">History</Typography>
								<HistoryTable />
							</Stack>
						</Grid>
					</Grid>
				</Container>
			</Box>

			<Footer />
		</Box>
	);
};
