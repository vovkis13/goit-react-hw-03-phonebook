import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

export default function Filter({ filter, onChangeFilterValue }) {
  return (
    <div className={s.filter}>
      <p className={s.title}>Find contacts by name</p>
      <label>
        <input
          className={s.input}
          type="text"
          name="filterValue"
          value={filter}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces.
            For example Adrian, Jacob Mercer, Charles de Batz de Castelmore
            d'Artagnan"
          onChange={onChangeFilterValue}
        />
      </label>
    </div>
  );
}
Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChangeFilterValue: PropTypes.func.isRequired,
};
