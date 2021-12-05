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

  deleteItemFromContacts = e => {
    e.preventDefault();
    this.setState(prevState => {
      const tempArr = prevState.contacts.filter(
        contact => contact.id !== e.target.value,
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
          filteredContacts={this.filterContacts()}
          deleteContact={this.deleteItemFromContacts}
        />
      </div>
    );
  }
}
