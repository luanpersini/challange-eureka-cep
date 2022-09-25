import React from 'react'
import { AddressSearch } from './components/AddressSearch'

const App: React.FunctionComponent<Record<string, unknown>> = (props) => {

  return (
    <div className="app mt-5">      
      <main className="container d-flex justify-content-center">      
        <div className="col-12 col-xl-10">
          <h2>Busca de endereço por CEP</h2>
          <AddressSearch/>
        </div>
      </main>
    </div>
  )
}

export default App
