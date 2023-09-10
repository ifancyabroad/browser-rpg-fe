import { Fragment, useEffect } from "react";
import { PageLoader } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchSession } from "features/authentication";

interface IProps {
	children: React.ReactNode;
}

export const HOCSession: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const isSessionChecked = useAppSelector((state) => state.authentication.sessionChecked);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	return isSessionChecked ? <Fragment>{children}</Fragment> : <PageLoader />;
};
