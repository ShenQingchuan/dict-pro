import React from 'react'
import './Home.scss'
import QuickSearch from '../../components/QuickSearch/QuickSearch'
import { Divider } from 'semantic-ui-react'

function Home() {
  return (
    <div className="page-home">
      <QuickSearch />
      <Divider className="after-search-divider" />
    </div>
  )
}

export default Home

