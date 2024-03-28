import classes from "./image-picker.module.css"

export default function ImagePicker( props ) {
    const { label, name } = props;

    return (

        <div className={ classes.picker }>
            <label htmlFor={ name }>{ label }</label>
            <div className={ classes.controls }>
                <input type="file" id={ name } accept="image/png" name={ name } />
            </div>
        </div>
    )
}