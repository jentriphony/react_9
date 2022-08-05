import './App.css'

import {
  useState,
  useCallback,
  useEffect,
  Fragment
} from 'react'
import List from './components/List/List'
import Add from './components/List/Item/Add'



function App() {



  const [list, setList] = useState([])
  const [status, setStatus] = useState(false)
  const [error, setError] = useState('')

  
  
  const fetchHandler = useCallback(async () => {

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
	throw new Error('error_fetch')
      }
      const data = await responce.json()
      setList(data.products)
    } catch(error_) {
      setError(error_.message)
    }
    setStatus(false)
    
  }, [])

  const addHandler = async item => {

    try {
      const responce = await fetch('https://dummyjson.com/products/add', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify({
	  title: item.title,
	  price: item.price,
	  description: item.description
	})
      })
      if(!responce.ok) {
	throw new Error('error_add')
      }
      const data = await responce.json()
      setList(previousList => {
	data.id = `${ +list.reduce((previousItem, currentItem) => previousItem.id > currentItem.id ? previousItem : currentItem).id + 1 }`
	return [
	  data,
	  ...previousList
	]
      })
    } catch(error_) {
      setError(error_.message)
    }
    
  }



  useEffect(() => {
    fetchHandler()
  }, [fetchHandler])

  let content = null
  if(error) {
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
	<Add onSubmit={ addHandler } />
      </section>
      
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
