import styles from "../styles/utils.module.css";
import { Item } from "../models/item";
import Timer from "./Timer";
import { User } from "../models/user";

interface ItemListProps {
  list: Item[];
  onBid: (data: Item) => void;
  user: User;
}

const ItemList = (props: ItemListProps) => {
  const { list, onBid, user } = props;
  const walletValue = user?.wallet;
  console.log(walletValue);
  return (
    <>
      <div>
        <table>
          <tr>
            <th>Item Name</th>
            <th>Current Price</th>
            <th>Duration</th>
            <th>Action</th>
          </tr>
          {list?.map((item) => {
            return (
              <tr key={item._id}>
                <td>{`${item.itemName}`}</td>
                <td>{`${item.currentPrice}`}</td>
                <td>
                  {item.status === "completed" ? (
                    "ENDED"
                  ) : (
                    <Timer
                      countdownDuration={parseInt(item.duration)}
                      createdDate={item.createdAt}
                      item={item}
                    />
                  )}
                </td>
                <td>
                  <div>
                    <input
                      type="button"
                      value="Bid"
                      onClick={() => onBid(item)}
                      disabled={
                        item.status.trim() === "completed" ||
                        item.currentPrice > walletValue
                      }
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </>
  );
};

export default ItemList;
