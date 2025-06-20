import { Link } from 'react-router-dom';
import KeyIcon from '../../assets/key.webp';

export default function Header() {
  return (
    <>
      <div className='border' />
      <div className='border-detail top-left'>
        <svg viewBox='0 0 12 12'>
          <path
            d='M 0 0 L 0 12 C 0 5.373 5.373 0 12 0 Z'
            fill='rgb(255, 255, 255)'>
          </path>
        </svg>
      </div>
      <div className='border-detail bottom-left'>
        <svg viewBox='0 0 12 12'>
          <path
            d='M 0 0 L 0 12 C 0 5.373 5.373 0 12 0 Z'
            fill='rgb(255, 255, 255)' />
        </svg>
      </div>
      <div className='border-detail bottom-right'>
        <svg viewBox='0 0 12 12'>
          <path
            d='M 0 0 L 0 12 C 0 5.373 5.373 0 12 0 Z'
            fill='rgb(255, 255, 255)' />
        </svg>
      </div >
      <header className='header'>
        <nav className='header-side'>
          <Link to='/' className='logo-container'>
            <div className='logo-image-container'>
              <img
                src={KeyIcon}
                alt='Logo'
                className='logo'
              />
            </div>
            <div className='logo-text-container'>
              <p className='logo-text'>Inventario de vehículos</p>
            </div>
          </Link>
          <div className='detail bottom'>
            <svg viewBox='0 0 18 18'>
              <path
                d='M 0 0 L 0 18 C 0 8.059 8.059 0 18 0 Z'
                fill='rgb(255, 255, 255)'>
              </path>
            </svg>
          </div>
          <div className='detail right'>
            <svg viewBox='0 0 18 18'>
              <path
                d='M 0 0 L 0 18 C 0 8.059 8.059 0 18 0 Z'
                fill='rgb(255, 255, 255)'>
              </path>
            </svg>
          </div>
        </nav>
      </header>
    </>
  )
}