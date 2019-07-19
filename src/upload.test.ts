jest.mock('node-fetch');

import {createReadStream} from 'fs';
import fetch from 'node-fetch';
import {uploadPDF} from './upload';

beforeAll(() => {
  process.env.PSPDFKIT_SERVER_URL = 'https://pdf.google.com';
  process.env.PSPDFKIT_SERVER_AUTH_TOKEN = 'some token';
});

((fetch as unknown) as jest.Mock).mockResolvedValue({
  async json() {
    return {data: {document_id: 'some-doc-id'}};
  }
});

it('should call fetch w/ proper params', async () => {
  await uploadPDF('some-doc-id', createReadStream('./test.pdf'));

  expect(fetch).toBeCalledWith('https://pdf.google.com/api/documents', {
    method: 'POST',
    headers: {
      Authorization: 'Token token=some token',
      'content-type': expect.stringContaining(`multipart/form-data; boundary=`)
    },
    body: expect.anything()
  });
});

it('should return uploaded document id', async () => {
  const documentId = await uploadPDF('some-doc-id', createReadStream('./test.pdf'));
  expect(documentId).toEqual('some-doc-id');
});
