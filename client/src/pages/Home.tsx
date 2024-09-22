import { CreatePost } from "@/components/CreatePost/CreatePost"
import Posts from "@/components/Posts/Posts"
import { Button } from "@/components/ui/button"

const Home = () => {




  const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
  }

  return (
    <div>
      <Button
        onClick={handleLogout}
      
      >
        Logout
      </Button>
      <Posts/>
      <CreatePost/>
    </div>
  )
}

export default Home