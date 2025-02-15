import type { FC } from 'react';

import { AlertCircle } from 'react-feather';

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
  return (
    <span className='text-danger-500 text-xs flex items-center gap-2 ml-2 mt-1'>
      <AlertCircle className='w-4' /> {errorMessage}
    </span>
  );
};

export default ErrorMessage;