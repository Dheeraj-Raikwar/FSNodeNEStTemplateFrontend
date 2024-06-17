// enums.ts

export type Option = { label: string; value: string; id: number };

export enum WorkType {
  SelectWorkType = "",
  projectManager = "Project Manager",
  AdminInternal = "Admin/Internal",
  Rackbuild = "Rackbuild",
  Engineer = "Engineering",
  Programming = "Programming",
  CADDesigner = "CAD",
  Commissioning = "Commissioning"
}


export enum ResourceWorkType {
  SelectWorkType = "",
  Rackbuild = "Rackbuild",
  Engineer = "Engineering",
  Programming = "Programming",
  Commissioning='Commissioning',
  CADDesigner = "CAD",
}


export enum Status {
  SelectStatus = "",
  Active = "Active",
  Inactive = "Inactive"
}

export enum Subcontractor {
  SelectSubcontractor = "",
  Yes = 'Yes',
  No = 'No'
}

export enum TaskStatus {
  SelectStatus = "",
  NotStarted = "Not Started",
  InProgress = "In Progress",
  WaitingOnCustomer = "Waiting On Customer",
  WaitingOnExternalSource = "Waiting On External Source",
  Closed = "Closed",
  Completed = "Completed",
  ColsedNotCompleted = "Closed Not Completed"
}

export enum Priority {
  SelectPriority = "",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum LineOfBusiness {
  SelectLineOfBusiness = "",
  AV_Digital = "Av/Digital",
  MPS = "MPS",
}

export enum MultiBusiness {
  SelectMultiBusiness = "",
  Yes = "Yes",
  No = "No",
}


export enum ProjectHealth {
  SelectProjectHealth = "",
  NotStarted = "Not Started",
  OnTrack = "On-Track",
  AtRisk = "At-risk",
  Delayed = "Delayed",
  Completed = "Completed"
}

export enum ProjectType {
  SelectProjectType = "",
  AV_Digital = "AV/Digital",
  MPS = "MPS",
}

export enum ProjectStage {
  SelectProjectStage = "",
  Kickoff = "Kickoff",
  Scope = "Scope",
  Mobilise = "Mobilise",
  Install = "Install",
  Test = "Test",
  GoLive = "GoLive",
}

export const workTypeOptions: Option[] = [
  { label: 'Select User Work Type', value: WorkType.SelectWorkType, id: 0 },
  { label: 'Project Manager', value: WorkType.projectManager, id: 1 },
  { label: 'Admin/Internal', value: WorkType.AdminInternal, id: 2 },
  { label: 'Engineering', value: WorkType.Engineer, id: 3 },
  { label: 'Rackbuild', value: WorkType.Rackbuild, id: 4 },
  { label: 'Commissioning', value: WorkType.Commissioning, id: 5 },
  { label: 'Programming', value: WorkType.Programming, id: 6 },
  { label: 'CAD', value: WorkType.CADDesigner, id: 7 }
];

export const resourceWorkTypeOptions: Option[] = [
  { label: 'Select Booking Work Type', value: ResourceWorkType.SelectWorkType, id: 0 },
  { label: 'Rackbuild', value: ResourceWorkType.Rackbuild, id: 1 },
  { label: 'Engineering', value: ResourceWorkType.Engineer, id: 2 },
  { label: 'Programming', value: ResourceWorkType.Programming, id: 3 },
  { label: 'CAD', value: ResourceWorkType.CADDesigner, id: 4 },
  { label: 'Commissioning', value: ResourceWorkType.Commissioning, id: 5 }
];

export const statusOptions: Option[] = [
  { label: 'Select Status', value: Status.SelectStatus, id: 0 },
  { label: 'Active', value: Status.Active, id: 1 },
  { label: 'Inactive', value: Status.Inactive, id: 2 }
];

export const subContractorOptions: Option[] = [
	{ label: 'Select One', value: Subcontractor.SelectSubcontractor, id: 0 },
	{ label: 'Yes', value: Subcontractor.Yes, id: 1 },
	{ label: 'No', value: Subcontractor.No, id: 2 }
]

export const timeOptions = [
  { label: 'AM', value: "AM", id: 1 },
  { label: 'PM', value: 'PM', id: 2 },
]

export const projectStageOptions = [
  { label: 'Select Project Stage', value: '', id: 0 },
  { label: 'Kickoff', value: 'Kickoff', id: 1 },
  { label: 'Scope', value: 'Scope', id: 2 },
  { label: 'Mobilise', value: 'Mobilise', id: 3 },
  { label: 'Install', value: 'Install', id: 4 },
  { label: 'Test', value: 'Test', id: 5 },
  { label: 'Go-Live', value: 'Go-Live', id: 6 },
]

export const ProjectStatusOptions: Option[] = [
  { label: 'Select Status', value: TaskStatus.SelectStatus, id: 0 },
  { label: 'Not Started', value: TaskStatus.NotStarted, id: 1 },
  { label: 'In Progress', value: TaskStatus.InProgress, id: 2 },
  { label: 'Waiting On Customer', value: TaskStatus.WaitingOnCustomer, id: 3 },
  { label: 'Waiting On External Source', value: TaskStatus.WaitingOnExternalSource, id: 4 },
  { label: 'Closed', value: TaskStatus.Closed, id: 5 },
  { label: 'Completed', value: TaskStatus.Completed, id: 6 },
  { label: 'Closed Not Completed', value: TaskStatus.ColsedNotCompleted, id: 7 }
];

export const PriorityOptions: Option[] = [
  { label: 'Select Priority', value: Priority.SelectPriority, id: 0 },
  { label: 'High', value: Priority.High, id: 1 },
  { label: 'Medium', value: Priority.Medium, id: 2 },
  { label: 'Low', value: Priority.Low, id: 3 },
];

export const LineOfBusinessOptions: Option[] = [
  { label: 'Select Line of Business', value: LineOfBusiness.SelectLineOfBusiness, id: 0 },
  { label: 'AV/Digital', value: LineOfBusiness.AV_Digital, id: 1 },
  { label: 'MPS', value: LineOfBusiness.MPS, id: 2 },
];

export const MultiBusinessOptions: Option[] = [
  { label: 'Select Is Multi Business', value: MultiBusiness.SelectMultiBusiness, id: 0 },
  { label: 'Yes', value: MultiBusiness.Yes, id: 1 },
  { label: 'No', value: MultiBusiness.No, id: 2 },
];

export const ProjectHealthOptions: Option[] = [
  { label: 'Select Project Health', value: ProjectHealth.SelectProjectHealth, id: 0 },
  { label: 'Not Started', value: ProjectHealth.NotStarted, id: 1 },
  { label: 'On-track', value: ProjectHealth.OnTrack, id: 2 },
  { label: 'At-risk', value: ProjectHealth.AtRisk, id: 3 },
  { label: 'Delayed', value: ProjectHealth.Delayed, id: 4 },
  { label: 'Completed', value: ProjectHealth.Completed, id: 5 },
];

export const ProjectTypeOptions: Option[] = [
  { label: 'Select Is Multi Business', value: ProjectType.SelectProjectType, id: 0 },
  { label: 'AV/Digital', value: ProjectType.AV_Digital, id: 1 },
  { label: 'MPS', value: ProjectType.MPS, id: 2 },
];
