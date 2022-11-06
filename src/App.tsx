import { useQuery } from "@tanstack/react-query"
import axios from "axios"


type Repository = {
  id: string
  name: string
  description: string
}

function App() {
  const { data, isFetching } = useQuery<Repository[]>(['repository'], async () => {
    const response = await axios.get('https://api.github.com/users/kauefontes/repos')

    return response.data

  }, {
    refetchOnWindowFocus: false
  })


  return (
    <ul>
      {isFetching && <p>Loading...</p>}
      {
        data?.map(repository => {
          return (
            <li key={repository.id}>
              <strong>{repository.name}</strong>
              <p>{repository.description}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default App
