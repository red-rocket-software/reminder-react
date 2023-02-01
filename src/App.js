/* eslint-disable import/no-cycle */
import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent';
import Header from './components/Header';
import Title from './components/Title';
import style from './styles/modules/app.module.scss';

export const AppContext = React.createContext();

let varStartTime;
export const BASE_URL = 'http://localhost:8000';

function App() {
  const [reminds, setReminds] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [requestData, setRequestData] = React.useState(new Date());
  const [requestUpdateData, setRequestUpdateData] = React.useState(new Date());
  const [cursor, setCursor] = React.useState(0);
  const [nextCursor, setNextCursor] = React.useState(0);
  const [prevCursor, setPrevCursor] = React.useState([]);
  const [filter, setFilter] = React.useState(
    localStorage.getItem('filterStatus')
  );
  const [timePeriod, setTimePeriod] = React.useState(
    localStorage.getItem('filterTimePeriod')
  );
  const [limit, setLimit] = React.useState(localStorage.getItem('limitStatus'));

  let listParam = '';
  if (filter === 'all') {
    listParam = 'remind';
  } else if (filter === 'incompleted') {
    listParam = 'current';
  } else {
    listParam = 'completed';
  }

  const deleteData = async (id) => {
    try {
      await fetch(`${BASE_URL}/remind/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json',
        },
      });
      setRequestData(new Date());
    } catch (error) {
      console.log(error);
    }
    toast.success('Todo Deleted Successfully');
  };

  const handleDelete = React.useCallback((id) => {
    deleteData(id);
  }, []);

  const updateFilter = (e) => {
    localStorage.setItem('filterStatus', e.target.value);
    setFilter(e.target.value);
    setCursor(0);
  };

  const updateLimit = (e) => {
    localStorage.setItem('limitStatus', e.target.value);
    setLimit(e.target.value);
  };

  const updateStartRangeTime = () => {
    const currendDay = new Date();
    const startTime = new Date();

    if (timePeriod === 'today') {
      startTime.setHours(0, 0, 0);
      varStartTime = startTime.toISOString();
    } else if (timePeriod === 'lastWeek') {
      startTime.setDate(currendDay.getDate() - 7);
      varStartTime = startTime.toISOString();
    } else if (timePeriod === 'lastMonth') {
      startTime.setMonth(currendDay.getMonth() - 1);
      varStartTime = startTime.toISOString();
    }
  };

  const updateTimePeriod = (e) => {
    localStorage.setItem('filterTimePeriod', e.target.value);
    setTimePeriod(e.target.value);
    updateStartRangeTime();
  };

  const handlePaginatePrev = (event) => {
    event.preventDefault();

    if (prevCursor.length > 0) {
      setCursor(prevCursor[prevCursor.length - 1]);
      prevCursor.pop();
    }
  };

  const handlePaginateNext = (event) => {
    event.preventDefault();
    if (reminds.length < limit) {
      return;
    }
    setPrevCursor((current) => [...current, cursor]);
    setCursor(nextCursor);
  };

  React.useEffect(() => {
    updateStartRangeTime();
    const fetchingData = async () => {
      const finishTimeRange = new Date().toISOString();
      try {
        const res = await fetch(
          filter === 'completed'
            ? `${BASE_URL}/${listParam}?limit=${limit}&cursor=${cursor}&start=${varStartTime}&end=${finishTimeRange}`
            : `${BASE_URL}/${listParam}?limit=${limit}&cursor=${cursor}`
        );
        if (!res.ok) throw new Error('Something went wrong!');
        const data = await res.json();
        setReminds(data.todos);
        setNextCursor(data.pageInfo.nextCursor);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchingData();
  }, [
    requestData,
    filter,
    cursor,
    requestUpdateData,
    listParam,
    timePeriod,
    limit,
  ]);

  return (
    <>
      <div className='container'>
        <Title>Reminder</Title>
        <div className={style.app__wrapper}>
          <AppContext.Provider
            value={(setRequestData, filter, setFilter, setRequestUpdateData)}
          >
            <Header
              filter={filter}
              updateFilter={updateFilter}
              timePeriod={timePeriod}
              updateTimePeriod={updateTimePeriod}
              updateLimit={updateLimit}
              limit={limit}
            />
            <AppContent
              reminds={reminds}
              error={error}
              loading={loading}
              filter={filter}
              pagingNext={handlePaginateNext}
              pagingPrev={handlePaginatePrev}
              handleDelete={handleDelete}
            />
          </AppContext.Provider>
        </div>
      </div>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            fontSize: '2rem',
          },
        }}
      />
    </>
  );
}

export default App;
