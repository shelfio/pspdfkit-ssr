import type {Secret, SignOptions} from 'jsonwebtoken';
import {sign} from 'jsonwebtoken';
import type {StringValue} from 'ms';

export function getJWTForDocumentPreview(
  documentId: string,
  expiresIn: StringValue = '30 min'
): string {
  const PSPDFServerJWTKeyEnv = process.env.PSPDFKIT_SERVER_JWT_KEY as string;
  const PSPDFServerJWTKey = PSPDFServerJWTKeyEnv.replace(/\\n/g, '\n');

  const PSPDFServerJWTPassphrase = process.env.PSPDFKIT_SERVER_JWT_PASSPHRASE as string;

  const permissions = ['read-document', 'download'];

  const data = {document_id: documentId, permissions};
  const secret: Secret = {key: PSPDFServerJWTKey, passphrase: PSPDFServerJWTPassphrase};
  const options: SignOptions = {
    algorithm: 'RS256',
    expiresIn,
  };

  return sign(data, secret, options);
}
