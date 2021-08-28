import React from 'react';
import { nanoid } from 'nanoid';

import { IMarkList } from '../../../utils/interfaces';

interface IPropsFormMark {
  markList: IMarkList,
}

const FormMark: React.FC<IPropsFormMark> = ({ markList }) => {
  return (
    <ul className="form__mark-list">
      {
        Object
          .entries(markList)
          .map(([valNum, valBool]) => {
            return (
              <li key={`item-mark-${nanoid()}`} className={`form__mark-item form__mark-item--${valBool}`}>{valNum}</li>
            );
          })
      }
    </ul>
  );
};

export { FormMark };
