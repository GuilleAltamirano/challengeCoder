import { useEffect, useState } from "react"
import uploadImage from '../../assets/components/uploadImage.png'

export const InputTitleProductComponent = ({style, setProdTitle, existErr, handleError}) => { 
    const keyValueLetter = 'Title'
    const keyValue = 'title'
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value
        const isString = parseInt(inputValue)

        if (!isNaN(isString)) return handleError({err: 'Type value invalid', key: keyValue}) 
        if (inputValue.length === 0) return handleError({err: `${keyValueLetter} is require`, key: keyValue})
        if (inputValue.length > 25 || inputValue.length < 3) return handleError({err: 'Length min 3 and max 25', key: keyValue})

        setProdTitle((prevData) => ({...prevData, [keyValue]: inputValue}))

        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="text" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} min={3} max={15} required className={existErr.length > 0 ? style.errorActive : ''} />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputDescriptionProductComponent = ({style, setProdDescription, existErr, handleError}) => {
    const keyValueLetter = 'Description'
    const keyValue = 'description'
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value
        const isString = parseInt(inputValue)

        if (!isNaN(isString)) return handleError({err:'Type value invalid', key: keyValue})
        if (inputValue.length === 0) return handleError({err:`${keyValueLetter} is require`, key: keyValue})
        if (inputValue.length > 50 || inputValue.length < 7) return handleError({err:'Length min 7 and max 50', key: keyValue})

        setProdDescription((prevData) => ({...prevData, [keyValue]: inputValue}))
        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="text" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} min={7} max={40} className={existErr.length > 0 ? style.errorActive : ''} required />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputCodeProductComponent = ({style, setProdCode, existErr, handleError}) => {
    const keyValueLetter = 'Code'
    const keyValue = 'code'
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (inputValue.length === 0) return handleError({err: `${keyValueLetter} is require`, key: keyValue})
        if (inputValue.length !== 6) return handleError({err: 'The accepted length is 6', key: keyValue})

        setProdCode((prevData) => ({...prevData, [keyValue]: inputValue}))
        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="string" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} min={6} max={6} className={existErr.length > 0 ? style.errorActive : ''} required />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputStockProductComponent = ({style, setProdStock, existErr, handleError}) => {
    const keyValueLetter = 'Stock'
    const keyValue = 'stock'
    
    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)

        if (isNaN(inputValue)) return handleError({err: 'Type value invalid', key: keyValue})
        if (inputValue.length === 0) return handleError({err: `${keyValueLetter} is require`, key: keyValue})
        if (inputValue === 0 || inputValue < 0) return handleError({err: `${keyValueLetter} accepted is greater than 0`, key: keyValue})
        if (inputValue > 99999999) return handleError({err: `${keyValueLetter} accepted is less than 99999999`, key: keyValue})

        setProdStock((prevData) => ({...prevData, [keyValue]: inputValue}))
        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="number" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} min={1} max={999} className={existErr.length > 0 ? style.errorActive : ''} required />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputCategoryProductComponent = ({style, setProdCategory, existErr, handleError}) => {
    const keyValueLetter = 'Category'
    const keyValue = 'category'
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value
        const isString = parseInt(inputValue)

        if (!isNaN(isString)) return handleError({err: 'Type value invalid', key: keyValue})
        if (inputValue.length === 0) return handleError({err: `${keyValueLetter} is require`, key: keyValue})

        setProdCategory((prevData) => ({...prevData, [keyValue]: inputValue}))
        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="text" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} className={existErr.length > 0 ? style.errorActive : ''} required />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputProviderProductComponent = ({style, setProdProvider, existErr, handleError}) => {
    const keyValueLetter = 'Provider'
    const keyValue = 'provider'
    
    const handleInputChange = (e) => {
        const inputValue = e.target.value
        const isString = parseInt(inputValue)

        if (!isNaN(isString)) return handleError({err: 'Type value invalid', key: keyValue})
        if (inputValue.length === 0) return handleError({err: `${keyValue} is require`, key: keyValue})

        setProdProvider((prevData) => ({...prevData, [keyValue]: inputValue}))
        return handleError({err: false, key: keyValue})
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}:</label>
            <input type="text" id={keyValue} name={keyValue} onChange={handleInputChange} placeholder={`Insert product ${keyValue}`} className={existErr.length > 0 ? style.errorActive : ''} required />
            {existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const InputPricesProductComponent = ({style, setProdPrices, existErr, handleError}) => {
    const [prices, setPrices] = useState({ cost: -1, list_one: -1, list_two: -1, list_three: -1 })
    const keyValueLetter = 'Prices'
    const keyValue = 'prices'

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)
        const typePrice = e.target.id

        if (isNaN(inputValue)) return handleError({err: 'Type value invalid', key: keyValue})
        if (!inputValue) return handleError({err: `${keyValueLetter} ${typePrice} is require`, key: keyValue})
        if (inputValue < 0) return handleError({err: 'Price accepted is greater than 0', key: keyValue})

        setPrices((prevPrices) => ({...prevPrices,[typePrice]: inputValue}))
        
        return handleError({err: false, key: keyValue})
    }

    useEffect(() => {
        if (prices.cost > -1 && prices.list_one > -1 && prices.list_two > -1 && prices.list_three > -1) {
            setProdPrices((prevData) => ({...prevData, [keyValue]: prices}))
        }
    }, [prices, setProdPrices])

    return (
        <>
            <label htmlFor='cost'>{keyValueLetter}</label>
            <ul className={style.container_prices}>
                <li>
                    <input type="number" id='cost' name={`${keyValue}[]`} placeholder='Insert cost' min={0} required onChange={handleInputChange} className={existErr && existErr.length > 0 ? style.errorActive : ''} />
                    {existErr && existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_one' name={`${keyValue}[]`} placeholder='Insert list 1' min={0} required onChange={handleInputChange} className={existErr && existErr.length > 0 ? style.errorActive : ''} />
                    {existErr && existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_two' name={`${keyValue}[]`} placeholder='Insert list 2' min={0} required onChange={handleInputChange} className={existErr && existErr.length > 0 ? style.errorActive : ''} />
                    {existErr && existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_three' name={`${keyValue}[]`} placeholder='Insert list 3' min={0} required onChange={handleInputChange} className={existErr && existErr.length > 0 ? style.errorActive : ''} />
                    {existErr && existErr.length > 0 ? <span className={style.styleError}>{existErr}</span> : ''}
                </li>
            </ul>
        </>
    )
}

export const InputPromotionProductComponent = ({style, setProdPromotion, prices, existErr, handleError}) => {
    const [promo, setPromo] = useState(false)
    const keyValueLetter = 'Promotion'
    const keyValue = 'promotion'
    
    const isPromotion = (e) => setPromo(e.target.checked)

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)

        if (isNaN(inputValue)) return handleError({err: 'Type value invalid', key: keyValue})
        if (inputValue < 0) return handleError({err: 'Type value invalid', key: keyValue})
        if (inputValue.length === 0) return handleError({err: 'Price promotion value is require', key: keyValue})

        handleError({err: false, key: keyValue})
        setProdPromotion((prevData) => ({...prevData, [keyValue]: keyValueLetter}))
        prices.promotion = inputValue

        setProdPromotion((prevData) => ({...prevData, prices}))
        return
    }

    return(
        <>
            <label htmlFor={keyValue}>{keyValueLetter}<input type="checkbox" id={keyValue} name={keyValue} onChange={isPromotion} checked={promo}/></label>
            {promo ? <input type="number" onChange={handleInputChange} id='promotionPrice' name='promotionPrice' placeholder='Insert promotion price' min={0} className={existErr.length > 0 ? style.errorActive : ''} required /> : ''}
            {existErr && existErr.length > 0  && promo ? <span className={style.styleError}>{existErr}</span> : ''}
        </>
    )
}

export const UploadsImagesComponent = ({style, setImages, images, existErr, handleError}) => {
    const [photos, setPhotos] = useState(false)
    const keyValueLetter = 'Thumbnails'
    const keyValue = 'thumbnails'

    const withThumbnails = (e) => setPhotos(e.target.checked)

    const uploadsImages = (e) => {
        handleError({err: false, key: keyValue})

        const input = document.getElementById(`images`)
        input.click()
    }

    const handleFileChange = async (e) => {
        const formData = new FormData()
        const selectedFiles = Array.from(e.target.files);
        const codeProduct = document.getElementById('code').value;

        if (selectedFiles.length >= 6) return handleError({err: 'Maximum images allowed is 5', key: keyValue});
        if (codeProduct.length === 0) return handleError({err: 'Please enter a code', key: keyValue});
        
        selectedFiles.forEach((file, index) => {
            const newName = `${codeProduct}_${index}`
            formData.append(`${keyValue}`, new File([file], newName, { type: file.type }))
            return
        })
        

        const response = await fetch('/api/products/uploadThumbnails', {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(data => {
            if (data.status !== 'success' && images.length === 0) return handleError({err: data.error, key: keyValue})
            setImages((prevData) => ({...prevData, [keyValue]: data.payload}))
            return
        })
    }

    return (
        <>
            <label htmlFor={keyValue}>Images<input type="checkbox" id={keyValue} name={keyValue} onChange={withThumbnails} checked={photos}/></label>
            {!photos ? '' :
                <>
                    <div onClick={uploadsImages} className={existErr.length > 0 ? style.errorActive : ''}>
                        {images.length >= 4 ? '' : <img src={uploadImage} alt="Image upload"/>}
                        {!images || images.length === 0 ? '' : 
                            images.map((image, index) => {
                                return <img key={index} src={image} alt="Product image" className={style.withThumbnails} />
                            })
                        }
                    </div>
                    {existErr ? <span className={style.styleError}>{existErr}</span> : ''}
                    <input accept="image/png, image/jpeg" type="file" id='images' name='images' multiple hidden onChange={handleFileChange}/>
                </>
            }
        </>
    )
}