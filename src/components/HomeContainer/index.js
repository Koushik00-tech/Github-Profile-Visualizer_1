import UsernameContext from '../../context/UsernameContext'
import Home from '../Home'

const HomeContainer = () => (
  <UsernameContext.Consumer>
    {value => {
      const {username} = value
      return <Home username={username} />
    }}
  </UsernameContext.Consumer>
)
export default HomeContainer
