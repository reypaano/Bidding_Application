import { useState, useEffect } from "react";
import { User } from "../models/user";
import { Item } from "../models/item";
import * as BiddingApi from "../network/bidding_app_api";
import styles from "../styles/utils.module.css";
import ItemList from "./ItemList";
import Timer from "./Timer";
import CreateNewItemModal from "./CreateNewItemModal";

const LoggedInLanding = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showItemtable, setShowItemtable] = useState(true);
  const [itemList, setItemList] = useState<Item[]>();
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [itemToBid, setItemToBid] = useState(null as null | Item);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [showCreateNewItemModal, setShowCreateNewItemModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await BiddingApi.getLoggedInUser();
        setUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      try {
        const items = await BiddingApi.fetchItems();
        setItemList(items);
        setFilteredItems(items);
        setShowItemtable(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchItems();
  }, []);

  useEffect(() => {
    async function updateItem() {
      console.log(itemToBid);
      try {
        const items = await BiddingApi.updateItem(itemToBid._id);
        console.log(items);
        setItemList(
          itemList.map((existingItem) =>
            existingItem._id === items._id ? items : existingItem
          )
        );
        setFilteredItems(
          itemList.map((existingItem) =>
            existingItem._id === items._id ? items : existingItem
          )
        );
        alert(
          `Bid Approved! New Bid for ${items.itemName} is ${items.currentPrice}`
        );
      } catch (error) {
        console.error(error);
      }
    }
    updateItem();
  }, [itemToBid]);

  useEffect(() => {
    const filtered = itemList?.filter((item) =>
      item.status.toLowerCase().includes(statusFilter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [statusFilter]);

  const bidItemData = (data: Item) => {
    setItemToBid(data);
  };

  return (
    <>
      <section className={`${styles.sectionContent}`}>
        <input
          className={`${styles.defaultBtn}`}
          type="button"
          value="Ongoing"
          onClick={() => setStatusFilter("ongoing")}
        />
        <input
          className={`${styles.defaultBtn}`}
          type="button"
          value="Completed"
          onClick={() => setStatusFilter("completed")}
        />

        <input
          type="button"
          value="Create New Item"
          onClick={() => setShowCreateNewItemModal(true)}
          className={`${styles.createItemBtn}`}
        />
        {showItemtable && user != null && (
          <ItemList list={filteredItems} onBid={bidItemData} user={user} />
        )}
        {showCreateNewItemModal && (
          <CreateNewItemModal
            onDismiss={() => setShowCreateNewItemModal(false)}
            onItemSaved={(newItem) => {
              setShowCreateNewItemModal(false);
              setItemList([...itemList, newItem]);
              setFilteredItems([...itemList, newItem]);
            }}
          />
        )}
      </section>
    </>
  );
};

export default LoggedInLanding;
