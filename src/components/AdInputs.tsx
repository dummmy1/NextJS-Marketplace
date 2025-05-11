export default function AdInputs() {
  return (
    <>
      <h1 className="font-semibold">List your product</h1>
      <label htmlFor="title" className="font-semibold">
        Title
      </label>
      <input id="title" type="text" placeholder="Title" />
      <label className="font-semibold">Price</label>
      <input type="number" placeholder="Price" />
      <label className="font-semibold">Category</label>
      <select defaultValue="">
        <option value="" disabled>
          Select Category
        </option>
        <option value="">🛵 Motorized vehicles</option>
        <option value="">⚡ Electronics</option>
        <option value="">🔎 Others</option>
      </select>
      <label className="font-semibold">Description</label>
      <textarea placeholder="Description"></textarea>
      <label className="font-semibold">Contact</label>
      <textarea placeholder="Contact: +358443546477"></textarea>
    </>
  );
}
