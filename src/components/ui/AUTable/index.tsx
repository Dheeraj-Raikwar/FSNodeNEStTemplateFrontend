import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Pagination } from "@nextui-org/react";
import lodash from 'lodash'
import { useEffect, useState } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

interface AUTableProps {
  items: any[],
  itemClickHandler?: (item: any) => void; // Define type for itemClickHandler
  page?: number;
  pages?: number;
  onChange?: (page: number) => void;
  showPagination?: boolean
}

const AUTable: React.FC<AUTableProps> = ({ ...props }) => {
  const [sortedItems, setSortedItems] = useState(props.items);
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);
  const tableHeaders: string[] = lodash.filter(lodash.map(props.items, lodash.keys)[0] ?? [], (str) => !str.startsWith('_'))
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  const onClickItem = (item: any) => {
    if (props.itemClickHandler) props.itemClickHandler(item)
  }

  useEffect(() => {
    let sorted = [...props.items || []];
    if (sortConfig !== null) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setSortedItems(sorted);
  }, [props.items, sortConfig]);

  const requestSort = (key: string) => {
    // Ignore sorting for "action" and "sharepoint link" columns
    if (key === 'Action' || key === 'SharePoint Link') {
      return;
    }
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (column: string) => {
    if (sortConfig && sortConfig.key === column) {
      return <ChevronUpIcon className={`h-4 w-4 transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} />;
    }
    return null;
  };


  return (
    <div className="flex flex-wrap justify-start">
        <Table isStriped aria-label="Example static collection table"
          bottomContent={props.showPagination ?
            <div className="flex w-full justify-end my-5">
              <Pagination
                isCompact
                showControls
                showShadow
                color="secondary"
                page={props.page || 1}
                total={props.pages || 0}
                onChange={props.onChange}
                className="mr-6"
              />
            </div> : null
          }
          radius="none"
          classNames={{ 'wrapper': "!p-0 w-full overflow-x-auto" }}>
          <TableHeader>
            {tableHeaders && tableHeaders?.length > 0 ? (
              tableHeaders.map((column, key) => (
                <TableColumn key={key} className={`!rounded-none text-app-001 bg-app-009 text-sm w-48 font-[450] cursor-pointer ${String(column) === 'Action' || String(column) === 'SharePoint Link' ? 'cursor-default' : ''}`} onClick={() => requestSort(column)} >
                  <div className="flex items-center">
                    <span>{column}</span>
                    <div className="ml-1 mt-1">{getSortIcon(column)}</div>
                  </div>
                </TableColumn>
              ))
            ) : (
              <TableColumn>No Data to show</TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {sortedItems?.map((row, key) =>
              <TableRow className={`${props?.itemClickHandler && "cursor-pointer"} hover:bg-gray-100`} key={key} onClick={() => onClickItem(row)}>
                {tableHeaders.map((item, key1) => {
                  return <TableCell key={key1}>{row[item]}</TableCell>
                })}
              </TableRow>
            )}
          </TableBody>
        </Table>
        </div>
  );

}
export default AUTable