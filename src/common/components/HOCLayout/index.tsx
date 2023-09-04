interface IProps {
	children: React.ReactNode;
}

export const HOCLayout: React.FC<IProps> = ({ children }) => {
	return <div>{children}</div>;
};
