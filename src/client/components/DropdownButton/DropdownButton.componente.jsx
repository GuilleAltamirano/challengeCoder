import React, {useState} from 'react';
import style from './DropdownButton.module.sass'

export const DropdownButton = ({list, title, query, setQuery}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [qry, setQry] = useState('') //for internal query

    const ToggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div>
            <button onClick={ToggleOptions}>{title} {!showOptions ? '>' : 'v'}</button>
            {showOptions && (
                <div className={style.container_DropdownButton}>
                    {list.map((item, index) => (
                        <label key={index}>
                            <input type="checkbox" name={title} />
                            {item}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};