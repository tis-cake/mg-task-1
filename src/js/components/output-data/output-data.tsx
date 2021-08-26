import React from 'react';

import { OutputDataHeader } from './output-data-header/output-data-header';
import { OutputDataBody } from './output-data-body/output-data-body';

import { IData } from '../../utils/interfaces';

interface IPropsOutputData {
  classBlock: string,
  data: Array<IData>,
}

const OutputData: React.FC<IPropsOutputData> = ({ classBlock, data }) => {
  return (
    <table className={`${classBlock}__output-data output-data`}>
      <OutputDataHeader />
      <OutputDataBody data={data} />
    </table>
  );
};

export { OutputData };
