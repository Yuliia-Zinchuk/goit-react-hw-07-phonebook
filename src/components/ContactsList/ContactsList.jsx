import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ContactsListItem } from './ContactsListItem';
import { selectVisibleContacts } from 'redux/filter/filterSelectors';
import css from './ContactsList.module.css';
//import { selectContacts } from 'redux/contacts/contactsSelectors';

export const ContactsList = ({ onDeleteContact }) => {
  // const contacts = useSelector(selectContacts);
  const filter = useSelector(selectVisibleContacts);

  return (
    <>
      <ul className={css.contactsList}>
        {filter
          // contacts.filter(({ name }) =>
          //   name.toLowerCase().includes(filter.toLowerCase()))
          .map(({ id, name, number }) => (
            <li className={css.contactItem} key={id}>
              <ContactsListItem
                name={name}
                number={number}
                onDeleteContact={() => {
                  onDeleteContact(id);
                }}
              />
            </li>
          ))}
      </ul>
    </>
  );
};

ContactsList.propTypes = {
  onDeleteContact: PropTypes.func.isRequired,
};
