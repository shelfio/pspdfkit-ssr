export interface UploadDocumentResponse {
  data: {
    createdAt: string;
    document_id: string;
    errors: any[];
    password_protected: boolean;
    sourcePdfSha256: string;
    title: string;
  };
}
