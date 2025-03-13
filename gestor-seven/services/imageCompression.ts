// Usando dynamic import para evitar problemas de SSR
let imageCompression: any = null;

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
  // Carrega o módulo apenas no cliente
  if (typeof window !== 'undefined' && !imageCompression) {
    try {
      const module = await import('browser-image-compression');
      imageCompression = module.default;
    } catch (error) {
      console.error('Erro ao carregar o módulo de compressão de imagem:', error);
      return file; // Retorna o arquivo original em caso de erro
    }
  }

  // Se não conseguiu carregar o módulo ou estamos no servidor, retorna o arquivo original
  if (!imageCompression) {
    return file;
  }

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
    
    console.log('Compressão de imagem concluída:');
    console.log(`Tamanho original: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Tamanho comprimido: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);
    
    return compressedFile;
  } catch (error) {
    console.error('Erro ao comprimir imagem:', error);
    return file; // Retorna o arquivo original em caso de erro
  }
}
