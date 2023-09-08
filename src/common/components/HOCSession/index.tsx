import { Fragment, useEffect } from "react";
import { PageLoader } from "common/components";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { fetchSession, getSessionChecked } from "features/authentication/authenticationSlice";

interface IProps {
	children: React.ReactNode;
}

export const HOCSession: React.FC<IProps> = ({ children }) => {
	const dispatch = useAppDispatch();
	const isSessionChecked = useAppSelector(getSessionChecked);

	useEffect(() => {
		dispatch(fetchSession());
	}, [dispatch]);

	if (!isSessionChecked) {
		return <PageLoader />;
	}

	return <Fragment>{children}</Fragment>;
};
