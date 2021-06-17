import {Secret, SignOptions, sign} from 'jsonwebtoken';

export function getJWTForDocumentPreview(documentId: string): string {
  const PSPDFServerJWTKey = process.env.PSPDFKIT_SERVER_JWT_KEY.replace(/\\n/g, '\n');
  const PSPDFServerJWTPassphrase = process.env.PSPDFKIT_SERVER_JWT_PASSPHRASE;

  const permissions = ['read-document', 'download'];

  const data = {document_id: documentId, permissions};
  const secret: Secret = {key: PSPDFServerJWTKey, passphrase: PSPDFServerJWTPassphrase};
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn: '30 min',
  };

  return sign(data, secret, options);
}
