import style from "./input.module.css"
const Input = ({label,name,formik,type="text"}) => {
    return ( 
        <div className={style.formControl}>
          <label htmlFor={name}>{label}</label>
          {formik.errors[name] && formik.touched[name] && (
            <div className={style.error}>{formik.errors[name]}</div>
          )}
          <input
            type={type}
            id={name}
            name={name}
            {...formik.getFieldProps(name)}
          />
        </div>
     );
}
 
export default Input;