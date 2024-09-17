import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  action?: () => void;
};

export const CustomButton = ({ children, action }: Props) => {
  return <button onClick={action}>{children}</button>;
};

