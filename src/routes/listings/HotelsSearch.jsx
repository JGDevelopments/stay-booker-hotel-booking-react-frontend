import GlobalNavbar from '../../components/gloabal-navbar/GlobalNavbar';
import GlobalSearchBox from '../../components/global-search-box/GlobalSearchbox';
import ResultsContainer from '../../components/results-container/ResultsContainer';
import { useState, useEffect } from 'react';
import { networkAdapter } from '../../services/NetworkAdapter';

const MAX_GUESTS_INPUT_VALUE = 10;

const HotelsSearch = () => {
  const [isDatePickerVisible, setisDatePickerVisible] = useState(false);
  const [locationInputValue, setLocationInputValue] = useState('Pune');
  const [numGuestsInputValue, setNumGuestsInputValue] = useState('');
  const [filtersData, setFiltersData] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });
  const [hotelsResults, setHotelsResults] = useState({
    isLoading: true,
    data: [],
    errors: [],
  });

  const onDatePickerIconClick = () => {
    setisDatePickerVisible(!isDatePickerVisible);
  };

  const onDateSelect = (selection) => {
    console.log(selection);
  };

  const onLocationChangeInput = (e) => {
    console.log(e.target.value);
    setLocationInputValue(e.target.value);
  };

  const onNumGuestsInputChange = (e) => {
    const userInputValue = e.target.value;
    if (userInputValue < MAX_GUESTS_INPUT_VALUE && userInputValue > 0) {
      setNumGuestsInputValue(e.target.value);
    }
  };

  const fetchHotels = async (city, star_ratings) => {
    const filters = { city, star_ratings };
    const hotelsResultsResponse = await networkAdapter.get('/api/hotels', {
      filters: JSON.stringify(filters),
    });
    if (hotelsResultsResponse) {
      setHotelsResults({
        isLoading: false,
        data: hotelsResultsResponse.data.elements,
        errors: hotelsResultsResponse.errors,
      });
    }
  };

  useEffect(() => {
    const getInitialData = async () => {
      const hotelsResultsResponse =
        await networkAdapter.get('/api/nearbyHotels');

      const filtersDataResponse = await networkAdapter.get(
        'api/hotels/verticalFilters'
      );

      if (hotelsResultsResponse) {
        setHotelsResults({
          isLoading: false,
          data: hotelsResultsResponse.data.elements,
          errors: hotelsResultsResponse.errors,
        });
      }
      if (filtersDataResponse) {
        setFiltersData({
          isLoading: false,
          data: filtersDataResponse.data.elements,
          errors: filtersDataResponse.errors,
        });
      }
    };
    getInitialData();
  }, []);

  useEffect(() => {
    // TODO
    // setHotelsResults({
    //   isLoading: true,
    //   data: [],
    //   errors: [],
    // });
    // fetchHotels(locationInputValue, '8');
  }, [locationInputValue]);

  return (
    <div className="hotels">
      <GlobalNavbar />
      <div className="bg-brand px-2 lg:h-[120px] h-[220px] flex items-center justify-center">
        <GlobalSearchBox
          locationInputValue={locationInputValue}
          numGuestsInputValue={numGuestsInputValue}
          isDatePickerVisible={isDatePickerVisible}
          onLocationChangeInput={onLocationChangeInput}
          onNumGuestsInputChange={onNumGuestsInputChange}
          onDateSelect={onDateSelect}
          onDatePickerIconClick={onDatePickerIconClick}
        />
      </div>
      <div className="my-4"></div>
      <ResultsContainer
        hotelsResults={hotelsResults}
        enableFilters={true}
        filtersData={filtersData}
      />
    </div>
  );
};

export default HotelsSearch;
