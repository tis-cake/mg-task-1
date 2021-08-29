import { IEnumNumber } from './interfaces';

const TIMEOUT: number = 800;
const TIMEOUT_COEFFICIENT: number = 4;

const SuccessHTTPStatusRange: IEnumNumber = {
  MIN: 200,
  MAX: 299,
};

const checkStatus = (response) => {
  if (response.status < SuccessHTTPStatusRange.MIN || response.status > SuccessHTTPStatusRange.MAX) {
    // throw new Error(response);
    throw response;
  }

  return response;
};

const onErrorShowModal = (errorStatus: string, errorText: string): void => {
  const node: HTMLDivElement = document.createElement('div');
  node.classList.add('error-modal');
  node.textContent = `Ошибка ${errorStatus}: ${errorText}`;

  document.body.insertAdjacentElement('afterbegin', node);

  setTimeout(() => {
    node.remove();
  }, TIMEOUT * TIMEOUT_COEFFICIENT);
};

const handleError = (error): void => {
  const { status, statusText } = error;

  onErrorShowModal(status, statusText);
};

export { checkStatus, handleError };
