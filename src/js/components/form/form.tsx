import React from 'react';

interface IPropsForm {
  classBlock: string,
}

const Form: React.FC<IPropsForm> = ({ classBlock }) => {
  return (
    <form
      className={`${classBlock}__form form`}
      action=""
    >
      <label className="form__label" htmlFor="field-text">
        Идентификаторы строк:
      </label>

      {/* <input className="form__input" type="text" id="field-text" placeholder="Введите число/числа" /> */}
      <input className="form__input" type="text" id="field-text" placeholder="17, 19, 3" />

      <button className="form__submit" type="submit">
        Подсчитать
      </button>
    </form>
  );
};

export { Form };
