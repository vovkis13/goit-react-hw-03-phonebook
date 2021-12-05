import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  reset = () => this.setState({ name: '', number: '' });

  handleSubmit = e => {
    const { name, number } = this.state;
    this.props.onFormSubmit(e, name, number);
    this.reset();
  };

  render() {
    const { name, number } = this.state;

    return (
      <form className={s.form} onSubmit={this.handleSubmit}>
        <div className={s.inputs}>
          <label className={s.label}>
            <p className={s.labelName}>Name</p>
            <input
              className={s.input}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleChange}
            />
          </label>
          <label className={s.label}>
            <p className={s.labelName}>Number</p>
            <input
              className={s.input}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.handleChange}
            />
          </label>
        </div>
        <button className={s.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
