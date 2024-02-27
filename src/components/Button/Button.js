import './Button.scss';

const Button = ({
  buttonText,
  onClick,
  buttonIcon,
  UniqueStyleClass,
  type,
}) => {
  return (
    <>
      <button
        className={`my-button ${UniqueStyleClass}`}
        style={{
          backgroundImage: `url(${buttonIcon})`,
        }}
        type={type}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
};

export default Button;
