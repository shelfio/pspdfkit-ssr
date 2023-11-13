import jwt from 'jsonwebtoken';
import {getJWTForDocumentPreview} from './signature';

beforeAll(() => {
  process.env.PSPDFKIT_SERVER_JWT_KEY = `-----BEGIN RSA PRIVATE KEY-----
    MIIEpAIBAAKCAQEAyrR6lPqAE19m3DyaS4S3HTJPoSH4G58XdVBV0RbTXIyyBwbV
    efgpf+JIGZyXr7fOvELPlAtCTHwcHiXOW3vYB3945YJKKm/xm2pQvOmuwyoeBuRp
    fB7O/+MdODHYIKguZLmbmnW9NB5tAQGZ5DAQ42ye3y+NL68SIophxXGBp3X6xSHh
    xrwzFC+N1vuIx+ez045azSZq7FUAqHONvIaD33p92+Bw3zhgezgTpDxbKE2oDXyb
    ecwjLL5ytZhyXMTfndoyjLGLxrWHki2Fuwv8LFMpFv0qpe9Ur/52QjEzGZuhdsso
    TP2HdOxN40kD7UQejEwNHREBI4ufrIOLGwLmUQIDAQABAoIBAAhJo79mlIj2PBbi
    FW7kALadYXsVj/bVJNjjjXash7y/deHqqhzABDZZ0pfVerAxBC9XTfRgF3hYFLA4
    3HyKDjWURSWhE5YzmH3BtYZbyYzqMmsWuKdd/RmiOAYdp5gCOE9e9Vk12iQA4HUL
    kzasrmwV+1Llt1CNSGEIJmIzt1jY29A1LFhak2WKLqQMC2hLi+jXJUbrI+v5ZODq
    1kY4zhQH9sNWl+j6TGrPpHV1bS3r4RylsO3viwyNl7jJFr+UD6jvLtb+xeEqXEj3
    PaMfY6xVH6wl6A4zZAyDVUqq7NggTZr9KKSXnc/WcbHfln44kUoVubQIJdXdZ/Zg
    MgVueC8CgYEA+fHIGml5IoNlSTUL4cxxYy8nuaLzTOUZrE4YOlwGJHWqrw6WqUUK
    AK5NDo6oC7KaLk9xV1uXEc46Y3v9h7kBEDhe8jITz8h9Nn0qXprqzM1Vp0OB3/Jz
    /Dzq2e/vhus55trzUrYhGfFEgSbwoXzil0XUQW1indidD3ZKZ7oFbCcCgYEAz520
    xpjvNEldw9KMY+2pN+h30MkXSFd0knjcek3Q1i96/N8GTfkIW/fnyyEmkbs/rXmP
    fIW6TNVzK5yyzGKf6Xq01gAtMy9ysk+TdNxLJY6WtJRq4yARgshz+0nHz1XHK6cX
    c5a9oA83G2H8JzjqAbILeSmnC0BNySB5BES2DMcCgYEAwJDjFlZEma6aDnjsGp8k
    jMH73S4KPSgVS4cva2cS5GwzgIPA19D1D+k6PQjzt293Ek7qh99s2K8GlTcl8bc7
    dn+3xumGEgPpVF3CkvjQBdH9N8zu9tcZPTDBz/7nkA8SoSX3abYgcphLqyWRJxnM
    ibem/HGGFQ6akxsT4C6VlukCgYAW3BZ7h3tPFoTsetJabmCjd0U6B+o4XOjI9+XO
    0aKc8r1n+maHT1RMTA+JnizQ/v0T7L6Px2mr7BSySJ6nQnS5EHm41mwjpqXKXFiw
    FVFw4TJWz8C1IWLMM6YRlR4bBibX953tbDuU1BgNO8y3xNx/M0twG9X4tyvZaWnp
    vmcNIQKBgQDN41Gcf3Og19HPhHO+LPZIjMVDBGOgCR8kyQCg7Fd0quWGhmsnesGI
    013nbxfTYS5QfniHpPg7blP1wb39fzse5NpYcAVCC1GX7CNO1KjYnqW3D+yvhyp1
    sdRDrvuqbqNnGLb6AaGsTY3IvGr4hAiUDQRWKiauybCztAOoQxmcfg==
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
