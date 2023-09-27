import React, {useState, useEffect, useContext} from "react";
import "./style.css"
import Nav from "./Nav"
import Search from "./Search"
import Repositories from "./Repositories";
import { getRepositories, createRepository, destroyRepository } from "../../services/api";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

const MainPage = () => {

   const { user, logout } = useContext(AuthContext)
   const [repositories, setRepositories] = useState([])
   const [loading, setLoading] = useState(true)
   const [loadingError, setLoadingError] = useState(false)

   const loadData = async(query = "") => {
      try {
         setLoading(true)
         const response = await getRepositories(user?.id, query)
         setRepositories(response.data)
         setLoading(false)
      } catch (err) {
         console.error(err)
         setLoadingError(true)
      }
   }

   useEffect(() => {
      (async () => await loadData())()
   }, [])

   const handleLogout = () => {
      console.log("Logout")
      logout()
   }

   const handleSearch = (query) => {
      console.log("procurando: ", query)
      loadData(query)
   }

   const handleDeleteRepo = async (repository) => {
      console.log("Remove Repo: ", repository)
      await destroyRepository(user?.id, repository._id)
      await loadData()
   }

   const handleAddRepo = async (url) => {
      console.log("Add Repo: ", url)
      try {
         await createRepository(user?.id, url)
         await loadData()
      } catch (err) {
         console.error(err)
         setLoadingError(true)
      }
   }

   if(loadingError){
      return(
         <div className="loading">Erro ao carregar dados de repositório. <Link to="/login">Voltar</Link></div>
      )
   }

   if(loading){
      return(
         <div className="loading">Carregando...</div>
      )
   }


   return (
      <div id="main">
         <Nav onLogout={handleLogout}></Nav>
         <Search onSearch={handleSearch}></Search>
         <Repositories repositories={repositories} onDeleteRepo={handleDeleteRepo} onNewRepo={handleAddRepo}></Repositories>
      </div>
   )
}

export default MainPage