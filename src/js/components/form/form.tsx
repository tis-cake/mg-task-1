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
  // State input.
  const [input, setInput] = useState('');
  // State of incorrectly entered numbers (out of range) - for showing warning.
  const [marked, setMarked] = useState(false);
  // A list with  incorrectly entered numbers.
  const [markList, setMarkList] = useState({});
  // State of data loading - for disabling a submit form.
  const [dataLoading, setDataLoading] = useState(false);
  // State of a server error - for showing a message with an error.
  const [error, setError] = useState(ERROR_MESSAGE_EMPTY);

  const inputRef = useRef<HTMLInputElement>();

  const inputMarkedClass: string = marked ? 'form__input--marked' : '';

  const handleDataLoadingSuccess = (data: IData[]): void => {
    /*
      Because of the fact that a request is completing only from one single form, it's possible to ignore
      the universality of the functions onSucces/onError and use them in the current component (<Form />).
    */

    setDataLoading(false);
    setData(data);
    setError(ERROR_MESSAGE_EMPTY);
  };

  const handleDataLoadingError = (err: Response): void => {
    /*
      Because of the fact that a request is completing only from one single form, it's possible to ignore
      the universality of the functions onSucces/onError and use them in the current component (<Form />).
    */

    setDataLoading(false);
    setData([]);
    setError(getErrorMessage(err));
  };

  const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>): void => {
    /*
      After submit we filter the entered value giving due consideration to max/min range.
      If we get at least 1 valid number (within the available range), we fetch the request.
      If we get at least 1 invalid number, we outline ignored numbers (a component <FormMark />) and show
      a warning notification (a component <FormNotifyIgnored />).
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
      We remove outline and a warning notification while a user is interacting with the interface:
      focus and hover.
    */

    if (marked) {
      setMarked(!marked);
    }
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    /*
      Validate input of numbers only taking into account available separators ([,] и [;]) in an input field.
      Notify a user using built-in API ValidityState.
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
      Removing a component notifying about request errors.
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
