import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const result = await Listing.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};
