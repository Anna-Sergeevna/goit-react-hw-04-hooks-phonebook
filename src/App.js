import { useState, useEffect } from 'react';
import shortid from 'shortid';
import Container from 'components/Container';
import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import './App.css';

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? [],
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   setContacts(JSON.parse(window.localStorage.getItem('contacts')) ?? []);
  // }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const contact = {
      id: shortid.generate(),
      name,
      number,
    };

    contacts.map(contact => contact.name).includes(name)
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <Container title=''>
      <Section title='Phonebook'>
        <ContactForm onSubmit={addContact} />
      </Section>
      <Section title='Contacts'>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={getVisibleContacts()}
          onDeleteContact={deleteContact}
        />
      </Section>
    </Container>
  );
}

export default App;

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevState) {
//     const { contacts } = this.state;

//     if (contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }

//     // contacts !== prevState.contacts &&
//     //   localStorage.setItem('contacts', JSON.stringify(contacts));
//   }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       id: shortid.generate(),
//       name,
//       number,
//     };

//     contacts.map(contact => contact.name).includes(name)
//       ? alert(`${name} is already in contacts.`)
//       : this.setState(prevState => ({
//           contacts: [contact, ...prevState.contacts],
//         }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizeFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizeFilter),
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const { filter } = this.state;
//     const addContact = this.addContact;
//     const changeFilter = this.changeFilter;
//     const visibleContacts = this.getVisibleContacts();
//     const onDeleteContact = this.deleteContact;

//     return (
//       <Container title='Телефонная книга'>
//         <Section title='Phonebook'>
//           <ContactForm onSubmit={addContact} />
//         </Section>
//         <Section title='Contacts'>
//           <Filter value={filter} onChange={changeFilter} />
//           <ContactList
//             contacts={visibleContacts}
//             onDeleteContact={onDeleteContact}
//           />
//         </Section>
//       </Container>
//     );
//   }
// }
