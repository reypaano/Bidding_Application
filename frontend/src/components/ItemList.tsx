import styles from "../styles/utils.module.css"
import { Item } from "../models/item"

interface ItemListProps {
    list: Item[],
    onBid: (data: Item) => void
}

const ItemList = (props: ItemListProps) => {

    const {list, onBid} = props
    console.log(list)

    return (
        <>
         <div>
            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                    <th>Action</th>
                </tr>
                { 
                    list.map((item) => {
                        console.log(item)
                        return (
                            <tr key={item._id}>
                                <td>{`${item.itemName}`}</td>
                                <td>{`${item.currentPrice}`}</td>
                                <td>{`${item.duration}`}</td>
                                <td> 
                                    <div> <input type="button" value="Bid" onClick={()=>onBid(item)}/></div>
                                </td>
                            </tr>
                        )
                    })
                }
                
                
            </table>
        </div>
        </>
       
    )
}

export default ItemList