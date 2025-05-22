import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { nextPage, prevPage } from '../features/pagination/paginationSlice';

function Pagination() {
  const dispatch = useDispatch();
  const offset = useSelector((state) => state.pagination.offset);

  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        onClick={() => dispatch(prevPage())}
        disabled={offset === 0}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-10"
      >
        前へ
      </button>
      <button
        onClick={() => dispatch(nextPage())}
        className="px-4 py-2 bg-gray-300 rounded hover:bg-blue-600"
      >
        次へ
      </button>
    </div>
  );
}

export default Pagination;