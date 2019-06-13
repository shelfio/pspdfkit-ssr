jest.mock('node-fetch');

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
  await uploadPDF(Buffer.from('hello'));

  expect(fetch).toBeCalledWith('https://pdf.google.com/api/documents', {
    body: Buffer.from('hello'),
    headers: {Authorization: 'Token token=some token', 'Content-Type': 'application/pdf'},
    method: 'POST'
  });
});

it('should return uploaded document id', async () => {
  const documentId = await uploadPDF(Buffer.from('hello'));
  expect(documentId).toEqual('some-doc-id');
});
