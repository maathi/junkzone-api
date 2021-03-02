import Item from "../models/itemModel.js"

async function getItems(req, res) {
  const pageSize = 10
  const selectedPage = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}

  const itemCount = await Item.countDocuments({ ...keyword })
  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (selectedPage - 1))

  res.json({
    items,
    selectedPage,
    totalPages: Math.ceil(itemCount / pageSize),
  })
}

async function getItemById(req, res) {
  let item = await Item.findById(req.params.id)

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
async function createItems(req, res) {
  const items = await Item.insertMany(req.body.items)
  if (items) {
    res.json(items)
  } else {
    res.status(404)
    throw new Error("Item not found")
  }
}

async function updateItemById(req, res) {
  const item = await Item.findById(req.params.id)

  if (item) {
    item.name = req.body.name || item.name
    item.image = req.body.image || item.image
    item.price = req.body.price || item.price
    item.numInStock = req.body.numInStock || item.numInStock
    item.detail = req.body.detail || item.detail

    const updatedItem = await item.save()
    res.json({
      _id: updatedItem._id,
      name: updatedItem.name,
      image: updatedItem.image,
      price: updatedItem.price,
      numInStock: updatedItem.numInStock,
      detail: updatedItem.detail,
    })
  } else {
    res.status(404)
    throw new Error("Item not found")
  }
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

// @desc Create new review
// @route POST /api/items/:id/reviews
// @acess Private/
const createItemReview = async (req, res) => {
  const { rating, comment } = req.body

  const item = await Item.findById(req.params.id)

  if (item) {
    const alreadyReviewed = item.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )
    console.log(alreadyReviewed)

    if (alreadyReviewed) {
      res.status(400)
      throw new Error("You have already reviewed this item")
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating,
      comment,
    }

    item.reviews.push(review)
    item.numReview = item.reviews.length
    item.rating =
      item.reviews.reduce((acc, curr) => acc + curr.rating, 0) / item.numReview

    await item.save()

    res.status(201).json(item)
  } else {
    res.status(404)
    throw new Error("Item not found")
  }
}

export {
  getItems,
  getItemById,
  createItem,
  updateItemById,
  deleteItemById,
  createItemReview,
  createItems,
}
