import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList/';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  #contacts = 'contacts';
  addItemToContacts = (e, newName, newNumber) => {
    e.preventDefault();
    if (
      this.state.contacts.find(
        ({ name }) => name.toLowerCase() === newName.toLowerCase(),
      )
    )
      return window.alert(`${newName} is already in contacts.`);

    this.setState(prevState => ({
      contacts: [
        {
          id: nanoid(),
          name: newName,
          number: newNumber,
        },
        ...prevState.contacts,
      ],
    }));
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem(this.#contacts));
    if (parsedContacts) this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    const isUpdated = prevState.contacts !== contacts;
    if (isUpdated) {
      localStorage.setItem(this.#contacts, JSON.stringify(contacts));
    }
  }

  deleteItemFromContacts = e => {
    e.preventDefault();
    this.setState(prevState => {
      const tempArr = prevState.contacts.filter(
        ({ id }) => id !== e.target.value,
      );
      return { contacts: [...tempArr] };
    });
  };

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  setFilterValue = e => this.setState({ filter: e.target.value });

  render() {
    const filteredContacts = this.filterContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.addItemToContacts} />
        <h2>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onChangeFilterValue={this.setFilterValue}
        />
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteItemFromContacts}
        />
      </div>
    );
  }
}
