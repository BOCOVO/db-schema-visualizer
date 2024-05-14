import type { PropsWithChildren } from "react";

const MessageWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {children}
    </div>
  );
};

export default MessageWrapper;
