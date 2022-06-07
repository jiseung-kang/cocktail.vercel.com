import { useEffect, useState } from 'react';
import styled from 'styled-components';
interface AutoCompleteProps {
  inputValue: string;
  ingredients: string[];
  handleOnAdd: (
    e: React.TouchEvent | React.MouseEvent | React.KeyboardEvent,
  ) => void;
  currentFocus: number;
  setCurrentFocus: (value: number) => void;
  setInputValue: (value: string) => void;
  isNewInput: boolean;
  setCurrentItem: (value: string) => void;
  isArrowPressed: boolean;
}

const AutoComplete = ({
  inputValue,
  ingredients,
  handleOnAdd,
  currentFocus,
  setInputValue,
  setCurrentFocus,
  isNewInput,
  setCurrentItem,
  isArrowPressed,
}: AutoCompleteProps) => {
  const [searchedIngredients, setSearchedIngredients] = useState<string[]>([]);

  useEffect(() => {
    if (currentFocus < 0 || currentFocus === searchedIngredients.length) {
      currentFocus < 0
        ? setCurrentFocus(searchedIngredients.length - 1)
        : setCurrentFocus(0);
    }

    if (!searchedIngredients[currentFocus]) return;
    const ingredient = removeHighlight(searchedIngredients[currentFocus]);
    setCurrentItem(ingredient);

    isArrowPressed && setInputValue(ingredient);
  }, [currentFocus]);

  useEffect(() => {
    setCurrentFocus(0);
    if (!searchedIngredients[currentFocus]) return;
    const ingredient = removeHighlight(searchedIngredients[currentFocus]);
    setCurrentItem(ingredient);
  }, [searchedIngredients]);

  useEffect(() => {
    if (!isNewInput || !inputValue) {
      !inputValue && setSearchedIngredients([]);
      return;
    }
    let newArr: string[] = [];

    ingredients.sort();

    ingredients.forEach((ingredient: string) => {
      ingredient = ingredient.toLowerCase();
      inputValue = inputValue.toLowerCase();
      const index = ingredient.indexOf(inputValue);
      if (index === -1) return;

      // console.log(index);

      // ingredient =
      //   index === 0
      //     ? ingredient.replaceAll(inputValue, capitalize(inputValue))
      //     : capitalize(ingredient);

      ingredient = addHighlight(ingredient);

      if (index === 0) {
        ingredient = capitalize(ingredient, 3);
      }

      newArr.push(capitalize(ingredient, 0));
    });

    if (newArr.length > 10) {
      newArr = newArr.slice(0, 10);
    }

    setSearchedIngredients(newArr);
  }, [inputValue]);

  const capitalize = (str: string, i: number) => {
    return str.slice(0, i) + str.charAt(i).toUpperCase() + str.slice(i + 1);
  };

  const addHighlight = (str: string) => {
    str = str.replaceAll(inputValue, '<b>$&</b>');
    return str;
  };

  const removeHighlight = (str: string) => {
    return str.replaceAll('<b>', '').replaceAll('</b>', '');
  };

  return (
    <>
      {searchedIngredients.length ? (
        <Container>
          {searchedIngredients.map((ingredient: string, index: number) => {
            return (
              <Button
                key={ingredient}
                color={currentFocus === index ? 'pink' : '#fff'}
                dangerouslySetInnerHTML={{ __html: ingredient }}
                onClick={handleOnAdd}
              ></Button>
            );
          })}
        </Container>
      ) : null}
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  background-color: #fff;
  border: 1px solid #bbbbbb;
  border-radius: 10px;
  top: 100px;
  z-index: 1;
  padding: 8px;
  width: 100%;
  max-width: 300px;
  margin: 15px 10px 10px 10px;
`;

const Button = styled.button`
  width: 100%;
  margin: 2px 0;
  background-color: ${(props) => props.color};
  border: none;
  font-size: 24px;
  padding: 5px 10px;
  text-align: start;
  border-radius: 8px;
  cursor: pointer;
  :hover {
    background-color: pink;
  }
  b {
    color: #d86679;
  }
`;

export default AutoComplete;
