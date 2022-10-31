import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactsForm } from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Section } from './Section/Section';
import { Filter } from './Filter/Filter';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectContacts,
  selectIsLoading,
  selectError,
} from 'redux/contacts/contactsSelectors';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from 'redux/contacts/contactsOperations';
import { onFilter } from 'redux/filter/filterSlice';
import { Loader } from './Loader/Loader';

export const App = () => {
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispath = useDispatch();

  useEffect(() => {
    dispath(fetchContacts());
  }, [dispath]);

  const onAddContact = data => {
    if (contacts.find(contact => contact.name === `${data.name}`)) {
      return toast.warning(`${data.name} is already in contacts.`);
    }
    dispath(addContact({ ...data }));
  };

  const handleChange = e => {
    const { value } = e.target;
    dispath(onFilter(value));
  };

  const onDeleteContact = contactId => {
    dispath(deleteContact(contactId));
  };

  return (
    <>
      <Section title="Phonebook">
        <ContactsForm onSubmit={onAddContact} />
      </Section>

      <Section title="Contacts">
        {<Filter handleChange={handleChange} />}
        {error && <p>{error.message}</p>}
        {contacts && !error && (
          <ContactsList onDeleteContact={onDeleteContact} />
        )}
        {isLoading && <Loader />}
      </Section>
      <ToastContainer
        autoClose={3000}
        position="top-center"
        hideProgressBar={false}
      />
    </>
  );
};
