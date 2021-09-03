import React, { useState, useEffect, useContext } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

export const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)

  const [repos, setRepos] = useState(mockRepos)

  const [followers, setFollowers] = useState(mockFollowers)

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = React.useState('')
  const [request, setRequest] = useState(0)
  const [error, setError] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    setLoading(true)
    toggleError({ show: false, msg: '' })
    const res = await axios
      .get(`${rootUrl}/users/${user}`)
      .catch((err) => console.log(err))

    if (res) {
      setGithubUser(res.data)
      const { login, followers_url } = res.data

      await Promise.allSettled([
        axios.get(`${rootUrl}/users/${login}/repos?per_page=100`),
        axios.get(`${followers_url}?per_page=100`),
      ])
        .then((result) => {
          // console.log(result)
          const [repos, followers] = result
          const status = 'fulfilled'
          if (repos.status === status) {
            setRepos(repos.value.data)
          }
          if (followers.status === status) {
            setFollowers(followers.value.data)
          }
        })
        .catch((err) => console.log(err))
    } else {
      toggleError(true, 'user does not match search term')
    }
    checkRequest()
    setLoading(false)
  }

  const checkRequest = () => {
    axios
      .get(`${rootUrl}/rate_limit`)
      .then((res) => {
        let {
          rate: { remaining },
        } = res.data
        setRequest(remaining)
        if (remaining === 0) {
          toggleError(true, 'Sorry you have exceeded your hourly rate limit')
        }
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show = false, msg = '') {
    setError({ show, msg })
  }

  useEffect(checkRequest, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (search) {
      searchGithubUser(search)
    }
  }
  return (
    <GithubContext.Provider
      value={{
        loading,
        githubUser,
        repos,
        followers,
        search,
        setSearch,
        handleSubmit,
        request,
        error,
        toggleError,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(GithubContext)
}
