import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  state = {activeStatus: false}

  onClickMenuButton = () => {
    this.setState(prevState => ({activeStatus: !prevState.activeStatus}))
  }

  render() {
    const {activeStatus} = this.state
    const currentPath = window.location.pathname

    return (
      <div className="container">
        <div data-testid="header" className="repo-item">
          <nav className="header-container">
            <Link to="/" className="heading-nav-link">
              <h1 className="header-heading">GitHub Profile Visualizer</h1>
            </Link>

            <button
              className="menu-button"
              type="button"
              onClick={this.onClickMenuButton}
              aria-label="Toggle navigation menu"
            >
              <img
                src="https://res.cloudinary.com/ddsn9feta/image/upload/v1718691523/menu_l33xs7.png"
                alt="menu"
                className="menuSize"
              />
            </button>

            <ul className={`items-nav ${activeStatus ? 'active' : ''}`}>
              <li>
                <Link
                  to="/"
                  className={
                    currentPath === '/'
                      ? 'active-link item-nav-link'
                      : 'item-nav-link'
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/repositories"
                  className={
                    currentPath === '/repositories'
                      ? 'active-link item-nav-link'
                      : 'item-nav-link'
                  }
                >
                  Repositories
                </Link>
              </li>
              <li>
                <Link
                  to="/analysis"
                  className={
                    currentPath === '/analysis'
                      ? 'active-link item-nav-link'
                      : 'item-nav-link'
                  }
                >
                  Analysis
                </Link>
              </li>
            </ul>
          </nav>

          {activeStatus && (
            <nav>
              <ul className="nav-items-container active">
                <li>
                  <Link
                    to="/"
                    className={
                      currentPath === '/'
                        ? 'active-link item-link'
                        : 'item-link'
                    }
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/repositories"
                    className={
                      currentPath === '/repositories'
                        ? 'active-link item-link'
                        : 'item-link'
                    }
                  >
                    Repositories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/analysis"
                    className={
                      currentPath === '/analysis'
                        ? 'active-link item-link'
                        : 'item-link'
                    }
                  >
                    Analysis
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    )
  }
}

export default Header
