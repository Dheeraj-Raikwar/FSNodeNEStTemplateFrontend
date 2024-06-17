export interface ProjectEquipment {
    skip?: number;
    take?: number;
    filter?: any
}

export interface Project {
    projectNumber: string;
    projectName: string;
    customerId: string;
    projectManagerId: string;
    projectDescription: string;
    estimatedstartDate: string;
    origionalStartDate: string;
    estimatedEndDate: string;
    origionalEndDate: string;
    // projectType: string;
    projectStage: string;
    lineofBusiness: string;
    isMultiBusiness: boolean;
    projectHealth: string;
    // allocatedResources: string;
    sharePointLink?: string;
    resourceEcs?: string;
    resourcePcs?: string;
    customerContact?: string;
    currentValue?: number; // Decimal
    origionalValue?: number; // Decimal
    equipmentAllocated?: string;
}


export interface Task {
    taskName: string;
    taskType: string;
    taskStartDate: Date;
    taskEndDate: Date;
    priority: string;
    status: string;
    projectStage: string;
    assignedTo: string;
    projectDescription: string;
    attachSharePointLink: string;
    notes: string;
}