import fs from "fs/promises";
import { Contact } from "../models/contactModel.js";

export const listContacts = async () => {
	const readFileContacts = await Contact.find();
	return readFileContacts;
};

export const getContactById = async contactId => {
	const readFileContacts = await Contact.findOne({ _id: contactId });
	return readFileContacts;
};

export const addContact = async data => {
	const readFileContacts = await Contact.create(data);
	return readFileContacts;
};

export const removeContact = async contactId => {
	const readFileContacts = await Contact.findByIdAndDelete(contactId);
	return readFileContacts;
};

export const contactUpdate = async (contactId, data) => {
	const readFileContacts = await Contact.findByIdAndUpdate(contactId, data, { new: true });
	return readFileContacts;
};

export const updateContactStatus = async (contactId, data) => {
	const readFileContacts = await Contact.findByIdAndUpdate(contactId, data, { new: true });
	return readFileContacts;
};
