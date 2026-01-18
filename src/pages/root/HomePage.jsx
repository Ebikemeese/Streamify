import toast from "react-hot-toast"

const HomePage = () => {
  return (
    <div>
      <p>HomePage</p>

      <button onClick={() => toast.success("Hello world!")}>Create a toast</button>
    </div>
  )
}

export default HomePage