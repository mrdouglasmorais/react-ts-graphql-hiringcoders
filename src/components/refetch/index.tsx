import React from 'react';
import sadPic from './image/theEnd.png';
import _ from 'lodash';
import { useErrorStore } from '../../store/useErrorStore';
import { Props } from '../../shared-types/shared-types';
import { randomPage } from '../../utils/randomPage';
import { BlockWrapper, BtnBlock, LeftBtn, RightBtn, SadPic, SadText } from './styles/style';

const RefetchBlock = ({
  newRequest,
  setNewRequest,
  nextPage,
  fetchMore,
  setNextPage,
  setRefetch,
  setCards,
  setIsRefetching,
}: Props): JSX.Element => {
  const store = useErrorStore();
  const onClick = () => {
    setIsRefetching(true);
    console.log(newRequest, 'newRequest');

    fetchMore({
      variables: {
        page: store.errors.length > 0 ? randomPage : nextPage,
        name: newRequest.name || '',
        gender: newRequest.gender || '',
        species: newRequest.species || '',
        status: newRequest.status || '',
      },
    })
      .then((res) => {
        let newPage = res?.data?.characters?.info?.next;
        const newData = res?.data?.characters?.results;
        const shuffledNew = _.shuffle(newData);

        if (newPage === null || newPage === undefined) {
          newPage = randomPage;
          setNewRequest({ species: '', name: '', gender: '', status: '' });
        }
        setNextPage(newPage);
        setCards(shuffledNew);
        setRefetch(true);
      })
      .finally(() => {
        setIsRefetching(false);
        store.updateErrors([]);
      });
  };

  return (
    <BlockWrapper>
      <SadPic>
        <img src={sadPic} alt="" />
      </SadPic>
      <SadText>
        {store.errors.length > 0 ? (
          <>
            Кажется, ничего не найдено... <br /> Посмотреть в другом измерении?
          </>
        ) : (
          <>
            На этом пока все... <br /> Загрузить еще?
          </>
        )}
      </SadText>
      <BtnBlock>
        {store.errors.length > 0 ? (
          <LeftBtn onClick={() => onClick()}>Get Schwifty</LeftBtn>
        ) : (
          <>
            <LeftBtn onClick={() => onClick()}>Да, конечно.</LeftBtn>
            <RightBtn onClick={() => onClick()}>Еще бы!</RightBtn>
          </>
        )}
      </BtnBlock>
    </BlockWrapper>
  );
};
export default RefetchBlock;
