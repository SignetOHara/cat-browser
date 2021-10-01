import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

interface Props {
  error: Error;
  setError: React.Dispatch<React.SetStateAction<Error | undefined>>;
}

export const Error = ({ error, setError }: Props) => {
  const [show, setShow] = useState(false);

  if (error) {
    setShow(true);
  }

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>
          Apologies but we could not load new cats for you at this time! Miau!!
        </Alert.Heading>
        <p>Please try refreshing.</p>
      </Alert>
    );
  }

  return null;
};
