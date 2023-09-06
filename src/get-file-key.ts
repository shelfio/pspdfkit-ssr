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
];

export function getKeyForPSPDFKIT(gemFileKey: string, pdfPreviewKey: string): string {
  if (!gemFileKey) {
    return pdfPreviewKey;
  }

  const isSupportedOriginalFileExtension = SUPPORTED_FILES_EXTENSIONS_FOR_PSPDFKIT.some(ext =>
    gemFileKey?.toLowerCase()?.endsWith(ext)
  );

  if (!isSupportedOriginalFileExtension) {
    return pdfPreviewKey;
  }

  return gemFileKey;
}
