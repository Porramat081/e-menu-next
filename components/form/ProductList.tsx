import { EllipsisVertical } from "lucide-react";
import ThumbnailPic from "../ui/ThumbnailPic";

const mock_product_list = [
  {
    name: "product1",
    price: 500,
    stock: 2,
    picUrl:
      "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg",
  },
];

export default function ProductList() {
  return (
    <div className="form-input">
      <h2 className="font-bold text-xl text-center mb-3">Product List</h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Pic</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {mock_product_list.map((item, index) => (
              <tr key={"product_list" + index}>
                <td className="flex items-center justify-center">
                  <ThumbnailPic imgUrl={item.picUrl} alt="product thumbnail" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.stock}</td>
                <td>
                  <button>
                    <EllipsisVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
