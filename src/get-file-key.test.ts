import {getKeyForPSPDFKIT} from './get-file-key';

it('should return correct fileKey if original file extension is not supported', () => {
  const res = getKeyForPSPDFKIT('1', '2');

  expect(res).toEqual('2');
});

it('should return correct fileKey if original file extension is supported', () => {
  const res = getKeyForPSPDFKIT('1.xls', '2');

  expect(res).toEqual('1.xls');
});
