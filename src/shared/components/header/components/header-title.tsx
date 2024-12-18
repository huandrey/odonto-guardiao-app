interface TitleProps {
  children: React.ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h1 className="header-title">{children}</h1>;
};

export default Title;
