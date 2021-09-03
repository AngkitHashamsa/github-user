import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = useGlobalContext()
  // console.log(repos)
  let languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item

    if (!language) return total
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }

    return total
  }, {})

  // stars ,forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { forks, name, stargazers_count } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    {
      stars: {},
      forks: {},
    }
  )

  const mostForks = Object.values(forks)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  // console.log(mostForks)
  const mostStar = Object.values(stars)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  const mostUsed = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)
  // most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  // console.log(mostPopular)
  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D chartData={mostUsed}></Pie3D>
        <div>
          <Column3D chartData={mostStar} />
        </div>
        <Doughnut2D chartData={mostPopular} />

        <div>
          <Bar3D chartData={mostForks} />
        </div>
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
