import { Link } from 'react-router-dom'
import Logo from '@/assets/logo.png'

const Header = () => {
  return (
    <div className='mx-auto'>
        <Link to="/">
            <img className='max-w-[400px] cursor-pointer' src={Logo} alt="githubusersearch-logo" />
        </Link>
    </div>
  )
}

export default Header
