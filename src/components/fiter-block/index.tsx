import React, { useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import _ from 'lodash';
import gsap from 'gsap';
import { Props } from '../../shared-types/shared-types';
import { useErrorStore } from '../../store/useErrorStore';

import { randomPage } from '../../utils/randomPage';
import {
  FilterItem,
  FilterBody,
  Title,
  ItemTitle,
  Input,
  Checkbox,
  CheckboxItem,
  Label,
  SubmitBtn,
  SwitchLabel,
  SwitchItem,
  Slider,
  ButtonsBlock,
  SwitchBlock,
  SwitchTitle,
  Blur,
  ResetBtn,
} from './styles/style';

type Form = {
  name: string;
  gender: string;
  species: string;
  status: string;
};

const FilterBlock = ({
  setNewRequest,
  setRefetch,
  setCards,
  setIsRefetching,
  fetchMore,
  setNextPage,
  toggleFilter,
  setToggleFilter,
}: Props): JSX.Element => {
  const { register, handleSubmit, reset } = useForm<Form>();
  const filterRef = useRef();
  const blurRef = useRef();
  const store = useErrorStore();

  const filterBlockAnim = (type: 'open' | 'close'): void => {
    const filter = filterRef.current;
    const blur = blurRef.current;
    if (type === 'open') {
      gsap.to(filter, 0.5, {
        autoAlpha: 1,
        x: 0,
      });
      gsap.fromTo(
        blur,
        0.5,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      );
    } else {
      gsap.to(filter, 0.5, {
        autoAlpha: 0,
        x: -300,
      });
      gsap.to(blur, 0.5, {
        autoAlpha: 0,
      });
    }
  };

  useEffect(() => {
    if (toggleFilter) {
      filterBlockAnim('open');
    } else if (toggleFilter === false) {
      filterBlockAnim('close');
    }
  }, [toggleFilter]);

  const onSubmit = (data: Form): void => {
    const name = data?.name;
    const gender = data?.gender;
    const species = data?.species;
    const status = data?.status;

    setToggleFilter(false);
    // setIsRefetching(true);
    fetchMore({
      variables: {
        page: 1,
        name,
        gender: gender || '',
        species: species || '',
        status: status || '',
      },
    })
      .then((res) => {
        let newPage = res?.data?.characters?.info?.next;
        const newData = res?.data?.characters?.results;
        const errors = res?.errors;
        const shuffledNew = _.shuffle(newData);

        if (newPage === null || errors) {
          setNewRequest({ species: '', name: '', gender: '', status: '' });
        } else {
          setNewRequest({ species, name, gender, status });
        }
        if (errors) {
          store.updateErrors(errors);
        }
        if (newPage === null) {
          newPage = randomPage;
        }
        setCards(shuffledNew);
        setNextPage(newPage);
        setRefetch(true);
      })
      .finally(() => {
        setIsRefetching(false);
      });
  };

  return (
    <>
      <Blur onClick={() => setToggleFilter(false)} ref={blurRef} />
      <FilterBody ref={filterRef} onSubmit={handleSubmit(onSubmit)} onReset={() => reset()}>
        <Title>Selecionar filtros de pesquisa</Title>
        <FilterItem>
          <ItemTitle>Pelo nome:</ItemTitle>
          <Input ref={register} name="name"></Input>
        </FilterItem>
        <FilterItem>
          <ItemTitle>Por tipo:</ItemTitle>
          <CheckboxItem>
            <Checkbox name="species" ref={register} type="radio" id="human" value="Human"></Checkbox>
            <Label htmlFor="human">Human</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="species" ref={register} type="radio" id="alien" value="Alien"></Checkbox>
            <Label htmlFor="alien">Alienígena</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="species" ref={register} type="radio" id="mc" value="Mythological Creature"></Checkbox>
            <Label htmlFor="mc">Criatura mitológica</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="species" ref={register} type="radio" id="anySpecies" value=""></Checkbox>
            <Label htmlFor="anySpecies">Qualquer</Label>
          </CheckboxItem>
        </FilterItem>
        <FilterItem>
          <ItemTitle>Por sexo:</ItemTitle>
          <CheckboxItem>
            <Checkbox name="gender" ref={register} type="radio" id="female" value="female"></Checkbox>
            <Label htmlFor="female">Feminino</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="gender" ref={register} type="radio" id="male" value="male"></Checkbox>
            <Label htmlFor="male">Masculino</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="gender" ref={register} type="radio" id="genderless" value="genderless"></Checkbox>
            <Label htmlFor="genderless">Sem gênero</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="gender" ref={register} type="radio" id="unknown" value="unknown" />
            <Label htmlFor="unknown">Desconhecido</Label>
          </CheckboxItem>
          <CheckboxItem>
            <Checkbox name="gender" ref={register} type="radio" id="anyGender" value="" />
            <Label htmlFor="anyGender">Qualquer um</Label>
          </CheckboxItem>
        </FilterItem>
        <ButtonsBlock>
          <SwitchBlock>
            <SwitchLabel>
              <SwitchItem name="status" ref={register} type="checkbox" value="Alive" />
              <Slider />
            </SwitchLabel>
            <SwitchTitle>Mostrar apenas ao vivo</SwitchTitle>
          </SwitchBlock>

          <SubmitBtn ref={register} type="submit">
            Encontrar!
          </SubmitBtn>
        </ButtonsBlock>
        <ResetBtn type="reset">
          <span>limpar tudo</span>
        </ResetBtn>
      </FilterBody>
    </>
  );
};
export default FilterBlock;
