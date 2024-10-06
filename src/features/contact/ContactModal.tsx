import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link,
	Stack,
	TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { useMemo, useState } from "react";
import { closeContactModal, sendContactForm } from "features/contact";
import { openErrorModal } from "features/modals";

interface IForm {
	email: string;
	subject: string;
	body: string;
}

const defaultForm: IForm = {
	email: "",
	subject: "",
	body: "",
};

export const ContactModal: React.FC = () => {
	const dispatch = useAppDispatch();
	const { open, sent } = useAppSelector((state) => state.contact);
	const isLoading = useAppSelector((state) => state.contact.status === "loading");
	const [form, setForm] = useState<IForm>(defaultForm);
	const isFormValid = useMemo(() => Object.values(form).every((value) => value.length > 0), [form]);
	const disabled = isLoading || !isFormValid;

	const handleClose = () => {
		dispatch(closeContactModal());
		setForm(defaultForm);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setForm({
			...form,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!isFormValid) {
			return;
		}

		try {
			await dispatch(sendContactForm(form)).unwrap();
			setForm(defaultForm);
		} catch (err) {
			const { message } = err as Error;
			dispatch(openErrorModal({ message }));
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle textAlign="center">Contact Us</DialogTitle>
			<DialogContent>
				<form id="contact-form" onSubmit={handleSubmit}>
					<Stack spacing={2}>
						<DialogContentText>Please fill out the form below to contact us.</DialogContentText>
						<TextField
							fullWidth
							label="Email"
							name="email"
							type="email"
							value={form.email}
							onChange={handleChange}
							required
						/>
						<TextField
							fullWidth
							label="Subject"
							name="subject"
							value={form.subject}
							onChange={handleChange}
							required
						/>
						<TextField
							fullWidth
							label="Body"
							name="body"
							multiline
							rows={4}
							value={form.body}
							onChange={handleChange}
							required
						/>
					</Stack>
				</form>
				{sent && (
					<DialogContentText textAlign="center" sx={{ color: "success.main" }} mt={2}>
						Message sent successfully!
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Link component="button" color="text.secondary" onClick={handleClose}>
					Cancel
				</Link>
				<Link component="button" type="submit" form="contact-form" disabled={disabled}>
					Submit
				</Link>
			</DialogActions>
		</Dialog>
	);
};
