import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid"
export const sOItems = [
    {
      'User Name':'Julian Davies',
      'Email':'julian.davies@email.com',
      'User Type':'User',
      'Status':<div>
        <div className='bg-[#FFC00066] text-[#AF8811] text-center py-1 rounded w-[150px]'>Invited</div>
      </div>,
      'Action': <div className="flex">
        <PencilSquareIcon className='text-primary mr-2' width={20} height={20} />
        <TrashIcon className='text-primary' width={20} height={20} />
      </div>,
    },
    {
      'User Name':'Michael Williams',
      'Email':'michael@email.com',
      'User Type':'Account Manager',
      'Status':<div>
        <div className='bg-[#59BBB466] text-[#16978E] text-center py-1 rounded w-[150px]'>Active</div>
      </div>,
      'Action': <div className="flex">
        <PencilSquareIcon className='text-primary mr-2' width={20} height={20} />
        <TrashIcon className='text-primary' width={20} height={20} />
      </div>,
    },
    {
      'User Name':'Jhon Smith',
      'Email':'jhon.smith@email.com',
      'User Type':'Admin',
      'Status':<div>
        <div className='bg-[#59BBB466] text-[#16978E] text-center py-1 rounded w-[150px]'>Active</div>
      </div>,
      'Action': <div className="flex">
        <PencilSquareIcon className='text-primary mr-2' width={20} height={20} />
        <TrashIcon className='text-primary' width={20} height={20} />
      </div>,
    },
  ]