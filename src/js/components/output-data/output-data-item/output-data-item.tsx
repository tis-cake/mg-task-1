import React from 'react';

import { IData } from '../../../utils/interfaces';
import { getWordsCount, getVowelsCount } from '../../../utils/count';

interface IPropsOutputData {
  itemData: IData,
}

const OutputDataItem: React.FC<IPropsOutputData> = ({ itemData }) => {
  const { text } = itemData;

  const wordsCount: number = getWordsCount(text);
  const vowelsCount: number = getVowelsCount(text);

  return (
    <tr>
      <td>{text}</td>
      <td>{wordsCount}</td>
      <td>{vowelsCount}</td>
    </tr>
  );
};

export { OutputDataItem };
