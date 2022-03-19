
import PropTypes from 'prop-types';
import Button from './Button.js';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onAdd, showAddTask }) => {
  const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      { location.pathname === '/' &&
        <Button text={ showAddTask? 'Close':'Add' }
                color={ showAddTask? 'red':'green' }
                onClick={onAdd} />
      }
    </header>
  );
}



// setting the default value of the component properties
Header.defaultProps = {
  title : 'Task Tracker example',
  myName : 'Ahmed',
  myFriend: 'Osama',
}

// setting the data types of the component property
// it helps to catch error before it happens
Header.propTypes = {
  title: PropTypes.string,
  myName: PropTypes.string,
  myFriend: PropTypes.string,
}

// setting stylinhg in a variable
const myNameStyle = {
     color: 'red',
     backgroundColor: '#ddd',
     padding:'20px'
   }


export default Header
