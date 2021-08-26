import React from 'react';
import { nanoid } from 'nanoid';

import { OutputDataItem } from '../output-data-item/output-data-item';

import { IData } from '../../../utils/interfaces';

interface IPropsOutputDataBody {
  data: Array<IData>,
}

const OutputDataBody: React.FC<IPropsOutputDataBody> = ({ data }) => {
  return (
    <tbody>
      {data.map((el) => (
        <OutputDataItem
          key={`item-data-${nanoid()}`}
          itemData={el}
        />
      ))}
    </tbody>
  );
};

export { OutputDataBody };
