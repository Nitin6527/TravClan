import React, { useEffect, useState } from 'react';
import DisplayCard from './components/card/displayCard'
import axios from 'axios';
import Pagination from './components/pagination/pagination';
import classes from './App.module.css';
import { AiOutlineSearch } from 'react-icons/ai'

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchedBid, setSearchedBid] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [userPerPage] = useState(6);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get("https://intense-tor-76305.herokuapp.com/merchants")
      setUsers(users.data)
    }
    fetchUsers()
  }, [])

  const handlePaginate = (number) => {
    setCurrentPage(number)
  }

  const handleChange = (event) => {
    setSearchedBid(event.target.value)
  }

  const indexOfLastUser = currentPage * userPerPage;
  const indexOfFirstUser = indexOfLastUser - userPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser)

  return (
    <div className={classes.mainContainer}>
      <div className={classes.header}>
        <div className={classes.inputbox}>
          <input onChange={handleChange} placeholder="Enter Bid Amount" type="number" name="number"></input>
        </div>
      </div>
      <div className={classes.container}>
        {currentUsers.map((user) => {
          return <DisplayCard key={user.id} user={user} searchedBid={searchedBid} />
        })}
      </div>
      <div className={classes.pagination}>
        <Pagination userPerPage={userPerPage} totalUsers={users.length} paginate={handlePaginate} />
      </div>
    </div>
  )
}

export default App
