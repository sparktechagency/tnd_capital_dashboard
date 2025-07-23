const ModalItemStyle = ({ title, value }: { title: string; value: string }) => {
  return (
    <h2 className="flex items-center justify-between text-[#000]  border-b border-[#EBCD6E] my-4">
      <p> {title} :</p> <p>{value}</p>
    </h2>
  );
};

export default ModalItemStyle;
