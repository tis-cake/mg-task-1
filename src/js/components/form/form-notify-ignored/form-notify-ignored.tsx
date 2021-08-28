import React from 'react';

import { INVALID_MESSAGE_RANGE } from '../../../const';

const FormNotifyIgnored: React.FC = () => {
  return (
    <strong className="form__notify-ignored">
      {INVALID_MESSAGE_RANGE}
    </strong>
  );
};

export { FormNotifyIgnored };
