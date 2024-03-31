'use client'
import React, { useRef, useState } from 'react'
import classes from "./image-picker.module.css"
import Image from 'next/image';

export default function ImagePicker( props ) {
    const { label, name } = props;
    const [ pickedImage, setPickedImage ] = useState( null )
    const imageInputRef = useRef()


    const handlePickClick = () => {
        imageInputRef.current.click();
    }

    const handleImageChange = ( event ) => {
        const file = event.target?.files?.[ 0 ]
        if ( !file ) {
            setPickedImage( null )
            return;
        }
        const fileReader = new FileReader();
        //when read as data url is done this will be called
        fileReader.onload = () => {
            setPickedImage( fileReader?.result )

        }
        fileReader.readAsDataURL( file )
    }
    return (

        <div className={ classes.picker }>
            <label htmlFor={ name }>{ label }</label>
            <div className={ classes.controls }>
                <div className={ classes.preview }>
                    { !pickedImage && "No Image Picked Yet" }
                    { pickedImage &&
                        <Image
                            src={ pickedImage }
                            alt="The image selected"
                            fill //because i don't know the dimension of that image in advance

                        /> }

                </div>
                <input
                    required //to ensure that the form will not be submitted without the image
                    ref={ imageInputRef }
                    className={ classes.input }
                    type="file"
                    id={ name }
                    accept="image/png"
                    name={ name }
                    onChange={ handleImageChange }
                />
                <button type="button" className={ classes.button } onClick={ handlePickClick } >Pick an image</button>
            </div>
        </div>
    )
}