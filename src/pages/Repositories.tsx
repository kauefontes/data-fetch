import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"


type RepositoryType = {
  id: string
  name: string
  full_name: string
  description: string
}

function Repositories() {
  const { data, isFetching } = useQuery<RepositoryType[]>(['repository'], async () => {
    const response = await axios.get('https://api.github.com/users/kauefontes/repos')

    return response.data

  }, {
    staleTime: 1000 * 6
  })


  return (
    <ul>
      {isFetching && <p>Loading...</p>}
      {
        data?.map(repository => {
          return (
            <li key={repository.id}>
              <Link to={`repos/${repository.full_name}`}>{repository.name}</Link>
              <p>{repository.description}</p>
            </li>
          )
        })
      }
    </ul>
  )
}

export default Repositories
export type { RepositoryType }
