import fetch from 'node-fetch';

export async function uploadPDF(fileBuffer: Buffer): Promise<string> {
  const PSPDFServerURL = process.env.PSPDFKIT_SERVER_URL;
  const PSPDFAuthToken = process.env.PSPDFKIT_SERVER_AUTH_TOKEN;
  const uploadPDFURL = `${PSPDFServerURL}/api/documents`;

  const response = await fetch(uploadPDFURL, {
    method: 'POST',
    body: fileBuffer,
    headers: {Authorization: `Token token=${PSPDFAuthToken}`, 'Content-Type': 'application/pdf'}
  });

  const {
    data: {document_id}
  } = await response.json();

  return document_id;
}
