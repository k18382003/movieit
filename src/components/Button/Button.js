import './Button.scss';

const Button = ({ buttonText, onClick, buttonIcon, UniqueStyleClass }) => {
  return (
    <>
      <button
        className={`my-button ${UniqueStyleClass}`}
        style={{
          backgroundImage: `url(${buttonIcon})`,
        }}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
};

export default Button;
