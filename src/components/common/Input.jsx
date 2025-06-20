export default function Input({
  id,
  label,
  type,
  value,
  error,
  icon,
  handleChange
}) {
  return (
    <>
      <div className='input-container'>
        <input
          className={'input'}
          id={id}
          name={id}
          aria-placeholder={label}
          placeholder={label}
          type={type}
          value={value}
          onChange={handleChange}
          autoComplete={type === 'text' ? 'off' : undefined}
        />
        {icon && <img className='icon' src={icon} alt='Search' />}
      </div>
      <div className='error-container'>
        {error && <p className='error'>{error}</p>}
      </div>
    </>
  );
}
