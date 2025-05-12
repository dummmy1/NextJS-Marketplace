export default function AdInputs() {
  return (
    <>
      <h1 className="font-semibold">List your product</h1>

      <label htmlFor="title" className="font-semibold">
        Title
      </label>
      <input id="title" name="title" type="text" placeholder="Title" />

      <label htmlFor="price" className="font-semibold">
        Price
      </label>
      <input id="price" name="price" type="number" placeholder="Price" />

      <label htmlFor="category" className="font-semibold">
        Category
      </label>
      <select id="category" name="category" defaultValue="">
        <option value="" disabled>
          Select Category
        </option>
        <option value="motorized">🛵 Motorized vehicles</option>
        <option value="electronics">⚡ Electronics</option>
        <option value="others">🔎 Others</option>
      </select>

      <label htmlFor="description" className="font-semibold">
        Description
      </label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
      ></textarea>

      <label htmlFor="contact" className="font-semibold">
        Contact
      </label>
      <textarea
        id="contact"
        name="contact"
        placeholder="Contact: +358443546477"
      ></textarea>
    </>
  );
}
