import { NextPage } from "next";
import AUButton from "@/components/ui/AUButton";
import AUModal from "@/components/ui/AUModal";
import { useContext, useEffect, useState } from "react";
import AUInput from "@/components/ui/AUInput";
import { useForm, useFormContext } from "react-hook-form";
import AUTable from "@/components/ui/AUTable";
import { CheckIcon, PencilIcon } from "@heroicons/react/24/outline";
import { ArrowUturnLeftIcon } from "@heroicons/react/20/solid";
import { EyeDropperIcon, EyeIcon, TrashIcon } from "@heroicons/react/20/solid";
import { editRoleAPI, getRoles, rolesAPI } from "@/api/roles";
import { toast } from 'react-toastify';


import AUDataTable from "@/components/ui/AUDataTable";
import router, { useRouter } from "next/router";
import { AppContext } from "@/utils/state/app";
import Image from "next/image";
import AUAccordion from "@/components/ui/AUAccordion";

const columns = [
	{ header: "Resources", key: "resources", sortable: false },
	{ header: "READ", key: "read", sortable: false },
	{ header: "WRITE", key: "write", sortable: false },
];

interface Props { }

interface Role {
	id?: any,
	name: string,
	alias: string,
	// RoleName: string
	permission?: Permissions[];
	Action?: React.ReactNode
}

interface RolesData {
	resources?: string;
	all: boolean;
	read: boolean;
	write: boolean;
	accessColumns?: any;
	columns?: any;
}

interface Permission {
	resources?: string;
	all: boolean;
	read: boolean;
	write: boolean;
	accessColumns?: any;
}

interface Permissions {
	resources: string;
	action: {
		all: boolean;
		read: boolean;
		write: boolean;
		accessColumns?: any
	}
}
interface RoleTable {
	Name: string,
	Alias: string,
	Permission?: Permission[];
	Action?: React.ReactNode
}

const RolesPage: NextPage<Props> = () => {
	const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
	const userData = AppState.user;
	const permissions = userData && userData.userRole?.[0]?.role?.Permission
	const [rolesdata, setRolesData] = useState<RolesData[]>([
		{ resources: 'Users', all: false, read: false, write: false },
		{ resources: 'Settings', all: false, read: false, write: false },
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<Role>();
	const [initialValues, setInitialValues] = useState<Role>();
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		formState: { errors: editErrors },
		setValue: editSetValue,
		getValues: editGetValues
	} = useForm<Role>({ defaultValues: initialValues });
	const [isCreateRoleClicked, setIsCreateRoleClicked] = useState(false);
	const [roles, setRoles] = useState<RoleTable[]>([]);
	const [buttonChecked, setButtonChecked] = useState<Permission[]>([])
	const [isEditing, setIsEditing] = useState(false);
	const [page, setPage] = useState<number>(1);
	const [pages, setPages] = useState<number>(1);
	const [showPagination, setShowPagination] = useState<boolean>(false);
	const rowsPerPage = 15;
	const router = useRouter()
	const [hasWriteAccess, setHasWriteAccess] = useState<boolean>(false);

	const handleCreateRoleClick = () => {
		reset();
		resetPermission();
		setIsEditing(false);
		setIsCreateRoleClicked(true);
	};

	const resetPermission = () => {
		let updatedPerm = rolesdata.map(role => {
			if (role.columns) {
				role.columns = role.columns.map((c: any) => { return { resources: c.resources, all: false, read: false, write: false } });
			}

			return { ...role, all: false, read: false, write: false };
		});
		setRolesData(updatedPerm)

	}

	// const handleCreatePermissionClick = (selectedPermissions: Permission[]) => {
	// 	setButtonChecked(selectedPermissions);
	// };

	const handleCreatePermissionClick = (resource: string, selectedPermissions: Permission[]) => {
		setButtonChecked(selectedPermissions);
		// Capture selected columns for each resource
		const updatedRolesData = rolesdata.map(role => {
			const selectedRole = selectedPermissions.find(permission => { return resource === role.resources });
			if (selectedRole) {

				return {
					...role,
					accessColumns: role.columns?.filter((column: { read: any; write: any; }) => column.read || column.write) || [],
				};
			} else {
				return {
					...role,
					accessColumns: role.columns ? role.columns.filter((column: { read: any; write: any; }) => column.read || column.write) : [],
				};
			}
		});

		setRolesData(updatedRolesData);

		// Add the following line to ensure selected permissions are set
		setButtonChecked(selectedPermissions);
	};

	const onSubmit = async (data: Role) => {
		try {
			// Construct permissions array
			let permissionData: Permissions[] = rolesdata.map(role => {
				let accessReadColumns = role.accessColumns?.filter((item: any) => item.read).length > 0;
				let accessWriteColumns = role.accessColumns.filter((item: any) => item.write).length > 0;
				if (accessReadColumns || accessWriteColumns) {
					return {
						resources: role.resources || '',
						action: {
							all: accessWriteColumns || false,
							read: accessReadColumns || false,
							write: accessWriteColumns || false,
							accessColumns: role.accessColumns,
						},
					};

				} else {
					return {
						resources: role.resources || '',
						action: {
							all: role.all || false,
							read: role.read || false,
							write: role.write || false,
							accessColumns: role.accessColumns,
						},
					};
				}
			});
			permissionData = permissionData.filter(perm => perm.action.read || perm.action.write)
			// Include permissions in role data
			const rolePerm = { ...data, permission: permissionData };

			// Submit the role data
			const apiResponse = await rolesAPI(rolePerm);
			if (apiResponse.success) {
				getAllRoles();
				setIsCreateRoleClicked(false);
				toast.success("Role created successfully!");
			} else {
				toast.error(apiResponse.message);
			}
		} catch (error) {
			toast.error('Failed to create role. Please try again.');
		}
	};


	const closeModal = () => {
		reset();
		setIsCreateRoleClicked(false);
		setButtonChecked([]);
	};


	const editClick = (item: any) => {
		const { id, name, alias, Permission } = item;
		const selectedPermissions = Permission || [];

		setButtonChecked(selectedPermissions.map((permission: { resources: any; action: { all: any; read: any; write: any; accessColumns: any; }; }) => ({
			resources: permission.resources || '',
			all: permission.action.all || false,
			read: permission.action.read || false,
			write: permission.action.write || false,
			accessColumns: permission.action.accessColumns || []
		})));

		const userObject = { id, name, alias, Permission };

		const updatedRolesData = rolesdata.map(role => {
			const selectedRole = selectedPermissions.find((permission: { resources: string | undefined; }) => permission.resources === role.resources);
			if (role.columns) {
				role.columns = role.columns.map((c: any) => { return { resources: c.resources, all: false, read: false, write: false } });
			}

			if (selectedRole) {
				let updatedColumns: any = []

				selectedRole?.action?.accessColumns?.forEach((d: any) => {
					let index = role.columns.findIndex((data: any) => data.resources == d.resources)

					if (index >= 0) {
						role.columns[index] = d;
					}
				})

				return {
					...role,
					all: selectedRole.action.all,
					read: selectedRole.action.read,
					write: selectedRole.action.write,
				};
			} else {
				// If no selected role found, ensure all columns are unchecked
				const updatedColumns = role.columns?.map((column: any) => ({
					...column,
					checked: false
				}));
				return {
					...role,
					all: false,
					read: false,
					write: false,
					columns: updatedColumns
				};
			}
		});
		setRolesData(updatedRolesData);
		setIsEditing(true);
		setInitialValues(userObject);
		setIsCreateRoleClicked(true);
	};

	const openModal = () => {
		setIsModalOpen(true);
	};

	const getAllRoles = async (filters?: any) => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;
		let permissions: { read: boolean; write: boolean; admin: boolean; };
		// if (!filters) {
		// 	filters = { filter: {}, skip: start, take: end }
		// }
		// else {
		// 	filters = { ...filters, skip: start, take: end }
		// }
		const apiResponse = await getRoles("15", String(start));
		if (apiResponse.success) {
			if (apiResponse.count && apiResponse.count > 15) {
				setShowPagination(true)
			}
			permissions = apiResponse?.permissions;
			let clone = apiResponse.data
			setRoles(clone.map(item => {
				return {
					'Name': item.name,
					'Alias': item.alias,
					...(permissions?.write && {
						'Action': (
							<PencilIcon
								height={15}
								className="cursor-pointer"
								onClick={() => editClick(item)}
								title="Edit"
							/>
						)
					})
				}
			}))
			setHasWriteAccess(permissions?.write)
			setPages(apiResponse.count ? Math.ceil(apiResponse.count / rowsPerPage) : 1);
		}

	};

	const onSubmitEdit = async (data: any) => {
		try {
			const id = initialValues?.id;
			const { permission, ...rest } = data; // Destructure permission from data
			const editedData = { id, ...rest, permission: [] }; // Include permissions in editedData

			// Mapping rolesdata to filter permissions
			let permissionsData: Permissions[] = rolesdata.map(role => {
				let accessReadColumns = role.accessColumns?.filter((item: any) => item.read).length > 0;
				let accessWriteColumns = role.accessColumns.filter((item: any) => item.write).length > 0;
				if (accessReadColumns || accessWriteColumns) {
					return {
						resources: role.resources || '',
						action: {
							all: accessWriteColumns || false,
							read: accessReadColumns || false,
							write: accessWriteColumns || false,
							accessColumns: role.accessColumns,
						},
					};
				} else {
					return {
						resources: role.resources || '',
						action: {
							all: role.all || false,
							read: role.read || false,
							write: role.write || false,
							accessColumns: role.accessColumns,
						},
					};
				}
			});

			// Filtering permissionsData to include only read/write actions
			const filteredPermissionsData = permissionsData.filter(perm => perm.action.read || perm.action.write);
			editedData.permission?.push(...filteredPermissionsData);

			// Merging data with editedData to include permissions
			let rolePerm = { ...data, ...editedData };

			// Editing role with updated data
			const apiResponse = await editRole(id, rolePerm);

			// Checking API response and performing actions accordingly
			if (apiResponse.success) {
				getAllRoles();
				closeModal();
				toast.success('Roles updated successfully');
			} else {
				toast.error(apiResponse.message);
			}
		} catch (error) {
			toast.error('An error occurred while editing user.');
		}
	};

	const editRole = async (id: string, data: Role) => {
		try {
			// Ensure that the data object includes the permission field
			const dataWithPermission = { ...data, permission: data.permission };
			const apiResponse = await editRoleAPI(id, dataWithPermission);
			return apiResponse;
		} catch (error) {
			throw error;
		}
	};

	useEffect(() => {
	}, [buttonChecked])

	useEffect(() => {
		setIsCreateRoleClicked(false)
		setIsEditing(false)
	}, [router])

	useEffect(() => {
		getAllRoles();
	}, [page])


	return (
		<>
			<div>
				<div className="flex flex-wrap justify-between gap-2">
					<div className="flex-item">
						<p className="text-2xl text-app-009 font-bold">Roles</p>
					</div>
					{!isCreateRoleClicked && hasWriteAccess && (
						<AUButton buttontype='default' className="flex-item" onClick={handleCreateRoleClick}>Create Roles</AUButton>
					)}
				</div>
				<div className="flex flex-col w-fill mt-8">
					{
						isCreateRoleClicked ?
							(
								<>
									<div className="flex flex-wrap justify-inline gap-2 mb-2">
										<span className="flex-item cursor-pointer" onClick={() => router.push('/settings/roles')}>
											Back to roles page
										</span>
										<ArrowUturnLeftIcon
											height={15}
											className="cursor-pointer"
											onClick={() => router.push('/settings/roles')}
											title="Go to roles"
										/>

									</div>

									<form onSubmit={handleSubmit((data) => isEditing ? onSubmitEdit({ ...data, permission: buttonChecked }) : onSubmit(data))}>

										<div className="mb-4 flex flex-wrap justify-start gap-2">
											{
												isEditing ? (
													<>
														<div className="mr-10 flex-item w-full">
															<p className="text-2xl text-app-009 font-bold mb-2">Edit Form</p>
														</div>
														<div className="mr-10 flex-item">
															<AUInput label='Role Name' placeholder="Role Name" labelPlacement="outside" kind='primary' defaultValue={initialValues !== undefined ? initialValues.name : ""} register={register('name', { required: 'Role is required' })} />
															{errors.name && <div className="text-xs text-red-500">{errors.name.message}</div>}
														</div>
														<div className="flex-item">
															<AUInput label='Alias' placeholder="Alias Name" labelPlacement="outside" kind='primary' defaultValue={initialValues !== undefined ? initialValues.alias : ""} register={register('alias', { required: 'Alias is required' })} />
															{errors.alias && <div className="text-xs text-red-500">{errors.alias.message}</div>}
														</div>
													</>
												) : (
													<>
														<div className="mr-10 flex-item w-full">
															<p className="text-2xl text-app-009 font-bold mb-2">Create Form</p>
														</div>
														<div className="mr-10 flex-item">
															<AUInput label='Role Name' placeholder="Role Name" labelPlacement="outside" kind='primary' register={register('name', { required: 'Role is required' })} />
															{errors.name && <div className="text-xs text-red-500">{errors.name.message}</div>}
														</div>
														<div className="flex-item">
															<AUInput label='Alias' placeholder="Alias Name" labelPlacement="outside" kind='primary' register={register('alias', { required: 'Alias is required' })} />
															{errors.alias && <div className="text-xs text-red-500">{errors.alias.message}</div>}
														</div>
													</>
												)
											}
										</div>
										{/* Table for module permissions */}
										<div className="flex flex-col">
											<div className="mb-5">
												<p className="text-2xl text-app-009 font-bold">Permissions</p>
											</div>

											<div>
												<AUAccordion variantType="light" items={[
													{
														title: 'Users', content: <AUDataTable
															items={rolesdata.filter(item => item.resources === 'Users')}
															columns={columns}
															itemClickHandler={false}
															itemCellClickHandler={(selectedPermissions: Permission[]) => handleCreatePermissionClick('Users', selectedPermissions)}
														/>
													},
													{
														title: 'Settings', content: <AUDataTable
															items={rolesdata.filter(item => item.resources === 'Settings')}
															columns={columns}
															itemClickHandler={false}
															itemCellClickHandler={(selectedPermissions: Permission[]) => handleCreatePermissionClick('Settings', selectedPermissions)}
														/>
													}
												]}>
												</AUAccordion>
											</div>
										</div>
										<div className="flex justify-end mt-4 mb-2">
											{isEditing ? (
												<>
													<div className="mr-4">
														<AUButton buttontype="danger" onClick={closeModal}>
															Cancel
														</AUButton>
													</div>
													<div>
														<AUButton buttontype="default" type="submit">
															Save
														</AUButton>
													</div>
												</>

											) : (
												<>
													<div className="mr-4">
														<AUButton buttontype="danger" onClick={closeModal}>
															Cancel
														</AUButton>
													</div>
													<div>
														<AUButton buttontype="default" type="submit">
															Create
														</AUButton>
													</div>
												</>
											)}
										</div>
									</form>
								</>
							) : (
								<>
									<div className="flex flex-col w-fill">
										<AUTable page={page} pages={pages} items={roles} showPagination={showPagination} onChange={(page) => setPage(page)} />
									</div>
								</>
							)
					}
				</div>
			</div>
		</>
	);
};

export default RolesPage;
