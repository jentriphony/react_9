import './App.css'

import { useState, Fragment } from 'react'
import List from './components/List/List'



function App() {



  const [list, setList] = useState([])
  const [status, setStatus] = useState(false)
  const [error, setError] = useState('')
  
  
  async function fetchHandler() {

    setStatus(true)
    setError(null)
    const coin = Math.floor((Math.random() * 10)) % 3
    let filter = ''
    if(coin === 0) {
      filter = 'sunglasses'
    } else if(coin === 1) {
      filter = 'smartphones'
    } else {
      filter = 'furniture'
    }
    try {
      const responce = await fetch(`https://dummyjson.com/products/category/${ filter }?select=title,price,description&limit=5`)
      if(!responce.ok) {
	throw new Error('error')
      }
      const data = await responce.json()
      setList(data.products)
    } catch(error_) {
      setError(error_.message)
    }
    setStatus(false)
    
  }

  const errorStatus = !(error === '')
  let content = null
  console.log(list.length)
  if(errorStatus) {
    content = (

      <p>{ error }</p>
      
    )
  } else if(status) {
    content = (

      <p>fetching</p>
	
    )
  } else if(list.length === 0) {
    content = (

      <p>no items</p>
      
    )
  } else if(list.length > 0) {
    content = (

      <List list={ list } />
      
    )
  }
  
  
  return (

    <Fragment>


      
      <section>
	<button onClick={ fetchHandler }>
	  fetch
	</button>
      </section>

      <section>{ content }</section>


      
    </Fragment>
    
  )
  

  
}

export default App
