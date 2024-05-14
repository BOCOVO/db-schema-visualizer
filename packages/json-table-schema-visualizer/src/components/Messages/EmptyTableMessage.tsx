import MessageWrapper from "./MessageWrapper";

const EmptyTableMessage = () => {
  return (
    <MessageWrapper>
      <p className="text-center">No table found</p>
    </MessageWrapper>
  );
};

export default EmptyTableMessage;
