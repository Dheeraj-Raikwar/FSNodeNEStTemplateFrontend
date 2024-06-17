import React, { ReactElement, ReactNode, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { AppContext } from '@/utils/state/app';
import { HomeIcon, ShoppingCartIcon, UserPlusIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useMsal } from '@azure/msal-react';
// import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { toast } from 'react-toastify';
// import for nav bar
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Avatar } from "@nextui-org/react";

interface MainLayoutProps {
	children: ReactNode;
}
interface Permission {
	resources: string;
	actions: {
		all: boolean;
		read: boolean;
		write: boolean;
	};
}

function MainLayout({ children }: MainLayoutProps): ReactElement {

	const router = useRouter()
	const [showSubMenu, setShowSubMenu] = useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { state: AppState, dispatch: AppDispatch } = useContext(AppContext);
	const { instance, accounts } = useMsal();
	// const [loading, setLoading] = useState(true); // State to track loading state
	const [userPermissions, setUserPermissions] = useState<string[]>([]);
	const [refreshDropdown, setRefreshDropdown] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		fetchUserPermissions();
	}, [AppState.user]);

	useEffect(() => {
		hasPermission('home')

	}, [userPermissions])

	// Function to fetch user permissions
	const fetchUserPermissions = async () => {
		try {
			AppDispatch({ type: "SET_LOADING_TRUE" });
			// Check if user data is available
			if (AppState.user) {
				const permissions = AppState.user.userRole[0]?.role.Permission
					.map((permission: { resources: string, action: { [key: string]: boolean } }) => ({
						resource: permission.resources,
						actions: permission.action,
					})) || [];
				// Filter permissions based on conditions
				const filteredPermissions = permissions.filter((permission: { resource: any; actions: { read: any; all: any; write: any }; }) =>
					permission.resource && // Check if resource has any value
					(permission.actions.read || permission.actions.all || permission.actions.write) // Check if read or all is true
				);
				const resourceNames = filteredPermissions.map((permission: { resource: any; }) => permission.resource);
				setUserPermissions(resourceNames);
				AppDispatch({ type: "SET_LOADING_FALSE" });
			} else {
			}
		} catch (error) {
			AppDispatch({ type: "SET_LOADING_FALSE" });

		}
	};

	const handleLogout = async () => {
		// Check if there is a signed-in account
		if (accounts.length > 0) {
			const logoutRequest = {
				account: accounts[0], // Assuming only one account is signed in
			};
			// Logout the user
			instance.logout(logoutRequest);
			AppDispatch({ type: "DELETE_USER" });
			AppDispatch({ type: "DELETE_USER_COOKIE" });
			AppDispatch({ type: "DELETE_TOKEN_COOKIE" });
			window.location.href = '/'
		}
		else {
			await new Promise<void>((resolve) => {
				AppDispatch({ type: "DELETE_USER" });
				AppDispatch({ type: "DELETE_USER_COOKIE" });
				AppDispatch({ type: "DELETE_TOKEN_COOKIE" });
				AppDispatch({ type: "SET_LOGIN_FALSE" });

				resolve();
			});
			toast.success("You have been successfully logged out")
			router.push('/login');
		}
	};

	const navPages = [
		{ path: "/home", icon: <HomeIcon className="w-6 h-6" />, tooltip: 'Home' },
		{ path: "/shopping", icon: <ShoppingCartIcon className="w-6 h-6" />, tooltip: 'Shopping' },
		{ path: "/users", icon: <UserPlusIcon className="w-6 h-6" />, tooltip: 'Users' },
		{
			path: "/settings", icon: <Cog6ToothIcon className="w-6 h-6" />, tooltip: 'Settings',
			subMenu: [
				{ path: "/settings/roles", label: "Roles" },
			]
		},
	];

	const hasPermission = (permission: string): boolean => {
		return userPermissions.includes(permission);
	};

	// const renderUserIcon = () => {
	// 	return (
	// 		<Dropdown placement='right-start' className='py-1 px-1 rounded-sm absolute left-3 w-full min-w-[150px] ' classNames={{ content: 'mt-[-8px]' }}>
	// 			<DropdownTrigger>
	// 				<div className="flex flex-col items-center justify-center">
	// 					<div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-300 cursor-pointer" title={`${AppState.user?.firstName} ${AppState.user?.lastName}`}>
	// 						<p className="text-app-009 font-bold text-lg">
	// 							{AppState.user?.firstName?.charAt(0).toUpperCase()}
	// 							{AppState.user?.lastName?.charAt(0).toUpperCase()}
	// 						</p>
	// 					</div>
	// 				</div>
	// 			</DropdownTrigger>
	// 			<DropdownMenu>
	// 				<DropdownItem onClick={handleLogout}>Logout</DropdownItem>
	// 			</DropdownMenu>
	// 		</Dropdown>
	// 	);
	// };

	const menuItems = [
		"Profile",
		"Dashboard",
		"Activity",
		"Analytics",
		"System",
		"Deployments",
		"My Settings",
		"Team Settings",
		"Help & Feedback",
		"Log Out",
	];

	return (
		<>
			{/* <div className='flex h-screen w-screen'>
				<header className="h-full w-[240px] flex flex-col pb-2 justify-between items-center">
					<div>
						<div className='mt-3'>
							<Image src="/images/cute-fox-with-snow-outdoors.jpg" alt="Logo" width={50} height={50} className='mb-10' />
						</div>
						<div className='flex flex-col mt-4 items-center'>
							{
								navPages.map((item, key) => (
									<div key={key}>
										{hasPermission(item.tooltip) && (
											item.subMenu ? (
												<Dropdown placement='right-start' className='py-1 px-1 rounded-sm absolute left-3 w-full min-w-[150px]'>
													<DropdownTrigger>
														<div className={`text-app-001 font-light cursor-pointer ${router.pathname === item.path && '!font-semibold'} mb-6`} title={item.tooltip}>
															{item.icon}
														</div>
													</DropdownTrigger>
													<DropdownMenu aria-label="Static Actions">
														{item.subMenu.map((subItem, subKey) => (
															<DropdownItem key={subKey} as={Link} href={subItem.path}>{subItem.label}</DropdownItem>
														))}
													</DropdownMenu>
												</Dropdown>
											) : (
												<Link href={item.path}>
													<div className={`text-app-001 font-light ${router.pathname === item.path && '!font-semibold'} mb-6`} title={item.tooltip}>
														{item.icon}
													</div>
												</Link>
											)
										)}
									</div>
								))

							}
						</div>
					</div>
					<div>
						{renderUserIcon()}
					</div>
				</header>
				<div className="w-full overflow-x-auto bg-white border-1 border-solid p-4">{children}</div>
			</div> */}

			<Navbar
				isBordered
				shouldHideOnScroll
				isMenuOpen={isMenuOpen}
				onMenuOpenChange={() => setIsMenuOpen(!isMenuOpen)}
				maxWidth='full'
			>
				<NavbarContent className="md">
					<NavbarMenuToggle />
				</NavbarContent>
				<div className='flex justify-center'>
					<NavbarBrand >
						{/* <AcmeLogo /> */}
						<p className="font-bold text-app-016">App</p>
					</NavbarBrand>
				</div>

				<NavbarContent as="div" justify="end">
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								className="transition-transform"
								color="secondary"
								name="Jason Hughes"
								size="sm"
								src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem key="profile" className="h-14 gap-2">
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">{AppState.user?.firstName + " " + AppState.user?.lastName}</p>
								<p className="font-semibold">{AppState.user?.email}</p>
							</DropdownItem>
							<DropdownItem key="logout" color="danger" onClick={handleLogout}>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</NavbarContent>

				<NavbarMenu>
					{navPages.map((item, index) => (
						item.subMenu ? (
							<Dropdown key={`${item.path}-${index}`}>
								<DropdownTrigger className='cursor-pointer'>
									<span className={`text-foreground`}>
										{item.tooltip}
									</span>
								</DropdownTrigger>
								<DropdownMenu aria-label={`${item.tooltip} Submenu`} variant="flat">
									{item.subMenu.map((subItem, subIndex) => (
										<DropdownItem key={`${subItem.path}-${subIndex}`} textValue={`${subItem.path}-${subIndex}`} onClick={() => { router.push(subItem.path); setIsMenuOpen(false); }}>
											<span>
												{subItem.label}
											</span>
										</DropdownItem>
									))}
								</DropdownMenu>
							</Dropdown>
						) : (
							<NavbarMenuItem key={`${item.path}-${index}`} onClick={() => setIsMenuOpen(false)}>
								<Link href={item.path} className='text-app-021'>
									{item.tooltip}
								</Link>
							</NavbarMenuItem>

						)
					))}
					<NavbarMenuItem onClick={() => { setIsMenuOpen(false); handleLogout() }}>
						<Link href="">
							<span className={`w-full text-danger`}>
								Log out
							</span>
						</Link>
					</NavbarMenuItem>
				</NavbarMenu>
			</Navbar>
			<div className='flex h-screen w-screen'>
				<div className="w-full overflow-x-auto bg-white border-1 border-solid p-4">{children}</div>
			</div>
		</>
	)

}

export default MainLayout;