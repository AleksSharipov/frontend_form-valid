import React from 'react';
import { useGetNumbersQuery } from '../../redux/api';

import style from './Table.module.scss';


const Table: React.FC = () => {

  const { data = [] } = useGetNumbersQuery();

  console.log(data)

  return (
    <div className={style.table}>
      <ul className={style.list}>
        {
          data && data.map((el) => {
            return <li className={style.list__element} key={el._id}>{el.number}<br /></li>
          })
        }
      </ul>
    </div>
  )
}

export default Table

