export default function CardLoading() {
  return (
    <div className='card-container'>
      <div className="card animation-loading">
        <div className='name-container'>
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
      </div>
    </div>
  );
}