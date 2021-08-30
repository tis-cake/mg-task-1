import React from 'react';

interface IPropsFormNotifyError {
  errorText: string,
}

const FormNotifyError: React.FC<IPropsFormNotifyError> = ({ errorText }) => {
  return (
    <strong className="form__notify-error">
      {errorText}
    </strong>
  );
};

export { FormNotifyError };
