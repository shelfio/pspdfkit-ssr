import {isFileSupportedForOfficePreview} from './is-file-supported';

it('should return correct fileKey if original file extension is not supported', () => {
  const res = isFileSupportedForOfficePreview('1');

  expect(res).toEqual(false);
});

it('should return correct fileKey if original file extension is supported', () => {
  const res = isFileSupportedForOfficePreview('1.xls');

  expect(res).toEqual(true);
});
