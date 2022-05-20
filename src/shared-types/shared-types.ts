import React from 'react';

export interface Props {
  nextPage?: number;
  setRefetch?: React.Dispatch<React.SetStateAction<boolean>>;
  setNextPage?: React.Dispatch<React.SetStateAction<number>>;
  fetchMore?: any;
  setCards?: React.Dispatch<React.SetStateAction<any[]>>;
  setIsRefetching?: React.Dispatch<React.SetStateAction<boolean>>;
  newRequest?: {
    status: string;
    name: string;
    gender: string;
    species: string;
  };
  setNewRequest?: React.Dispatch<
    React.SetStateAction<{
      status: string;
      name: string;
      gender: string;
      species: string;
    }>
  >;
  toggleFilter?: boolean;
  setToggleFilter?: React.Dispatch<React.SetStateAction<boolean>>;
}
