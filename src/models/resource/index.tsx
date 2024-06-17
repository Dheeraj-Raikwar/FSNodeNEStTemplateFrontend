export interface Resource {
    allocationUsed?: number;
    assignedTo: (number | undefined)[];
    endDate: string;
    endDateHalfDay: string | undefined;
    notes?: string | undefined
    projectId: string;
    salesOrders: (number | undefined)[];
    startDate: string;
    startDateHalfDay: string | undefined;
    workType: string | undefined;
}


export interface Leave {
    assignedTo: (number | undefined)[];
    endDate: string;
    endDateHalfDay: string | undefined;
    notes?: string;
    projectId: string;
    startDate: string;
    startDateHalfDay: string | undefined;
}

// projectId: string,
// salesorders: [],
// startDate: string,
// startTime: string,
// endDate: string,
// endTime: string,
// WorkType: string,
// allocationUsed: number,
// assignedTo: string[]
export interface AllocationUsed {
    projectNumber: string | number[];
    workType: string | undefined;
}
