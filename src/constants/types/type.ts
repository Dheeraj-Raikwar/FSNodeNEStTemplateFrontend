import { MultiValue } from "react-select";

export interface Option {
  id?: number;
  value: string;
  label: string;
}

export type OptionType = {
  id?: number;
  value: string;
  label: string;
};

export interface ResourceBooking {
  id?: number
  projectId: string | number[];
  salesorders: MultiValue<Option>;
  startDate: string;
  startDateHalfDay: string;
  endDate: string
  endDateHalfDay: string;
  workType: string;
  allocatedResources?: number;
  bookedResources?: number;
  notes?: string;
  assignedTo: MultiValue<Option>
}

export interface LeaveBooking {
  id?: number
  projectId: string | number[];
  startDate: string;
  startDateHalfDay: string;
  endDate: string
  endDateHalfDay: string;
  notes?: string;
  assignedTo: MultiValue<Option>
}
export interface UserCreateEdit {
  id?: string
  firstName: string
  lastName: string
  email: string
  workType: number | undefined | string
  role: string | number[]
  status: number | undefined | string
  isSubContractor: number | undefined | string
}

export interface filterInter {
  sortField: string
  search: string,
  filter: {
    workType: string
    status: string
    isSubContractor: string
  }
}

export interface ProjectCreateEdit {
  id?: string
  projectNumber: string
  projectName: string
  customerName: Option
  estStartDate: string
  originalStartDate: string
  estCompletionDate: string
  originalCompletionDate: string
  projectManager: string
  resourceEcs?: string
  resourcePcs?: string
  customerContact?: string
  lineofBusiness: string
  isMultiBusiness: string
  projectHealth: string
  // projectType: string
  projectStage: string
  attachSharePointLink: string
  projectDescription: string
  currentValue?: string
  origionalValue?: string
  equipmentAllocated?: string
}

export interface TaskCreateEdit {
  id?: string
  projectId: string | number[];
  taskName: string
  taskType: string
  priority: string
  taskStartDate: string
  taskEndDate: string
  status: string
  projectStage: string
  assignedTo: MultiValue<Option>
  sharePointLink: string
  description: string
  notes: string
}

export interface ResourceBookingFilter {
  isActive: boolean,
  filter: {
    lineofBusiness?: string
    customer?: any
    project?: string
    projectManager?: string
    salesOrders?: string[]
    projectStage?: string
    engineer?: string[]
    userWorkType?: string
    bookingWorkType?: string
  }
}
export interface ProjectFilter {
  isActive: boolean,
  filter: {
    projectName?: string
    customerName?: any
    project?: string
    projectManager?: string
    projectHealth?: string
    projectStage?: string
    lineofBusiness?: string
    bookingWorkType?: string
    fromDate?: string 
    toDate?: string
  }
}
