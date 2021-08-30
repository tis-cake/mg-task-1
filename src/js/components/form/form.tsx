import React, { useState, useEffect, useRef } from 'react';

import { FormMark } from './form-mark/form-mark';
import { FormNotifyError } from './form-notify-error/form-notify-error';
import { FormNotifyIgnored } from './form-notify-ignored/form-notify-ignored';

import { getErrorMessage } from '../../utils/error';
import { IData, IMarkList } from '../../utils/interfaces';
import { TSetStateActionData } from '../../utils/types';
import { serverAPI } from '../../server/api';
import {
  RANGE_MIN,
  RANGE_MAX,
  INPUT_PATTERN,
  INPUT_PLACEHOLDER,
  ERROR_MESSAGE_EMPTY,
  INVALID_MESSAGE_PATTERN,
  SEPARATOR_COMA,
  SEPARATOR_SEMICOLON,
} from '../../const';

interface IPropsForm {
  classBlock: string,
  setData: TSetStateActionData,
}

const TIMEOUT = 3000;
const REG_EXP_SEPARATOR: RegExp = new RegExp(`[${SEPARATOR_COMA}|${SEPARATOR_SEMICOLON}]\d?`);

const Form: React.FC<IPropsForm> = ({ classBlock, setData }) => {
  // Состояние input.
  const [input, setInput] = useState('');
  // Состояние некорректно введённых чисел (вне допустимого диапазона) - для вывода предупреждения.
  const [marked, setMarked] = useState(false);
  // Список с некорректно введёными числами.
  const [markList, setMarkList] = useState({});
  // Состояние загрузки данных - для блокировки submit формы.
  const [dataLoading, setDataLoading] = useState(false);
  // Состояние ошибки с сервера - для вывода сообщения с ошибкой.
  const [error, setError] = useState(ERROR_MESSAGE_EMPTY);

  const inputRef = useRef<HTMLInputElement>();

  const inputMarkedClass: string = marked ? 'form__input--marked' : '';

  const handleDataLoadingSuccess = (data: IData[]): void => {
    /*
      Так как запрос на сервер выполняется только из одной формы, можно пренебречь универсальностью функций
      onSucces/onError и использовать их только в данном компоненте (<Form />).
    */

    setDataLoading(false);
    setData(data);
    setError(ERROR_MESSAGE_EMPTY);
  };

  const handleDataLoadingError = (err: Response): void => {
    /*
      Так как запрос на сервер выполняется только из одной формы, можно пренебречь универсальностью функций
      onSucces/onError и использовать их только в данном компоненте (<Form />).
    */

    setDataLoading(false);
    setData([]);
    setError(getErrorMessage(err));
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    /*
      При сабмите фильтруем полученное значение с учётом max/min диапазона.
      При обнаружении хотя бы 1 валидного (в пределах допустимого диапазона) числа - fetch на сервер.
      При обнаружении хотя бы 1 невалидного числа - подсвечиваем игнорируемые числа (компонент <FormMark />)
      и выводим предупреждение (компонент <FormNotifyIgnored />).
    */

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
      setDataLoading(true);
      serverAPI(finalValues, handleDataLoadingSuccess, handleDataLoadingError);
    }
  };

  const handleUserInteractionForm = (): void => {
    /*
      Подсветку и предупреждение удаляем при любом пользовательском взаимодействии с интерфейсом:
      фокусе/ховере.
    */
    if (marked) {
      setMarked(!marked);
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    /*
      Валидируем ввод только чисел с учётом доступных разделителей ([,] и [;]) прямо в input.
      Оповещаем пользователя, используя встроенное API ValidityState.
    */

    const inputEl: HTMLInputElement = inputRef.current;

    setInput(evt.currentTarget.value);

    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(INVALID_MESSAGE_PATTERN);
    } else if (!inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity('');
    }
  };

  useEffect(() => {
    /*
      Удаление компонента, уведомляющего об ошибках при запросе.
    */

    const timer = setTimeout(() => {
      setError(ERROR_MESSAGE_EMPTY);
    }, TIMEOUT);

    return () => clearTimeout(timer);
  }, [error]);

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

      <button
        className="form__submit"
        type="submit"
        disabled={dataLoading}
      >
        Подсчитать
      </button>

      {marked && <FormNotifyIgnored />}
      {marked && <FormMark markList={markList} />}
      {error && <FormNotifyError errorText={error} />}
    </form>
  );
};

export { Form };
