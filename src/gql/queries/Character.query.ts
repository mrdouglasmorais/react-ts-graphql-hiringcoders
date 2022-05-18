import { gql } from '@apollo/client';

const CHARACTERS = gql `
  query Characters($page: Int, $name: String, $gender: String, $species: String, $status: String) {
    characters(page: $page, filters: { name: $name, gender: $gender, species: $species, status: $status}){
      info {
        count
        pages
        next
      }
      results {
        id
        name
        species
        status
        location {
          name
        }
        image
      }
    }
  }
`

export { CHARACTERS }