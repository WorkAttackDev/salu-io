import { DetailedHTMLProps, HTMLAttributes } from "react";

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {};

const MainLayout: React.FC<Props> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <main className={`p-8 md:p-16 ${className}`} {...props}>
      {children}
    </main>
  );
};

export default MainLayout;
