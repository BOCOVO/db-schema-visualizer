import MessageWrapper from "./MessageWrapper";

interface ErrorMessageProps {
  message: string;
}
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <MessageWrapper>
      <p>{message}</p>
    </MessageWrapper>
  );
};

export default ErrorMessage;
