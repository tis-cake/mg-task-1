import { IData } from '../utils/interfaces';
import { checkStatus } from '../utils/error';

interface IUrlOptions {
  method: string,
  headers: Headers,
}

const TOKEN: string = '0J/RgNC40LLQtdGC0LjQutC4IQ==';
const URL: string = 'http://tmgwebtest.azurewebsites.net/api/textstrings';
const URL_OPTIONS: IUrlOptions = {
  method: 'GET',
  headers: new Headers({ 'TMG-Api-Key': TOKEN }),
};

const serverAPI = (arr: Set<Number>, onSucces, onError): void => {
  const requests: Promise<IData>[] = [];

  arr.forEach((val) => {
    requests.push(
      fetch(`${URL}/${val}`, URL_OPTIONS)
        .then(checkStatus)
        .then((response) => response.json()),
    );
  });

  Promise.all(requests)
    .then((responses: IData[]) => onSucces(responses))
    .catch((err) => onError(err));
};

export { serverAPI };
