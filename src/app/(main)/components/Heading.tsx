interface HeadingProps {
  headingText: string;
  paraText: string;
}

const Heading = ({ headingText, paraText }: HeadingProps) => {
  return (
    <div>
      <h1 className=" text-2xl md:text-3xl font-bold ">{headingText} </h1>
      <p className="mt-1">{paraText}</p>
    </div>
  );
};

export default Heading;
