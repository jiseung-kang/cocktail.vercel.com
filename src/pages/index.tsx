import type { NextPage } from 'next';
import ResultBox from 'src/components/ResultContainer';
import { useEffect, useState } from 'react';
import SearchMenu from 'src/components/SearchContainer';
import TagList from 'src/components/TagList';
import { API_ENDPOINT } from 'src/constants';

const Home: NextPage = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState<string[]>([]);
  const [urlArray, setUrlArray] = useState<string[]>([]);

  useEffect(() => {
    const newArr = [];
    for (let i = 0; i < selectedList.length; i++) {
      newArr.push(`${API_ENDPOINT}filter.php?i=${selectedList[i]}`);
    }
    setUrlArray(newArr);
    setIsSubmitted(false);
  }, [selectedList]);

  return (
    <div>
      <SearchMenu
        selectedList={selectedList}
        setSelectedList={setSelectedList}
        setIsSubmitted={setIsSubmitted}
      />
      <TagList selectedList={selectedList} setSelectedList={setSelectedList} />
      {isSubmitted && urlArray ? <ResultBox urlArray={urlArray} /> : <></>}
    </div>
  );
};

export default Home;
