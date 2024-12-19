interface LogoProps {
  icon?: string;
}

const Logo = ({ icon = 'OdontoGuardião' }: LogoProps) => {
  return (
    <div className="logo-container">
      <div className="logo-icon">{icon}</div>
    </div>
  );
};

export default Logo;
