import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import { Contact } from "../models/contactModel.js";

export const listContacts = async () => {
	const readFileContacts = await Contact.find();
	return readFileContacts;
};

export const getContactById = async contactId => {
	const readFileContacts = await listContacts();
	const result = readFileContacts.find(contact => contact.id === contactId);
	return result || null;
};

export const addContact = async data => {
	const readFileContacts = await listContacts();
	const addNewContact = {
		id: nanoid(),
		...data,
	};
	readFileContacts.push(addNewContact);
	await fs.writeFile(contactsPath, JSON.stringify(readFileContacts, null, 2));
	return addNewContact;
};

export const removeContact = async contactId => {
	const readFileContacts = await listContacts();
	const indexContacts = readFileContacts.findIndex(contact => contact.id === contactId);
	if (indexContacts === -1) {
		return null;
	}
	const [result] = readFileContacts.splice(indexContacts, 1);
	await fs.writeFile(contactsPath, JSON.stringify(readFileContacts, null, 2));
	return result;
};

export const contactUpdate = async (contactId, data) => {
	const readFileContacts = await listContacts();

	const indexContact = readFileContacts.findIndex(contact => contact.id === contactId);
	if (indexContact === -1) {
		return null;
	}
	const currentContact = readFileContacts[indexContact];

	const updatedContact = {
		...currentContact,
		...Object.entries(data).reduce((acc, [key, value]) => {
			if (currentContact[key] !== value) {
				acc[key] = value;
			}
			return acc;
		}, {}),
	};

	readFileContacts[indexContact] = updatedContact;

	await fs.writeFile(contactsPath, JSON.stringify(readFileContacts, null, 2));

	return updatedContact;
};
