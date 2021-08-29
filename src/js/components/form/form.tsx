/*
  1. Валидируем ввод только чисел с учётом доступных разделителей ([,] и [;]) прямо в input.
     Оповещаем пользователя, используя встроенное API ValidityState.

  2. При сабмите фильтруем полученное значение с учётом max/min диапазона.
     При обнаружении хотя бы 1 валидного (в пределах допустимого диапазона) числа - fetch на сервер.
     При обнаружении хотя бы 1 невалидного числа - подсвечиваем игнорируемые числа (компонент <FormMark />)
     и выводим предупреждение (компонент <FormNotifyIgnored />).

  3. Подсветку и предупреждение удаляем при любом пользовательском взаимодействии с интерфейсом:
     фокусе/ховере.
*/

import React, { useState, useRef } from 'react';

import { FormMark } from './form-mark/form-mark';
import { FormNotifyIgnored } from './form-notify-ignored/form-notify-ignored';

import { TSetStateActionData } from '../../utils/types';
import { IMarkList } from '../../utils/interfaces';
import { serverAPI } from '../../server/api';
import {
  RANGE_MIN,
  RANGE_MAX,
  INPUT_PATTERN,
  INPUT_PLACEHOLDER,
  INVALID_MESSAGE_PATTERN,
  SEPARATOR_COMA,
  SEPARATOR_SEMICOLON,
} from '../../const';

interface IPropsForm {
  classBlock: string,
  setData: TSetStateActionData,
}

const REG_EXP_SEPARATOR: RegExp = new RegExp(`[${SEPARATOR_COMA}|${SEPARATOR_SEMICOLON}]\d?`);

const Form: React.FC<IPropsForm> = ({ classBlock, setData }) => {
  const [input, setInput] = useState('');
  const [marked, setMarked] = useState(false);
  const [markList, setMarkList] = useState({});
  const inputRef = useRef<HTMLInputElement>();

  const inputMarkedClass: string = marked ? 'form__input--marked' : '';

  // см. 2.
  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();

    const finalValues: Set<Number> = new Set([]);
    const markedValue: IMarkList = {};
    let isIgnoredValue: boolean = false;

    const inputValue: string[] = input.split(REG_EXP_SEPARATOR);

    for (const value of inputValue) {
      const currentValue: number = Number(value);
      const isValidRange: boolean = (currentValue >= RANGE_MIN && currentValue <= RANGE_MAX);

      if (isValidRange) {
        finalValues.add(currentValue);
        markedValue[currentValue] = true;
      } else {
        isIgnoredValue = true;
        markedValue[currentValue] = false;
      }
    }

    if (isIgnoredValue) {
      setMarked(true);
      setMarkList(markedValue);
    }

    if (finalValues.size > 0) {
      serverAPI(finalValues, setData);
    }
  };

  // см. 3.
  const handleUserInteractionForm = (): void => {
    if (marked) {
      setMarked(!marked);
    }
  };

  // см. 1.
  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    const inputEl: HTMLInputElement = inputRef.current;

    setInput(evt.currentTarget.value);

    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(INVALID_MESSAGE_PATTERN);
    } else if (!inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity('');
    }
  };

  return (
    <form
      className={`${classBlock}__form form`}
      method="get"
      action="#"
      onSubmit={handleFormSubmit}
    >
      <label className="form__label" htmlFor="field-text">
        Идентификаторы строк:
      </label>

      <input
        id="field-text"
        className={`form__input ${inputMarkedClass}`}
        type="text"
        required
        value={input}
        ref={inputRef}
        pattern={INPUT_PATTERN}
        onInput={handleInputChange}
        placeholder={INPUT_PLACEHOLDER}
        onFocus={handleUserInteractionForm}
        onMouseEnter={handleUserInteractionForm}
      />

      <button className="form__submit" type="submit">
        Подсчитать
      </button>

      {marked && <FormNotifyIgnored />}
      {marked && <FormMark markList={markList} />}
    </form>
  );
};

export { Form };
