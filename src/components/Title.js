import React from 'react';
import style from '../styles/modules/title.module.scss';

function Title({ children }) {
  return <p className={style.title}>{children}</p>;
}

export default Title;
