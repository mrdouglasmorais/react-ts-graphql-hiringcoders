import React, { useState, useEffect, useRef} from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS } from '../../gql/queries/Character.query';
import { Characters } from '../../gql/queries/types/Characters';
import { radomPage } from '../../utils/randonPage';

import {
  Wraper
} from './styles/styles'

const Cards = (): JSX.Element  => {
  const [ nextPage, setNextPage ] = useState<number>(2);
  const { loading, error, data, fetchMore } = useQuery<Characters>(CHARACTERS, {
    variables: {
      page: radomPage
    },
    errorPolicy: 'all'
  })
  return (
    <Wraper>
      <h1>Hello Hiring Coders!</h1>
    </Wraper>
  )
}

export default Cards