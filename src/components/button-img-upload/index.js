import React from 'react';
import styles from './index.module.css';

const ButtonImageUpload = ({title, targetImg, that}) => {

    const openWidget = (e, targetImg) => {
        e.preventDefault();
        let widget = window.cloudinary.createUploadWidget(
            {
                cloudName: process.env.REACT_APP_CLOUDINARY_CLOUDNAME,
                uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOADPRESET
            },
            (error, result) => {
                if (result.event === 'success') {
                    const newImgUrl = result.info.url;
                    if (targetImg === 'coverImage') {
                        that.setState({
                            coverImage: newImgUrl,
                        })
                    } else if (targetImg === 'image1') {
                        that.setState({
                            image1: newImgUrl,
                        })
                    } else if (targetImg === 'image2') {
                        that.setState({
                            image2: newImgUrl,
                        })
                    } else if (targetImg === 'image3') {
                        that.setState({
                            image3: newImgUrl,
                        })
                    }
                }
            },
        );
        widget.open()
    };

    return (
        <div className={styles.photo__upload}>
            <img src={that.state[`${targetImg}`] || "/placeholder-img.jpg"} alt="thumbnail" />
            <button className={styles.upload__btn} onClick={(e) => openWidget(e, targetImg)}>{title}</button>
        </div>
    )
}

export default ButtonImageUpload;