/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function TextArea({ heading }: { heading?: string }) {
    return (
        <div>
            <label
                htmlFor="comment"
                className="block text-sm font-medium text-white"
            >
                {heading}
            </label>
            <div className="mt-1">
                <textarea
                    rows={4}
                    name="comment"
                    id="comment"
                    className="bg-transparent shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md "
                    defaultValue={""}
                />
            </div>
        </div>
    );
}
