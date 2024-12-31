import { ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <div className="bg-red-600 p-2 text-center rounded-lg">
      <p className="text-white font-bold text-xl "> {children}</p>
    </div>
  );
}

export default ErrorMessage;
