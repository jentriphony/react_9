import classes from './Add.module.css'

import { useRef } from 'react'



const Add = dataProps => {



  const titleRef = useRef('')
  const priceRef = useRef('')
  const descriptionRef = useRef('')



  const submitHandler = event => {

    event.preventDefault()

    const item = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value
    }
    dataProps.onSubmit(item)
    
  }


  return (

    <form onSubmit={ submitHandler }>



      <div className={ classes.control }>
	<label htmlFor='title'>
	  title
	</label>
	
	<input
	  type='text'
	  id='title'
	  ref={ titleRef }
	/>
      </div>

      <div className={ classes.control }>
	<label htmlFor='price'>
	  price
	</label>
	
	<input
	  type='number'
	  id='price'
	  min='0.5'
	  step='0.25'
	  defaultValue='0.5'
	  ref={ priceRef }
	/>
      </div>

      <div className={ classes.control }>
	<label htmlFor='description'>
	  description
	</label>
	
	<textarea
	  type='text'
	  id='description'
	  ref={ descriptionRef }
	/>
      </div>

      <button>add</button>



    </form>
    
  )


  
}



export default Add
