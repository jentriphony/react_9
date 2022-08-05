import classes from './List.module.css'

import Item from './Item/Item'



const List = dataProps => {


  
  return (
    
    <ul className={ classes.list }>


      
      { dataProps.list.map(item => (
	<Item key={ item.id } item={ item } />
      )) }


      
    </ul>
    
  )


  
}
export default List
