import imageCompression from 'browser-image-compression';

export interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
}

const defaultOptions: CompressionOptions = {
  maxSizeMB: 2,
  maxWidthOrHeight: 1024,
  useWebWorker: true
};

export async function compressImage(
  file: File,
  options: CompressionOptions = {}
): Promise<File> {
  const compressionOptions = {
    ...defaultOptions,
    ...options
  };

  try {
    const compressedFile = await imageCompression(file, compressionOptions);
    
    // Verifica se o arquivo comprimido é maior que o original
    if (compressedFile.size > file.size) {
      console.log('Arquivo comprimido maior que o original, mantendo original');
      return file;
    }

    // Convertendo o Blob para File com o nome e tipo corretos
    const newFile = new File(
      [compressedFile], 
      file.name, 
      { 
        type: file.type,
        lastModified: new Date().getTime()
      }
    );

    return newFile;
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    throw error;
  }
}
