import { GetServerSideProps, NextPage } from "next";
import Link from 'next/link';
import AUButton from "@/components/ui/AUButton";
import AUModal from "@/components/ui/AUModal";
import { ChangeEvent, useContext, useEffect, useMemo, useState } from "react";
import AUInput from "@/components/ui/AUInput";
import AUSelect from "@/components/ui/AUSelect";
import { useForm } from "react-hook-form";
import AUTable from "@/components/ui/AUTable";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { createUserAPI, deleteUserAPI, editUserAPI, getRolesAPI, getUsersAPI } from "@/api/Users";
import { toast } from "react-toastify";
import { AppContext } from "@/utils/state/app";
import { workTypeOptions, statusOptions, subContractorOptions } from "@/constants/enum";
import { UserCreateEdit, filterInter } from "@/constants/types/type";
interface Props {
	users: any
}

interface Permission {
	resources: string;
	action: {
		all: boolean;
		read: boolean;
		write: boolean;
	};
}

const UsersPage: NextPage<Props> = (props) => {
	const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
	const userData = AppState.user;
	const permissions = userData && userData.userRole?.[0]?.role?.Permission
	const { register, handleSubmit, formState: { errors }, reset: resetCreate, setValue, setError, getValues, trigger } = useForm<UserCreateEdit>();
	const [isModalOpen, setIsModalOpen] = useState(false);
	// State to manage initial values for editing
	const {
		register: registerEdit,
		handleSubmit: handleEditSubmit,
		formState: { errors: editErrors },
		setValue: setEditValue,
		getValues: getEditValues,
		reset: resetEdit
	} = useForm<UserCreateEdit>({ defaultValues: undefined });
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [getRole, setRole] = useState<any>([]);
	const [roleOptions, setroleOptions] = useState<any>([]);
	const [filter, setFilter] = useState<filterInter>({ sortField: "firstName", search: '', filter: { workType: '', status: '', isSubContractor: '' } });
	const [page, setPage] = useState<number>(1);
	const [pages, setPages] = useState<number>();
	const [userListing, setUserListing] = useState<any[]>([]);
	const [hasWriteAccess, setHasWriteAccess] = useState<boolean>(false);
	const [showPagination, setShowPagination] = useState<boolean>(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isDeleteFinalModalOpen, setIsDeleteFinalModalOpen] = useState(false);
	const [closeConfirmModal, setcloseConfirmModal] = useState(false);
	const [closeConfirmFinalModal, setcloseConfirmFinalModal] = useState(false);
	const [deleteResponse, setDeleteResponse] = useState<any>(null);
	const [userId, setUserId] = useState<any>(null);
	const rowsPerPage = 15;

	// Inital loading
	const getAllUsers = async (filters?: any) => {
		const start = (page - 1) * rowsPerPage;
		const end = rowsPerPage;
		let permissions: { read: boolean; write: boolean; admin: boolean; };
		if (!filters) {
			filters = { filter: {}, skip: start, take: end }
		}
		else {
			filters = { ...filters, skip: start, take: end }
		}
		const apiResponse = await getUsersAPI(filters);
		if (apiResponse.success == true) {
			if (apiResponse && apiResponse?.count && apiResponse?.count > 15) {
				setShowPagination(true)
			}
			permissions = apiResponse?.permissions;
			const user = apiResponse.data.map((user: any, index: any) => ({
				"First Name": user.firstName,
				"Last Name": user.lastName,
				"Email": user.email,
				"Role": user.userRole.map((role: any) => { return (role.role.name) }).join(', '), // Assuming you want to set it as "Engineer" for all users
				"Status": user.status,
				...(permissions?.write && {
					'Action': (
						<div className="flex flex-wrap justify-start">
						<PencilIcon
							height={15}
							className="flex-item cursor-pointer ml-1 mr-1"
							onClick={() => openEditModal(user)}
							title="Edit"
						/>
						<TrashIcon
							height={15}
							className="flex-item cursor-pointer ml-1 mr-1"
							onClick={() => {setUserId(user?.id); setIsDeleteModalOpen(true)}}
							title="Delete"
						/>
						</div>
					)
				})
			}));
			setHasWriteAccess(permissions?.write)
			setPages(apiResponse.count ? Math.ceil(apiResponse.count / rowsPerPage) : 1);
			setUserListing(user);
		}
	};

	const getAllRoles = async () => {
		const apiResponse = await getRolesAPI();
		if (apiResponse.success == true) {
			setRole(apiResponse.data);
		}
	};

	useEffect(() => {
		getAllUsers();
		getAllRoles();
	}, [page]);

	useEffect(() => {
		setroleOptions(getRole.map((role: any) => ({ label: role.name, value: role.name, id: role.id })));
	}, [getRole]);


	// Modal functions
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		resetCreate();
		setIsModalOpen(false);
	};

	const onCreateSubmit = (data: UserCreateEdit) => {
		const { firstName, lastName, email, workType, role, status, isSubContractor } = data;
		const selectedIsSubcontractor = subContractorOptions.find(option => option.id === Number(isSubContractor))?.value;
		const userObject = { firstName, lastName, email, isSubContractor: selectedIsSubcontractor, workType: workTypeOptions.find((option => option.id === Number(workType)))?.value, role: typeof role === 'string' ? role.split(',') : role, status: statusOptions.find((option => option.id === Number(status)))?.value };
		createUser(userObject);
	};

	const openEditModal = (user: any) => {
		// Destructure the original object and assign the properties to a new object
		const { id, firstName, lastName, email, workType, userRole, status, isSubContractor } = user;
		// Create a new object with the destructured properties
		const userObject = { id, firstName, lastName, email, isSubContractor: String(subContractorOptions.find((option => option.value === isSubContractor))?.id), workType: String(workTypeOptions.find((option => option.value === workType))?.id), role: userRole.map((role: any) => role.role.id), status: String(statusOptions.find((option => option.value === status))?.id) };
		setIsEditModalOpen(true);
		resetEdit(userObject);
	};

	const closeEditModal = () => {
		setIsEditModalOpen(false);
	};

	const onEditSubmit = (data: any) => {
		const { id, firstName, lastName, email, workType, role, status, isSubContractor } = data;
		const editUserObj = { firstName, lastName, email, workType: workTypeOptions.find((option => option.id == workType))?.value, role: typeof role === 'string' ? role.split(',') : role, status: statusOptions.find((option => option.id == status))?.value, isSubContractor: subContractorOptions.find((option => option.id === Number(isSubContractor)))?.value }
		editUser(id, editUserObj);
	};

	const closeDeleteModal = () => {
		setcloseConfirmModal(true)
		setIsDeleteModalOpen(false)
	};

	const closeDeleteFinalModal = () => {
		setcloseConfirmFinalModal(true)
		setIsDeleteFinalModalOpen(false)
	};

	const onFilterSubmit = () => {
		const { sortField, search } = filter;
		const filterObject = { sortField, search, filter: { workType: workTypeOptions.find((option => option.id == Number(filter.filter.workType)))?.value, status: statusOptions.find((option => option.id == Number(filter.filter.status)))?.value, isSubContractor: subContractorOptions.find((option => option.id == Number(filter.filter.isSubContractor)))?.value } }
		getAllUsers(filterObject);
	};

	const onFilterRemove = () => {
		let filterObject: filterInter = { sortField: "firstName", search: '', filter: { workType: '', status: '', isSubContractor: '' } };
		getAllUsers(filterObject);
		setFilter(prevFilter => ({
			...prevFilter,
			search: '',
			filter: {
				workType: '0',
				status: '0',
				isSubContractor: '0'
			}
		}));
	};

	// Handlers
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setEditValue(name as keyof UserCreateEdit, value);
	};

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		setEditValue(name as keyof UserCreateEdit, value);
	};

	// Handlers
	const handleFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const lowercaseName = name.toLowerCase();
		setFilter(prevFilter => ({
			...prevFilter,
			[lowercaseName]: value
		}));
	};

	const handleFilterSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const { name, value } = event.target;
		setFilter(prevFilter => ({
			...prevFilter,
			filter: {
				...prevFilter.filter,
				[name]: value
			}
		}));
	};

	// API calls
	const createUser = async (data: any) => {
		const apiResponse = await createUserAPI(data);
		if (apiResponse.success == true) {
			getAllUsers();
			closeModal();
			toast.success("User created successfully.");
		}
		if (apiResponse.success == false) {
			toast.error(apiResponse.message);
		}
	};

	const editUser = async (id: string, data: any) => {
		const apiResponse = await editUserAPI(id, data);
		if (apiResponse.success == true) {
			getAllUsers();
			closeEditModal();
			toast.success("User updated successfully.");
		}
		if (apiResponse.success == false) {
			toast.error(apiResponse.message);
		}
	};

	const handleDeleteSubmit = async () => {
		const response = await deleteUserAPI(userId);
		if (response?.success === true) {
			setIsDeleteModalOpen(false)
			setIsDeleteFinalModalOpen(false)
			toast.success("User deleted successfully");
			getAllUsers();
		} else {
			setIsDeleteModalOpen(false)
			setIsDeleteFinalModalOpen(true);
			toast.error(response?.message);
		}
	};

	const validateLink = (value: string | undefined) => !value || /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) || "Invalid Email";
	const validateLinkError = (value: string | undefined) => {
		const email = value ? /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) : true;
		if (!email) {
			setError('email', { message: "Invalid Email" });
		}
		else if (value === "null" || value === "") {
			setError('email', { message: "Email is required" });
		} else {
			setError('email', { message: "" });
		}
	}
	return (
		<>
			<div className="mb-5">
				<div className="flex flex-wrap justify-between gap-2">
					<div className="flex-item">
						<p className="text-2xl text-app-009 font-bold">Users</p>
					</div>
					{hasWriteAccess &&
						<AUButton buttontype='default' className="flex-item" onClick={openModal}>Create User</AUButton>
					}
				</div>
				<div className="flex flex-wrap justify-start gap-2 mt-8 mb-5">
					<div className="flex-item">
						<AUInput placeholder="Search Name" labelPlacement="outside" kind='primary' className="mr-4 max-w-[200px]" id="search" value={filter.search} name="search" onChange={handleFilterInputChange} />
					</div>
					<div className="flex-item w-60 mr-4">
						<AUSelect size="md" placeholder="Select Status" labelPlacement="outside" name="status" items={statusOptions} selectedKeys={filter.filter.status} id="status" value={filter.filter.status} onChange={handleFilterSelectChange} />
					</div>
					<div className="flex-item">
						<Image src="/images/AuraFilter.svg" alt="Apply Filter" className="cursor-pointer" width={30} height={30} onClick={onFilterSubmit}></Image>
					</div>
					<div className="flex-item">
						<Image src="/images/RemoveFilter.svg" alt="Clear Filter" className="cursor-pointer" width={30} height={30} onClick={onFilterRemove} ></Image>
					</div>
				</div>

				<div>
					{/* <p>User Listing Table</p> */}
							<AUTable page={page} pages={pages} items={userListing} showPagination={showPagination} onChange={(page) => setPage(page)} />
				</div>
			</div>
			{/* Create User Modal */}
			<AUModal title="Create User" open={isModalOpen} onClose={closeModal} size="xl" scrollable="inside">
				{/* Modal Content */}
				<form onSubmit={handleSubmit(onCreateSubmit)}>
					<div className="grid grid-cols-2 gap-6">
						<div>
							<AUInput label='First Name' placeholder="First Name" labelPlacement="outside" kind='primary' register={register('firstName', { required: 'First Name is required' })} />
							{errors.firstName && <div className="text-xs text-red-500">{errors.firstName.message}</div>}
						</div>
						<div>
							<AUInput label='Last Name' placeholder="Last Name" labelPlacement="outside" kind='primary' register={register('lastName', { required: 'Last Name is required' })} />
							{errors.lastName && <div className="text-xs text-red-500">{errors.lastName.message}</div>}
						</div>

						<div>
							<AUInput label='Email' placeholder="Email" labelPlacement="outside" kind='primary'
								register={register('email', { validate: validateLink })} onChange={(event) => { validateLinkError(event.target.value); }}
							/>
							{errors.email && <div className="text-xs text-red-500">{errors.email.message}</div>}
						</div>
						<div>
							<AUSelect label='Role' size="sm" placeholder="Select Role" labelPlacement="outside" items={roleOptions} register={register('role', { required: 'Role is required' })} onChange={(event: ChangeEvent<HTMLSelectElement>) => { setValue('role' as keyof UserCreateEdit, event.target.value); trigger('role') }} />
							{errors.role && <div className="text-xs text-red-500">{errors.role.message}</div>}
							{/* {getValues('role')?.length < 1 && <div className="text-xs text-red-500">Role is required</div>} */}
						</div>
						<div>
							<AUSelect label='Status' size="sm" placeholder="Select Status" labelPlacement="outside" items={statusOptions} register={register('status', { required: 'Status is required' })} onChange={(event: ChangeEvent<HTMLSelectElement>) => { setValue('status' as keyof UserCreateEdit, event.target.value); trigger('status') }} />
							{errors.status && <div className="text-xs text-red-500">{errors.status.message}</div>}
						</div>
					</div>
					<div className="flex justify-end mt-4 mb-2">
						<div className="mr-4">
							<AUButton buttontype="danger" onClick={closeModal}>Cancel</AUButton>
						</div>
						<div>
							<AUButton buttontype="default" type="submit">Create</AUButton>
						</div>
					</div>
				</form>
			</AUModal>

			{/* Edit user modal */}
			<AUModal title="Edit User" open={isEditModalOpen} onClose={closeEditModal} size="xl" >
				{/* Modal Content */}
				<form onSubmit={handleEditSubmit(onEditSubmit)}>
					<div className="grid grid-cols-2 gap-6">
						<div>
							<AUInput label='First Name' placeholder="First Name" labelPlacement="outside" kind='primary' defaultValue={getEditValues('firstName')}  {...register('firstName', { required: 'First Name is required' })} onChange={handleInputChange} name="firstName" />
							{editErrors.firstName && <div className="text-xs text-red-500">{editErrors.firstName.message}</div>}
						</div>
						<div>
							<AUInput label='Last Name' placeholder="Last Name" labelPlacement="outside" kind='primary' defaultValue={getEditValues('lastName')} {...register('lastName', { required: 'Last Name is required' })} onChange={handleInputChange} name="lastName" />
							{editErrors.lastName && <div className="text-xs text-red-500">{editErrors.lastName.message}</div>}
						</div>
						<div>
							<AUInput label='Email' type="email" placeholder="Email" disabled={true} labelPlacement="outside" kind='primary' defaultValue={getEditValues('email')} {...register('email', { required: 'Email is required' })} onChange={handleInputChange} name="email" />
							{editErrors.email && <div className="text-xs text-red-500">{editErrors.email.message}</div>}
						</div>
						<div>
							<AUSelect label='Role' size="sm" placeholder="Select Role" labelPlacement="outside" items={roleOptions} defaultSelectedKeys={getEditValues('role')} register={registerEdit('role', { required: 'Role is required' })} onChange={handleSelectChange} name="role" />
							{getEditValues('role')?.length < 1 && <div className="text-xs text-red-500">Role is required</div>}
						</div>
						<div>
							<AUSelect label='Status' size="sm" placeholder="Select Status" labelPlacement="outside" items={statusOptions} defaultSelectedKeys={`${getEditValues('status')}`} register={registerEdit('status', { required: 'Status is required' })} onChange={handleSelectChange} name="status" />
							{editErrors.status && <div className="text-xs text-red-500">{editErrors.status.message}</div>}
						</div>
					</div>
					<div className="flex justify-end mt-4 mb-2">
						<div className="mr-4">
							<AUButton buttontype="danger" onClick={closeEditModal}>Cancel</AUButton>
						</div>
						<div>
							<AUButton buttontype="default" type="submit">Submit</AUButton>
						</div>
					</div>
				</form>
			</AUModal>
			<>
				<AUModal title="Delete User" open={isDeleteModalOpen} onClose={closeConfirmModal} size="md" >
					{/* Modal Content */}
					{/* <form onSubmit={handleDeleteSubmit}> */}
					<div className="grid grid-cols-1 gap-1">
						<p>Are you sure do you want to delete this user?</p>
					</div>
					<div className="flex justify-end mt-4 mb-2">
						<div className="mr-4">
							<AUButton buttontype="danger" onClick={closeDeleteModal}>Cancel</AUButton>
						</div>
						<div>
							<AUButton buttontype="default" onClick={handleDeleteSubmit}>Yes</AUButton>
						</div>
					</div>
					{/* </form> */}
				</AUModal>
			</>
		</>
	);
};

export default UsersPage;