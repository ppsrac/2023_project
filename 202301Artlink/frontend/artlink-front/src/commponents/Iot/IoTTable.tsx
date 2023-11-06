import { useState } from "react";
import styles from "./IoTTable.module.css";
import Pagination from "../Info/Pagination";

interface Data {
  [key: string]: string | number;
}

interface SelectedPage {
  selected: number;
}

interface Props {
  pageSize: number; // 표 페이지 하나에 표시할 요소 개수
  data: Data[]; // 데이터
  dataKeys: string[]; // 데이터의 키들
  columnWidths: string[]; // 표의 각 열의 너비
}

function IoTTable({ pageSize, dataKeys, data, columnWidths }: Props) {
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 번호 저장

  const pageCount = Math.ceil(data.length / pageSize);
  const offset = currentPage * pageSize;
  const slicedData = data.slice(offset, offset + pageSize); // 페이지 별로 데이터 분할

  // 각 열에 해당하는 값 반환
  const getColumnValue = (row: Data, columnKey: string) => {
    return row[columnKey];
  };

  // 페이지 변경 시 호출되는 함수
  const handlePageChange = (selectedPage: SelectedPage) => {
    const newPage = selectedPage.selected;
    setCurrentPage(Math.max(newPage, 0)); // 현재 페이지가 0 미만이면 0으로 설정
  };

  return (
    <>
      <table>
        <thead className={styles.tableTr}>
          <tr>
            {dataKeys.map((header, columnIndex) => (
              <th
                key={columnIndex}
                style={{ width: columnWidths[columnIndex] }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {slicedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.keys(row).map((columnKey, cellIndex) => (
                <td key={cellIndex} style={{ width: columnWidths[cellIndex] }}>
                  {getColumnValue(row, columnKey)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination pageCount={pageCount} handlePageChange={handlePageChange} />
    </>
  );
}

export default IoTTable;
