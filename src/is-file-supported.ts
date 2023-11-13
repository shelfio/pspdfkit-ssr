//see https://pspdfkit.com/guides/web/viewer/office-documents/
const SUPPORTED_FILES_EXTENSIONS_FOR_PSPDFKIT = [
  'docx',
  'doc',
  'dotx',
  'docm',
  'xlsx',
  'xls',
  'xlsm',
  'pptx',
  'ppt',
  'pptm',
  'pdf',
];

export function isFileSupportedForOfficePreview(fileKey: string): boolean {
  return SUPPORTED_FILES_EXTENSIONS_FOR_PSPDFKIT.some(ext => fileKey?.toLowerCase()?.endsWith(ext));
}
