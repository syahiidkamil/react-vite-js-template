import React from "react";
import { useParams, Link } from "react-router";

const ProductDetailsPage = () => {
  const { id } = useParams();

  // In a real app, you would fetch the product details from an API
  const product = {
    id,
    name: `Product ${id}`,
    description: `This is a detailed description for product ${id}. It includes information about the product's features, benefits, and specifications.`,
    price: `$${(id * 19.99).toFixed(2)}`,
    category: "Category A",
    inStock: true,
    sku: `SKU-${id}0001`,
  };

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/products"
          className="text-blue-500 hover:text-blue-700 flex items-center"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Back to Products
        </Link>
      </div>

      <div className="bg-white overflow-hidden border rounded p-6">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Product Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Price</p>
              <p className="text-gray-800 font-medium">{product.price}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Category</p>
              <p className="text-gray-800 font-medium">{product.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">SKU</p>
              <p className="text-gray-800 font-medium">{product.sku}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Description
          </h2>
          <p className="text-gray-600">{product.description}</p>
        </div>

        <div className="mt-6 flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Edit Product
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
