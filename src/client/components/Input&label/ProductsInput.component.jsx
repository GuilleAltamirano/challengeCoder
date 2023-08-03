import { useEffect, useState } from "react"
import uploadImage from '../../assets/components/uploadImage.png'

export const InputTitleProductComponent = ({style, setProdTitle}) => {
    const [titleProductError, setTitleProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (typeof inputValue !== 'string') return setTitleProductError('Type value invalid')
        if (inputValue.length === 0) return setTitleProductError('Title is require')
        if (inputValue.length > 21 || inputValue.length < 3) return setTitleProductError('Length min 3 and max 21')

        setProdTitle(inputValue)
        return setTitleProductError(false)
    }

    return(
        <>
            <label htmlFor="title">Title:</label>
            <input type="text" id='title' name='title' onChange={handleInputChange} placeholder='Insert product title' min={3} max={15} required className={titleProductError.length > 0 ? style.errorActive : ''} />
            {titleProductError.length > 0 ? <span className={style.styleError}>{titleProductError}</span> : ''}
        </>
    )
}

export const InputDescriptionProductComponent = ({style, setProdDescription}) => {
    const [descriptionProductError, setDescriptionProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (typeof inputValue !== 'string') return setDescriptionProductError('Type value invalid')
        if (inputValue.length === 0) return setDescriptionProductError('Description is require')
        if (inputValue.length > 50 || inputValue.length < 7) return setDescriptionProductError('Length min 7 and max 40')

        setProdDescription(inputValue)
        return setDescriptionProductError(false)
    }

    return(
        <>
            <label htmlFor="description">Description:</label>
            <input type="text" id='description' name='description' onChange={handleInputChange} placeholder='Insert product description' min={7} max={40} className={descriptionProductError.length > 0 ? style.errorActive : ''} required />
            {descriptionProductError.length > 0 ? <span className={style.styleError}>{descriptionProductError}</span> : ''}
        </>
    )
}

export const InputCodeProductComponent = ({style, setProdCode}) => {
    const [codeProductError, setCodeProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (typeof inputValue !== 'string') return setCodeProductError('Type value invalid')
        if (inputValue.length === 0) return setCodeProductError('Code is require')
        if (inputValue.length !== 6) return setCodeProductError('The accepted length is 6')

        setProdCode(inputValue)
        return setCodeProductError(false)
    }

    return(
        <>
            <label htmlFor="code">Code:</label>
            <input type="string" id='code' name='code' onChange={handleInputChange} placeholder='Insert product code' min={6} max={6} className={codeProductError.length > 0 ? style.errorActive : ''} required />
            {codeProductError.length > 0 ? <span className={style.styleError}>{codeProductError}</span> : ''}
        </>
    )
}

export const InputStockProductComponent = ({style, setProdStock}) => {
    const [stockProductError, setStockProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)

        if (isNaN(inputValue)) return setStockProductError('Type value invalid')
        if (inputValue.length === 0) return setStockProductError('Stock is require')
        if (inputValue === 0) return setStockProductError('Stock accepted is greater than 0')
        if (inputValue > 99999999) return setStockProductError('Stock accepted is less than 99999999')

        setProdStock(inputValue)
        return setStockProductError(false)
    }

    return(
        <>
            <label htmlFor="stock">Stock:</label>
            <input type="number" id='stock' name='stock' onChange={handleInputChange} placeholder='Insert product stock' min={1} max={999} className={stockProductError.length > 0 ? style.errorActive : ''} required />
            {stockProductError.length > 0 ? <span className={style.styleError}>{stockProductError}</span> : ''}
        </>
    )
}

export const InputCategoryProductComponent = ({style, setProdCategory}) => {
    const [categoryProductError, setCategoryProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (typeof inputValue !== 'string') return setCategoryProductError('Type value invalid')
        if (inputValue.length === 0) return setCategoryProductError('Category is require')

        setProdCategory(inputValue)
        return setCategoryProductError(false)
    }

    return(
        <>
            <label htmlFor="category">Category:</label>
            <input type="text" id='category' name='category' onChange={handleInputChange} placeholder='Insert product category' className={categoryProductError.length > 0 ? style.errorActive : ''} required />
            {categoryProductError.length > 0 ? <span className={style.styleError}>{categoryProductError}</span> : ''}
        </>
    )
}

export const InputProviderProductComponent = ({style, setProdProvider}) => {
    const [providerProductError, setProviderProductError] = useState(false)

    const handleInputChange = (e) => {
        const inputValue = e.target.value

        if (typeof inputValue !== 'string') return setProviderProductError('Type value invalid')
        if (inputValue.length === 0) return setProviderProductError('Description is require')

        setProdProvider(inputValue)
        return setProviderProductError(false)
    }

    return(
        <>
            <label htmlFor="provider">Provider:</label>
            <input type="text" id='provider' name='provider' onChange={handleInputChange} placeholder='Insert product provider' className={providerProductError.length > 0 ? style.errorActive : ''} required />
            {providerProductError.length > 0 ? <span className={style.styleError}>{providerProductError}</span> : ''}
        </>
    )
}

export const InputPricesProductComponent = ({style, setProdPrices}) => {
    const [pricesProductError, setPricesProductError] = useState(false)
    const [prices, setPrices] = useState({ cost: -1, list_one: -1, list_two: -1, list_three: -1 })

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)
        const typePrice = e.target.id

        if (isNaN(inputValue)) return setPricesProductError('Type value invalid')
        if (!inputValue) return setPricesProductError(`Price ${typePrice} is require`)
        if (inputValue < 0) return setPricesProductError('Stock accepted is greater than 0')

        setPrices((prevPrices) => ({
            ...prevPrices,
            [typePrice]: inputValue
        }))
        return setPricesProductError(false)
    }

    useEffect(() => {
        if (prices.cost > -1 && prices.list_one > -1 && prices.list_two > -1 && prices.list_three > -1) {
            setProdPrices(prices);
        }
    }, [prices, setProdPrices])

    return (
        <>
            <label htmlFor="prices[]">Prices</label>
            <ul className={style.container_prices}>
                <li>
                    <input type="number" id='cost' name='prices[]' placeholder='Insert cost' min={0} required onChange={handleInputChange}className={pricesProductError.length > 0 ? style.errorActive : ''} />
                    {pricesProductError.length > 0 ? <span className={style.styleError}>{pricesProductError}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_one' name='prices[]' placeholder='Insert list 1' min={0} required onChange={handleInputChange} className={pricesProductError.length > 0 ? style.errorActive : ''} />
                    {pricesProductError.length > 0 ? <span className={style.styleError}>{pricesProductError}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_two' name='prices[]' placeholder='Insert list 2' min={0} required onChange={handleInputChange} className={pricesProductError.length > 0 ? style.errorActive : ''} />
                    {pricesProductError.length > 0 ? <span className={style.styleError}>{pricesProductError}</span> : ''}
                </li>
                <li>
                    <input type="number" id='list_three' name='prices[]' placeholder='Insert list 3' min={0} required onChange={handleInputChange} className={pricesProductError.length > 0 ? style.errorActive : ''} />
                    {pricesProductError.length > 0 ? <span className={style.styleError}>{pricesProductError}</span> : ''}
                </li>
            </ul>
        </>
    )
}

export const InputPromotionProductComponent = ({style, setProdPromotion, prodPrices}) => {
    const [promo, setPromo] = useState(false)
    const [promotionProductError, setPromotionProductError] = useState(false)
    
    const isPromotion = (e) => setPromo(e.target.checked)

    const handleInputChange = (e) => {
        const inputValue = parseInt(e.target.value)

        if (isNaN(inputValue)) return setPromotionProductError('Type value invalid')
        if (inputValue.length === 0) return setPromotionProductError('Price promotion value is require')

        setPromotionProductError(false)
        setProdPromotion(promo)
        return
    }

    return(
        <>
            <label htmlFor="promotion">Promotion<input type="checkbox" id='promotion' name='promotion' onChange={isPromotion} checked={promo}/></label>
            {promo ? <input type="number" onChange={handleInputChange} id='promotionPrice' name='promotion' placeholder='Insert promotion price' min={0} className={promotionProductError.length > 0 ? style.errorActive : ''} required /> : ''}
            {promotionProductError.length > 0  && promo ? <span className={style.styleError}>{promotionProductError}</span> : ''}
        </>
    )
}

export const UploadsImagesComponent = ({style, setImages, images}) => {
    //errors state
    const [uploadImagesError, setUploadImagesError] = useState(false)
    const [photos, setPhotos] = useState(false)

    const withThumbnails = (e) => setPhotos(e.target.checked)

    const uploadsImages = (e) => {
        setUploadImagesError(false)

        const input = document.getElementById('thumbnails')
        input.click()
    }

    const handleFileChange = async (e) => {
        const formData = new FormData()
        const selectedFiles = Array.from(e.target.files);
        const codeProduct = document.getElementById('code').value;

        if (selectedFiles.length >= 6) return setUploadImagesError('Maximum images allowed is 5');
        if (codeProduct.length === 0) return setUploadImagesError('Please enter a code');

        
        selectedFiles.forEach((file, index) => {
            const newName = `${codeProduct}_${index}`
            formData.append('thumbnails', new File([file], newName, { type: file.type }))
            return
        })

        const response = await fetch('/api/products/uploadThumbnails', {
            method: 'POST',
            body: formData,
        }).then(res => res.json()).then(data => {
            if (data.status !== 'success' && images.length === 0) return setUploadImagesError(data.error)
            setImages(data.payload)
        })
    }

    return (
        <>
            <label htmlFor="thumbnails">Photos<input type="checkbox" name='photos' onChange={withThumbnails} checked={photos}/></label>
            {!photos ? '' :
                <>
                    <div onClick={uploadsImages} className={uploadImagesError.length > 0 ? style.errorActive : ''}>
                        {images.length >= 4 ? '' : <img src={uploadImage} alt="Image upload"/>}
                        {!images || images.length === 0 ? '' : 
                            images.map((image, index) => {
                                return <img key={index} src={image} alt="Product image" className={style.withThumbnails} />
                            })
                        }
                    </div>
                    {uploadImagesError ? <span className={style.styleError}>{uploadImagesError}</span> : ''}
                    <input accept="image/png, image/jpeg" type="file" id='thumbnails' name='thumbnails' multiple hidden onChange={handleFileChange}/>
                </>
            }
        </>
    )
}