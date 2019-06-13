import jwt from 'jsonwebtoken';

export function getJWTForDocumentPreview(documentId: string): string {
  const PSPDFServerJWTKey = process.env.PSPDFKIT_SERVER_JWT_KEY.replace(/\\n/g, '\n');
  const PSPDFServerJWTPassphrase = process.env.PSPDFKIT_SERVER_JWT_PASSPHRASE;

  const permissions = ['read-document', 'download'];

  const data = {document_id: documentId, permissions};
  const secret = {key: PSPDFServerJWTKey, passphrase: PSPDFServerJWTPassphrase};
  const options = {
    algorithm: 'RS256',
    expiresIn: '30 min'
  };

  return jwt.sign(data, secret, options);
}
