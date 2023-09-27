import React, {useState} from "react";

const Search = ({onSearch}) => {

    
    const handleClear = () => {
        setQuery("")
        onSearch("")
    }
    
    const [query, setQuery] = useState("")

    return (
        <div className="search">
         <label htmlFor="query">Buscar repositório:</label>
         <input type="text" name="query" id="query" value={query} onChange={(e) => setQuery(e.target.value)} />
         <button onClick={handleClear}>Limpar</button>
         <button onClick={() => onSearch(query)}>Procurar</button>
      </div>
    )
}

export default Search