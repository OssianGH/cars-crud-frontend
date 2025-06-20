export default function Input({
  id,
  label,
  type,
  handleChange,
  error,
  value,
  icon
}) {
  return (
    <>
      <div className='input-container'>
        <input
          className={'input'}
          id={id}
          name={id}
          type={type}
          onChange={handleChange}
          autoComplete={type === 'text' ? 'off' : undefined}
          value={value}
          aria-placeholder={label}
          placeholder={label}
        />
        {icon && <img className='icon' src={icon} alt='Search' />}
      </div>
      <div className='error-container'>
        {error && <p className='error'>{error}</p>}
      </div>
    </>
  );
}
