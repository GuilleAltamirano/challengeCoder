import React, {useState, useEffect} from 'react'
import style from './DropdownButton.module.sass'

export const DropdownButton = ({ list, title, query }) => {
    const [filter, setFilter] = useState("")
    const titleLower = title.toLowerCase()

    useEffect(() => {
        let updatedQuery = ""

        if (filter.length !== 0) {
            updatedQuery = query.query
                .split("&")
                .filter((param) => !param.startsWith(`${titleLower}=`))
                .join("&")
            updatedQuery = updatedQuery.length !== 0 ? `${updatedQuery}&${filter}` : filter
        } else {
            updatedQuery = query.query
                .split("&")
                .filter((param) => !param.startsWith(`${titleLower}=`))
                .join("&")
        }
        query.setQuery(updatedQuery)
    }, [filter])

    const handleCheckboxChange = (e, item) => {
        const selectedValue = `${titleLower}=${item}`
        const isItemSelected = filter === selectedValue

        if (isItemSelected) {
            setFilter("")
        } else {
            setFilter(selectedValue)
        }
    }

    return (
        <div className={style.container_DropdownButton}>
            <h4>{title}: </h4>
            <div>
                {list.map((item, index) => (
                    <label key={index}>
                    <input
                        type="checkbox"
                        name={title}
                        checked={filter === `${title}=${item}`}
                        onChange={(e) => handleCheckboxChange(e, item)}
                    />
                    {item}
                    </label>
                ))}
            </div>
        </div>
    )
}

