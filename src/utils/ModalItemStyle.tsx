import { cn } from "../lib/utils";

const ModalItemStyle = ({
  title,
  value,
  className,
}: {
  title: string;
  value: string;
  className?: string;
}) => {
  return (
    <h2
      className={cn(
        "flex items-center justify-between text-[#000]  border-b border-[#EBCD6E] my-4",
        className
      )}
    >
      <p> {title} :</p> <p>{value}</p>
    </h2>
  );
};

export default ModalItemStyle;
