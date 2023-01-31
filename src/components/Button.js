/* eslint-disable import/no-cycle */
import React from 'react';
import styles from '../styles/modules/button.module.scss';
import { getClasses } from '../utils/getClasses';

const ButtonTypes = {
  primary: 'primary',
  secondary: 'secondary',
};

function Button({ children, type, variant, ...rest }) {
  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      className={getClasses([
        styles.button,
        styles[`button--${ButtonTypes[variant]}`],
      ])}
      {...rest}
    >
      {children}
    </button>
  );
}

function SelectButton({ children, ...rest }) {
  return (
    <select
      className={(styles.button, getClasses([styles.button__select]))}
      {...rest}
    >
      {children}
    </select>
  );
}

function SelectButtonLimit({ children, ...rest }) {
  return (
    <select
      className={(styles.button, getClasses([styles.button__select_limit]))}
      {...rest}
    >
      {children}
    </select>
  );
}

export { SelectButton, SelectButtonLimit };
export default Button;
