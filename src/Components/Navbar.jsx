import { useNavigate } from 'react-router-dom';
import '../style/navbar.css';
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbarContatiner'>
      <div className='navbar-section'>
        <h1>Logo</h1>
        <div className='navbar-item'>
          <li onClick={() => navigate('/')}>list</li>
          <li onClick={() => navigate('/addproduct')}>Product add</li>
        </div>
        <div>profile</div>
      </div>
    </div>
  );
};

export default Navbar;
