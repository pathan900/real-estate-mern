import Listing from "../models/listing.model.js";
import { erroHandler } from "../utils/errorHandler.js";

export const createListing = async (req, res, next) => {
  try {
    const result = await Listing.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(erroHandler(404, "Listing not found !"));
    if (listing.userRef !== req.user.id)
      return next(erroHandler(401, "Unauthorized action !"));
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing deleted successfully !");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) return next(erroHandler(404, "Listing not found !"));
  if (listing.userRef !== req.user.id)
    return next(erroHandler(401, "Unauthorized action !"));
  try {
    const result = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
