import fetch from 'node-fetch';
import FormData from 'form-data';
import {Readable} from 'stream';
import {UploadDocumentResponse} from './types';

export async function uploadPDF(documentId: string, fileStream: Readable): Promise<string> {
  const PSPDFServerURL = process.env.PSPDFKIT_SERVER_URL;
  const PSPDFAuthToken = process.env.PSPDFKIT_SERVER_AUTH_TOKEN;
  const uploadPDFURL = `${PSPDFServerURL}/api/documents`;

  const form = new FormData();
  form.append('file', fileStream);
  form.append('document_id', documentId);

  const response = await fetch(uploadPDFURL, {
    method: 'POST',
    body: form,
    headers: {
      Authorization: `Token token=${PSPDFAuthToken}`,
      ...form.getHeaders()
    }
  });

  if (response.status === 400) {
    const errorMessage = await response.text();

    if (errorMessage.includes(`A document with the given document_id already exists`)) {
      return documentId;
    }
  }

  const {
    data: {document_id}
  }: UploadDocumentResponse = await response.json();

  return document_id;
}
