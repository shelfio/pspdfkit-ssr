import jwt from 'jsonwebtoken';
import {getJWTForDocumentPreview} from './signature';

beforeAll(() => {
  process.env.PSPDFKIT_SERVER_JWT_KEY = `-----BEGIN RSA PRIVATE KEY-----
      MIIBPAIBAAJBALd41vG5rMzG26hhVxE65kzWC+bYQ94tOxsSxIQZMOc1GY8ubuqu
      2iku5/5isaFfG44e+VAe+YIdVeQY7cUkzaUCAwEAAQJAHfi9lEtysRkjNQSBxqzK
      hm7JDvLxU1AsQak1OGctF/fLXzkWiMLsBZ3yLHdPSvl/izbKyGrADv7wrQJrPPhg
      gQIhAPQrw5Uh7pQ4RMvkDJff7aHWwWTUuqgsiS/r1/7KHl8VAiEAwsxH2YA3MR/5
      Rl5/VJJp6Cv/2IGSgQVlSDZyL5vcBFECIQDc3eGTOxhmtud0T5scnpCD/pD9tngJ
      vA90a6/8Z7RFaQIhAIBOjVZUoXvQ+fKoIYKFzsKgZp1BgDkzCs0kE/IQ92ShAiEA
      7f4XIbGgIFaSJRpBfa168aeP162EV5oOW+Gyv2IIyK8= 
-----END RSA PRIVATE KEY-----`;
  process.env.PSPDFKIT_SERVER_JWT_PASSPHRASE = 'some-passphrase';
});

it('should return correct jwt signature', () => {
  const jwtForPreview = getJWTForDocumentPreview('some-doc-id');

  expect(jwt.decode(jwtForPreview)).toEqual({
    document_id: 'some-doc-id',
    permissions: ['read-document', 'download'],
    exp: expect.any(Number),
    iat: expect.any(Number),
  });
});
