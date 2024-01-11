import React from "react";

const CreateListing = () => {
  const handleChange = () => {};
  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold my-7 text-center">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            className="rounded-lg p-3 border"
            required
          />
          <textarea
            type="text"
            id="description"
            placeholder="Description"
            className="rounded-lg p-3 border"
            required
          />
          <input
            type="text"
            id="address"
            placeholder="Address"
            className="rounded-lg p-3 border"
            required
          />
          <div className="flex gap-7 flex-wrap">
            <div className="flex gap-3">
              <input type="checkbox" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking spot</span>
            </div>
            <div className="flex gap-3">
              <input type="checkbox" className="w-5" id="offer" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <p>Regular price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                min="0"
                max="10000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleChange}
              />
              <div className="flex flex-col items-center">
                <p>Discounted price</p>
                <span className="text-xs">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className="flex gap-5">
            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              className="p-3 rounded-lg w-full border border-gray-300"
            />
            <button className="p-3 text-green-700 border border-green-700 uppercase rounded hover:shadow-lg disabled:opacity-50">
              Upload
            </button>
          </div>
          <button className="p-3 uppercase bg-slate-700 text-white rounded hover:opacity-90 disabled:opacity-50">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
