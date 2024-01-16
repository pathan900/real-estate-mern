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

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return next(erroHandler(404, "Listing not found !"));
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = parseInt(req.query.startIndex) || 0;

  let offer = req.query.offer;
  if (offer === "false" || offer === undefined) {
    offer = { $in: [true, false] };
  }

  let parking = req.query.parking;
  if (parking === "false" || parking === undefined) {
    parking = { $in: [true, false] };
  }

  let furnished = req.query.furnished;
  if (furnished === "false" || furnished === undefined) {
    furnished = { $in: [true, false] };
  }

  let type = req.query.type;
  if (type === "all" || type === undefined) {
    type = { $in: ["sale", "rent"] };
  }

  const searchTerm = req.query.searchTerm || "";
  const sortBy = req.query.sortBy || "createdAt";
  const order = req.query.order || "desc";

  try {
    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      parking,
      furnished,
      type,
    })
      .sort({ [sortBy]: order })
      .skip(startIndex)
      .limit(limit);
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
