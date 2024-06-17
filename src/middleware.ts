import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const noAuthUrl = ['/login', '/reset-password'];
  const userDataCookie = request.cookies.get('user')?.value;
  const isCookiePresent = request.cookies.get('token');
  if (userDataCookie) {
    const userData = JSON.parse(userDataCookie);

    const permissions = userData.userRole?.[0]?.role?.Permission
      ?.map((permission: { resources: string, action: { [key: string]: boolean } }) => ({
        resource: permission.resources,
        actions: permission.action,
      })) || [];
    // Filter permissions based on conditions
    const filteredPermissions = permissions.filter((permission: { resource: any; actions: { read: any; all: any; write: any }; }) =>
      permission.resource && // Check if resource has any value
      (permission.actions.read || permission.actions.all || permission.actions.write) // Check if read or all is true
    );
    const resourceNames = filteredPermissions.map((permission: { resource: any; }) => permission.resource.toLowerCase());
    // Find the index of 'settings' in the array
    const index = resourceNames.indexOf('settings');

    // If 'settings' is found, replace it with 'settings/roles'
    if (index !== -1) {
      resourceNames[index] = 'settings/roles';
    }

    // Project Role Based Access
    const projectindex = resourceNames.indexOf('projects');
    let projectPermission: any;
    if (projectindex !== -1) {
      let filterProjectPerm = permissions.filter((perm: { resource: any; actions: { read: any; all: any; write: any } }) => perm.resource == 'Projects');
      if (filterProjectPerm != undefined && filterProjectPerm != null && filterProjectPerm.length > 0) {
        projectPermission = filterProjectPerm[0].actions;
        if (projectPermission.write == true) {
          resourceNames.push('projects/create');
          resourceNames.push('projects/detail');
        } else if (projectPermission.read) {
          let createIndex = resourceNames.indexOf('projects/create');
          if (createIndex != -1) {
            resourceNames.splice(createIndex)
          }
          resourceNames.push('projects/detail');
        }
      }
    }

    // Check if the requested route is present in the user's permissions
    const requestedRoute = request.nextUrl.pathname.replace(/^\//, ''); // Remove leading slash

    if (!resourceNames.includes(requestedRoute)) {
      // If the requested route is not present in the user's permissions, return unauthorized access
      return NextResponse.error();
    }
  }

  if (noAuthUrl.includes(request.nextUrl.pathname)) {
    if (isCookiePresent) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
  if (!isCookiePresent) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();

}

// match file paths to avoid middleware for static images and files
export const config = { matcher: "/((?!.*\\.).*)" };