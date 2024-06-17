export interface User {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  userRole:any,
};

export interface Permission {
  resource: string;
  actions: {
    write: boolean;
    read: boolean;
    // Add other action properties if necessary
  };
}
