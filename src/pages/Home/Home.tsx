import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to the Police Data App</h1>
      <p>
        This app allows you to explore public data provided by the UK Police API.
        You can browse police forces, view crime categories, and learn more about public safety.
      </p>
      <Link to="/forces" className="cta-link">View Police Forces</Link>
    </div>
  )
}
