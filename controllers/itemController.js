import Item from "../models/itemModel.js"

async function getItems(req, res) {
  let items = await Item.find()
  res.send(items)
}

async function getItemById(req, res) {
  let item = await Item.findById("603136c1d8fcfd4caa8f7233")

  if (item) {
    res.send(item)
  } else {
    res.status(404)
    throw new Error("Item Not Found")
  }
}
async function createItem(req, res) {
  const item = new Item({
    name: "spoon",
    image: "spoon.jpg",
    price: 234,
  })
  const newItem = await item.save()
  res.status(201).json(newItem)
}
async function deleteItemById(req, res) {
  let deletedItem = await Item.findByIdAndDelete(req.params.id)

  if (deletedItem) {
    res.json({
      message: "Item removed",
    })
  } else {
    res.status(404)
    throw new Error("Item Not Found")
  }
}
export { getItems, getItemById, createItem, deleteItemById }
