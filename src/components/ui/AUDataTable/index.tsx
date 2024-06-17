import { EyeIcon, PencilIcon } from "@heroicons/react/20/solid";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button, Checkbox} from "@nextui-org/react";
import { isArray } from "lodash";
import { useCallback } from "react";

interface AUTableProps {
    items: any[],
    columns: any[],
    itemClickHandler?: any,
    itemCellClickHandler?: any,
    itemActionHandle?: any
}

const AUDataTable: React.FC<AUTableProps> = ({ ...props }) => {

    // Setting Table header
    const tableHeaders =  props.columns;
    

    const onClickItem = (item: any) =>{
      if(props.itemClickHandler) props.itemClickHandler(item)
    }

    const onchangeValue = (columnKey: any, e: any,item: any) =>{
      item[columnKey]= e.target.checked;
      let allData = props.items; 
      allData.map(element => {
        if(element.module == item.module){
          element = item;
          return element;
        } else{
          return element;
        }
      }); 
      return  props.itemCellClickHandler(allData)
    }
    
  
  // Create Dynamic tablecell creation
  const renderCell = useCallback(
    (columnKey: string, item: any) => {
      if (columnKey === "actions") {
        return (
          <TableCell>
            <div className="flex gap-4 items-center justify-end">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="default"
                aria-label="Edit"
                className="rounded-full"
                onPress={() => {
                  props.itemActionHandle(item);
                }}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button
                isIconOnly
                variant="light"
                color="default"
                size="sm"
                aria-label="View"
                className="rounded-full"
                onPress={() => {
                  props.itemActionHandle(item);
                }}
              >
                <EyeIcon className="h-4 w-4" />
              </Button>
            </div>
          </TableCell>
        );
      } else if (columnKey === "all"||columnKey === "read"||columnKey === "write") {
                
        return <TableCell><Checkbox key={columnKey} value={(item as any)[columnKey]} defaultSelected={(item as any)[columnKey]} onChange={(e)=>onchangeValue(columnKey,e,item)}/> </TableCell>;
      } else {        
        return <TableCell>{(item as any)[columnKey]}</TableCell>;
      }
    },
    [],
  );
  
    return (

    <Table aria-label="Example table with dynamic content" radius="none" classNames={{'wrapper':"!p-0"}}>
      <TableHeader columns={tableHeaders}>      
        {
          tableHeaders && tableHeaders.length > 0 ? (column) => {
            if (column?.key === "actions") {
              return (
                <TableColumn 
                  allowsSorting={column.sortable}
                  key={column.key}
                  className="text-end pr-16"
                >
                  {column.header}
                </TableColumn>
              );
            } else{
              
              return (
                <TableColumn allowsSorting={column.sortable} key={column.key} className='!rounded-none text-app-001 bg-app-009 text-sm w-48'>
                  {column.header}
                </TableColumn>
              );
            }
          }:<TableColumn>No Data to show</TableColumn>
        }
      </TableHeader>
      {
        props.items.length ? (
          <TableBody items={props.items}>
            {(item) => {
              return (
                <TableRow key={item}>
                  {(columnKey) => {
                    return renderCell(columnKey as string, item);
                  }}
                </TableRow>
              );
            }}
          </TableBody>
          ) : 
          (<TableBody emptyContent={"No rows to display."}>{[]}</TableBody>)
      }
    </Table>
    );

}
export default AUDataTable