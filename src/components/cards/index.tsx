import React, { useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { CHARACTERS } from '../../gql/queries/Character.query';
import { Characters } from '../../gql/queries/types/Characters';
import gsap from 'gsap';
import Loading from '../loading';
import RefetchBlock from '../refetch';
import FilterBlock from '../fiter-block';
import { randomPage } from '../../utils/randomPage';
import {
  Card,
  ButtonsBlock,
  LikeBtn,
  SkipBtn,
  Wrapper,
  CardsBlock,
  Inner,
  Name,
  NameBlock,
  NameSpan,
  Location,
  Picture,
  Info,
  FilterBtn,
  FavouritesBtn,
  Counter,
  FavBlock,
} from './styles/style';
import _ from 'lodash';

const Cards = (): JSX.Element => {
  const [nextPage, setNextPage] = useState<number>(2);
  const { loading, error, data, fetchMore } = useQuery<Characters>(CHARACTERS, {
    variables: {
      page: randomPage,
    },
    errorPolicy: 'all',
  });
  const results = data?.characters?.results;
  const nextRandomPage = data?.characters?.info?.next;
  const [id, setId] = useState(null);
  const [cards, setCards] = useState([]);
  const [newRequest, setNewRequest] = useState({ status: '', name: '', gender: '', species: '' });
  const [toggleFilter, setToggleFilter] = useState<boolean | undefined>();
  const [ok, setOk] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const cardsRef = useRef([]);
  const [favourites, setFavourites] = useState([]);

  const isEmpty = cards.length === 0;

  useEffect(() => {
    if (results && nextRandomPage) {
      const shuffled = _.shuffle(results);
      setNextPage(nextRandomPage);
      setCards(shuffled);
      setId(shuffled[0].id);
      setOk(true);
    }
  }, [results, nextRandomPage]);

  useEffect(() => {
    if (cards && results && ok) {
      if (cards.length < results.length) {
        setId(cards[0]?.id ?? '');
      }
    }
  }, [cards, results, ok]);

  useEffect(() => {
    if (cards && cards.length > 0 && refetch) {
      setId(cards[0]?.id);
      setRefetch(false);
    }
  }, [refetch, cards]);

  const removeCard = () => {
    const filtered = cards.filter((item) => item.id !== id);
    setCards(filtered);
  };

  const addToFavourites = (id) => {
    let favouritesArr = [];
    favouritesArr = JSON.parse(localStorage.getItem('favourites')) || [];
    favouritesArr.push(id);

    localStorage.setItem('favourites', JSON.stringify([...new Set(favouritesArr)]));
    setFavourites(favouritesArr);
  };
  console.log(favourites, 'array');
  const cardAnim = (type: 'skip' | 'like'): void => {
    const card = cardsRef.current[id];

    gsap.to(card, 0.4, {
      x: type === 'skip' ? -150 : 150,
      y: 20,
      ease: 'Power3.inOut',
      opacity: 0,
      onComplete: () => {
        removeCard();
        addToFavourites(id);
      },
    });
  };

  if ((loading && !ok) || isRefetching) return <Loading />;
  if (error) return <p>Error :(</p>;

  return (
    <Wrapper>
      <FilterBlock
        setToggleFilter={setToggleFilter}
        toggleFilter={toggleFilter}
        nextPage={nextPage}
        setNextPage={setNextPage}
        setNewRequest={setNewRequest}
        setRefetch={setRefetch}
        setCards={setCards}
        setIsRefetching={setIsRefetching}
        fetchMore={fetchMore}
      />
      <FilterBtn onClick={() => setToggleFilter(true)} />
      <FavBlock>
        <FavouritesBtn></FavouritesBtn>
        <Counter opacity={favourites.length > 0 ? 1 : 0}>{favourites.length}</Counter>
      </FavBlock>

      {!isEmpty && ok && (
        <Inner>
          <CardsBlock>
            {cards &&
              cards
                .map((item) => {
                  if (item === null) {
                    return null;
                  }
                  return (
                    <>
                      <Card ref={(el) => (cardsRef.current[item.id] = el)} key={item.id}>
                        <Picture>
                          <img src={item.image ?? ''} alt="" />
                        </Picture>
                        <Info>
                          <NameBlock>
                            <Name title={item.name}>{item.name ?? '-'}</Name>,
                            <NameSpan title={item.species}>{item.species ?? ''}</NameSpan>
                          </NameBlock>
                          <Location title={item.location.name}>{item.location.name ?? ''}</Location>
                        </Info>
                      </Card>
                    </>
                  );
                })
                .reverse()}
          </CardsBlock>
          <ButtonsBlock>
            <SkipBtn onClick={() => cardAnim('skip')}></SkipBtn>
            <LikeBtn onClick={() => cardAnim('like')}></LikeBtn>
          </ButtonsBlock>
        </Inner>
      )}
      {isEmpty && ok && (
        <RefetchBlock
          setNewRequest={setNewRequest}
          newRequest={newRequest}
          nextPage={nextPage}
          setNextPage={setNextPage}
          setRefetch={setRefetch}
          setCards={setCards}
          setIsRefetching={setIsRefetching}
          fetchMore={fetchMore}
        />
      )}
    </Wrapper>
  );
};
export default Cards;
