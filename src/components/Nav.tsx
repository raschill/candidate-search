import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav-link nav-item active' : 'nav-link nav-item'}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/SavedCandidates"
            className={({ isActive }) => isActive ? 'nav-link nav-item active' : 'nav-link nav-item'}
          >
            Saved Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
