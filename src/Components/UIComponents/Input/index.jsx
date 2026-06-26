import React from 'react'

const index = ({placeholder,search,setSearch}) => {
    
    return (
        <input type='text' placeholder={placeholder} value={search} onChange={((e) => setSearch(e.target.value))} />
    )
}

export default index
