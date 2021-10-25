export type UploadDocumentResponse = {
  data: {
    createdAt: string;
    document_id: string;
    errors: {reason: string}[];
    password_protected: boolean;
    sourcePdfSha256: string;
    title: string;
  };
};
