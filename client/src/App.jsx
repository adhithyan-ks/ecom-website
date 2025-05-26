
function App() {
  return (
    <div className="text-4-xl text-black font-bold p-4">
      <h1 className="text-1-xl text-red-500">Sign Up</h1>
      <label className="block mb-2">Email:</label>
      <input type="email" className="border border-gray-300 p-2 mb-4" placeholder="Enter your email" />
      <label className="block mb-2">Password:</label>
      <input type="password" className="border border-gray-300 p-2 mb-4" placeholder="Enter your password" />
      <button className="bg-blue-500 text-white p-2 block rounded">Sign Up</button>
    </div>
  )
}
export default App;