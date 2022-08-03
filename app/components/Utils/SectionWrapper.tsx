import { FC } from "react";

const SectionWrapper: FC<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={className}>
      <div className="max-w-7xl mx-auto px-0 md:px-16">{children}</div>
    </div>
  );
};

export default SectionWrapper;
