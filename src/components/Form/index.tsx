import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectNumber } from '../../redux/slices/numberSlice';

import RegionPopup from '../RegionPopup';

import style from './Form.module.scss';
import { useSendMessageMutation } from '../../redux/api';

const Form: React.FC = () => {

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [alphabet, setAlphabet] = useState(false);

  const { region } = useSelector(selectNumber);

  const [sendMessage] = useSendMessageMutation();

  const handleSubmitForm = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValid) {
      sendMessage(`${region} ${value}`)
      setValue('')
    }

    return setIsValid(false)
  }

  const regex = new RegExp('^[0-9]+$');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (event.target.value.length >= 3 && event.target.value.length <= 10 && regex.test(event.target.value)) {
      setIsValid(true)
    } else setIsValid(false)
  }

  const checkInput = (event: React.KeyboardEvent<Element>) => {
    if (!/[0-9]/.test(event.key) && event.key !== 'Enter') {
      setAlphabet(true)
      event.preventDefault();
    } else {
      setAlphabet(false)
    }
  }

  return (
    <div className={style.login}>
      <h2>Форма добавления номера телефона: </h2>
      <form onSubmit={handleSubmitForm}>
        <div className={style.fieldset}>
          <div className={style.fieldset__content}>
            <RegionPopup />
            <input
              onKeyPress={checkInput}
              value={value}
              onChange={handleChange}
              type="phone"
              className={isValid ? style.success : style.error}
            />
          </div>
          {
            alphabet ? <span className={style.fieldset__content_valid}>Можно вводить только цифры.</span> : isValid ? '' : <span className={style.fieldset__content_valid}>Длина номера телефона от 3 до 10 цифр.</span>
          }
        </div>
        <button className={isValid ? '' : style.disabled}>Добавить</button>
      </form>
    </div>
  )
}

export default Form;