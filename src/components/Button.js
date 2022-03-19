import PropTypes from 'prop-types';


const Button = ({text, color, onClick}) => {
  return (
    <button onClick={onClick} className="btn" style={{
        backgroundColor: color
      }}>{text}
    </button>
  );
}

Button.defaultProps = {
  color: 'green',
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}


export default Button
