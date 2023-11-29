'use client';

import { useState, useCallback } from 'react';

import { ref, uploadBytesResumable, getDownloadURL, type StorageError } from 'firebase/storage';

import { storage } from '@services/firebase';

import { showToast } from '@utils/toast';

const useImageUpload = () => {
  const [imageURL, setImageURL] = useState<string>('');
  const [error, setError] = useState<StorageError>();
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUpload = useCallback(async (file: File, folderName: string, fileName: string) => {
    setIsLoading(true);

    return new Promise<string>((resolve, reject) => {
      const storageRef = ref(storage, `${folderName}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        ({ bytesTransferred, totalBytes }) => {
          const progress = (bytesTransferred / totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          setError(error);
          reject(error);
        },
        async () => {
          try {
            const imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            setImageURL(imageURL);
            resolve(imageURL);
            return imageURL;
          } catch {
            const defaultErrorMessage = 'Não foi possível fazer o envio da imagem. Tente novamente mais tarde!';
            const errorMessage = error?.message || defaultErrorMessage;
            showToast(errorMessage, false);
            reject(error);
          }
        }
      );
    })
      .finally(() => {
        setProgress(0);
        setIsLoading(false);
      });
  }, [error]);

  return {
    handleUpload,
    imageURL,
    error,
    progress,
    isLoading
  };
};

export default useImageUpload;