import { IconContext } from '@react-icons/all-files';
import { FiChevronLeft } from '@react-icons/all-files/fi/FiChevronLeft';
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import React, { useMemo } from 'react';

type Props = {
  page: number
  totalPage: number
  onPageChange(page: number): void
}

const Pagination = function Pagination({
  page,
  totalPage,
  onPageChange,
}: React.PropsWithChildren<Props>) {
  const iconOptions = useMemo(
    () => ({
      className: 'text-gray-500',
      size: '20px',
    }),
    [],
  );

  return (
    <div className="p-6">
      <div className="w-60 mx-auto grid grid-cols-[40px,1fr,40px] gap-3 items-center">
        <button
          type="button"
          className="btn-icon"
          disabled={page === 0}
          title="上一页"
          onClick={() => onPageChange(page - 1)}
        >
          <IconContext.Provider
            value={iconOptions}
          >
            <FiChevronLeft />
          </IconContext.Provider>
        </button>
        <span className="text-gray-500 text-sm text-center">
          {page + 1}
          {' '}
          of
          {' '}
          {totalPage}
        </span>
        <button
          type="button"
          className="btn-icon"
          disabled={totalPage - 1 === page}
          title="下一页"
          onClick={() => onPageChange(page + 1)}
        >
          <IconContext.Provider
            value={iconOptions}
          >
            <FiChevronRight />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
