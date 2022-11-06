import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { RepositoryType } from './Repositories'

export function Repository() {
  const params = useParams()
  const currentRepository = params['*'] as string

  const queryClient = useQueryClient()
  
  function handleChangeRepositoryDescription() {
    const previousRepositories = queryClient.getQueryData<RepositoryType[]>(['repository']) as RepositoryType[]

    if(previousRepositories) {
      const newRepositories = previousRepositories.map(repository => {
          if(repository.full_name === currentRepository) {
            return {
                ...repository,
                description: 'New description'
            }
          } else {
            return repository
          }
        }
    )    
        queryClient.setQueryData(['repository'], newRepositories)
    }
  }

  return (
    <div>
        <h1>{currentRepository}</h1>
        <button onClick={handleChangeRepositoryDescription}>Change description</button>
    </div>
)}