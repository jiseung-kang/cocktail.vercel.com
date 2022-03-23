import styled from 'styled-components';
import { CATEGORY } from '../constants';

interface CategoryProps {
  ingredients: string[];
  setSelectedList: (value: string[]) => void;
  selectedList: string[];
}

const Category = ({
  ingredients,
  setSelectedList,
  selectedList,
}: CategoryProps) => {
  const alcoholTab: string[] = [];
  const otherTab: string[] = [];

  ingredients?.forEach((ingredient: string) => {
    const tmp = ingredient.toLowerCase();
    CATEGORY.forEach((liquor) => {
      if (tmp.indexOf(liquor) >= 0) {
        alcoholTab.push(ingredient);
      }
    });
  });
  ingredients?.forEach((ingredient: string) => {
    if (!alcoholTab.includes(ingredient)) {
      otherTab.push(ingredient);
    }
  });

  const handleOnClick = (e: any) => {
    if (e.target.tagName === 'LI') {
      const value = e.target.textContent;
      if (!selectedList.includes(value)) {
        const newArr = [...selectedList];
        newArr.push(value);
        setSelectedList(newArr);
      }
    }
  };

  return (
    <CategoryContainer>
      <ul onClick={handleOnClick}>
        {alcoholTab?.map((alcoholItem) => {
          return <li key={alcoholItem}>{alcoholItem}</li>;
        })}
      </ul>

      <ul onClick={handleOnClick}>
        {otherTab?.map((otherItem) => {
          return <li key={otherItem}>{otherItem}</li>;
        })}
      </ul>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.article`
  display: flex;
  height: 60px;
  overflow-y: scroll;
`;

export default Category;
