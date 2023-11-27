import { Fragment, useEffect } from "react";
import { PageLoader } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchSession } from "features/authentication";
import { openErrorModal } from "features/modals";

interface IProps {
	children: React.ReactNode;
}

export const HOCSession: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const isSessionChecked = useAppSelector((state) => state.authentication.sessionChecked);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(fetchSession()).unwrap();
			} catch (err) {
				const { message } = err as Error;
				dispatch(openErrorModal({ message }));
			}
		};

		fetchData();
	}, [dispatch]);

	return isSessionChecked ? <Fragment>{children}</Fragment> : <PageLoader />;
};
