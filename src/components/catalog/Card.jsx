import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import editIcon from '../../assets/edit.webp';
import trashIcon from '../../assets/trash.webp';

export default function Card({
  id, brand, model, color, price, year, purchaseDate, image, onDelete
}) {
  return (
    <motion.div
      className='card-container'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className='card'>
        <div className='image-container'>
          <img
            className='card-image'
            src={image}
            alt={`${brand} ${model}`}
          />
        </div>
        <div className='name-container'>
          <h3 className='name'>{brand} {model}</h3>
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
        </div>
        <div className='details'>
          <p className='detail-item price'>{price} USD</p>
          <div className='details-wrapper'>
            <p className='detail-item'>{color} - {year}</p>
            <p className='detail-item'>{purchaseDate}</p>
          </div>
          <div className='options'>
            <Link className='btn' to={`/edit/${id}`}>
              <img src={editIcon} alt='Edit' />
            </Link>
            <button className='btn' type='button' onClick={onDelete}>
              <img src={trashIcon} alt='Delete' />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
