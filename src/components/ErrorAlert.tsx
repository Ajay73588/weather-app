
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <Alert variant="destructive" className="mb-4 max-w-md bg-red-50 border-red-200 animate-fade-in">
      <AlertCircle className="h-5 w-5 text-red-500" />
      <AlertTitle className="font-semibold text-red-600">Error</AlertTitle>
      <AlertDescription className="text-red-700">{message}</AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
