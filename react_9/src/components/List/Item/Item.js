import classes from './Item.module.css'



const Item = dataProps => {



  const item = dataProps.item

  
  return (
    
    <div className={ classes.item }>


      
      <h2>{ item.title }</h2>
      
      <p>{ `$${ item.price }` }</p>
      
      <h3>{ item.description }</h3>


      
    </div>
    
  )


  
}



export default Item
