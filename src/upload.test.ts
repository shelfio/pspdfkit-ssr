jest.mock('node-fetch');

import {createReadStream} from 'fs';
import fetch from 'node-fetch';
import {uploadPDF} from './upload';

beforeAll(() => {
  process.env.PSPDFKIT_SERVER_URL = 'https://pdf.google.com';
  process.env.PSPDFKIT_SERVER_AUTH_TOKEN = 'some token';
});

(fetch as unknown as jest.Mock).mockResolvedValue({
  // eslint-disable-next-line require-await
  async json() {
    return {data: {document_id: 'some-doc-id'}};
  },
  clone: () => {
    return {
      // eslint-disable-next-line require-await
      async json() {
        return {data: {document_id: 'some-doc-id'}};
      },
    };
  },
});

const params = {documentId: 'some-doc-id', fileStream: createReadStream('./test.pdf')};

it('should call fetch w/ proper params', async () => {
  await uploadPDF(params);

  expect(fetch).toHaveBeenCalledWith('https://pdf.google.com/api/documents', {
    method: 'POST',
    headers: {
      Authorization: 'Token token=some token',
      'content-type': expect.stringContaining(`multipart/form-data; boundary=`),
    },
    body: expect.anything(),
  });
});

it('should return uploaded document id', async () => {
  const documentId = await uploadPDF(params);

  expect(documentId).toEqual('some-doc-id');
});

it('should return provided doc id when doc already exists', async () => {
  (fetch as unknown as jest.Mock).mockResolvedValueOnce({
    status: 400,
    // eslint-disable-next-line require-await
    async text() {
      return 'A document with the given document_id already exists.';
    },
  });

  const documentId = await uploadPDF({
    documentId: 'some-another-doc-id',
    fileStream: createReadStream('./test.pdf'),
  });

  expect(documentId).toEqual('some-another-doc-id');
});
