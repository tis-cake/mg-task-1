import React from 'react';

import { OutputDataItem } from '../output-data-item/output-data-item';

import { IData } from '../../../utils/interfaces';
import { getRandomInt } from '../../../utils/common';

interface IPropsOutputDataBody {
  data: Array<IData>,
}

const OutputDataBody: React.FC<IPropsOutputDataBody> = ({ data }) => {
  return (
    <tbody>
      {data.map((el) => (
        <OutputDataItem
          key={`item-data-${getRandomInt()}`}
          itemData={el}
        />
      ))}
    </tbody>
  );
};

export { OutputDataBody };
