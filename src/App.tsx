import { useFetch } from './hooks/useFetch'

type Repository = {
  id: string
  name: string
  description: string
}

function App() {
  const { data: repositories, loading } =  useFetch<Repository[]>('users/kauefontes/repos')
  return (
    <ul>
      {loading && <p>Loading...</p>}
      {
        repositories?.map(repository => {
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
