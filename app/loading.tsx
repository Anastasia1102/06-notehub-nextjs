import css from './loading.module.css'

const Loader = () => {
    return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p className={css.text}>Loading, please wait...</p>
    </div>
  );
}

export default Loader;