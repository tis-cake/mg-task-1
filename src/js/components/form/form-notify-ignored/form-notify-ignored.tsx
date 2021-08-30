import React from 'react';

import {   INVALID_MESSAGE_RANGE_MOBILE, INVALID_MESSAGE_RANGE_DESKTOP } from '../../../const';

const FormNotifyIgnored: React.FC = () => {
  return (
    <>
      <strong className="form__notify-ignored form__notify-ignored--desktop">
        {INVALID_MESSAGE_RANGE_DESKTOP}
      </strong>

      <strong className="form__notify-ignored form__notify-ignored--mobile">
        {INVALID_MESSAGE_RANGE_MOBILE}
      </strong>
    </>
  );
};

export { FormNotifyIgnored };
