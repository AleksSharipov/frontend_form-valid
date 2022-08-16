import React from 'react';
import { useGetNumbersQuery } from '../../redux/api';

import style from './Table.module.scss';


const Table: React.FC = () => {

  const { data = [] } = useGetNumbersQuery();

  console.log(data)

  return (
    <div className={style.table}>
      {
        data && data.map((el) => {
          return <div key={el._id}>{el.number}<br /></div>
        })
      }
    </div>
  )
}

export default Table

