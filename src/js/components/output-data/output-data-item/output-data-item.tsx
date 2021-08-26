import React from 'react';

import { IData } from '../../../utils/interfaces';

interface IPropsOutputData {
  itemData: IData,
}

const OutputDataItem: React.FC<IPropsOutputData> = ({ itemData }) => {
  const { text } = itemData;

  return (
    <tr>
      <td>{text}</td>
      <td>4</td>
      <td>8</td>
    </tr>
  );
};

export { OutputDataItem };
