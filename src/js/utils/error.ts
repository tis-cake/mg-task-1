import { IEnumNumber } from './interfaces';

const SuccessHTTPStatusRange: IEnumNumber = {
  MIN: 200,
  MAX: 299,
};

const checkStatus = (response: Response): Response => {
  if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
    // throw new Error(response);
    throw response;
  }

  return response;
};

const getErrorMessage = (response: Response): string => {
  const { status, statusText } = response;
  return `Ошибка ${status}: ${statusText}`;
};

export { checkStatus, getErrorMessage };
