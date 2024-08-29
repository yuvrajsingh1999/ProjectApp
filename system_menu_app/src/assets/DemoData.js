const SystemMenuList = [
	{ id: '1', name: 'System Management'},
	{ id: '2', name: 'Test Menu'}
];

const MenuList = [
	{ id: 1, name: 'System Management', parentId: null, mainMenuId: 1},
	{ id: 2, name: 'System', parentId: 1, mainMenuId: 1},
	{ id: 3, name: 'System Code', parentId: 2, mainMenuId: 1},
	{ id: 4, name: 'Code Registration', parentId: 3, mainMenuId: 1},
	{ id: 5, name: 'Code Registration 2', parentId: 2, mainMenuId: 1},
	{ id: 6, name: 'Properties', parentId: 2, mainMenuId: 1},
	{ id: 7, name: 'Menus', parentId: 2, mainMenuId: 1},
	{ id: 8, name: 'Menus Registration', parentId: 7, mainMenuId: 1},
	{ id: 9, name: 'API List', parentId: 2, mainMenuId: 1},
	{ id: 10, name: 'API Registration', parentId: 9, mainMenuId: 1},
	{ id: 11, name: 'API Edits', parentId: 9, mainMenuId: 1},
	{ id: 12, name: 'Users & Groups', parentId: 1, mainMenuId: 1},
	{ id: 13, name: 'Users', parentId: 12, mainMenuId: 1},
	{ id: 14, name: 'Groups', parentId: 12, mainMenuId: 1},
	{ id: 15, name: 'User Account Registration', parentId: 13, mainMenuId: 1},
	{ id: 16, name: 'User Group Registration', parentId: 14, mainMenuId: 1},
	{ id: 17, name: 'Test Menu', parentId: null, mainMenuId: 2},
	{ id: 18, name: 'Setting', parentId: 17, mainMenuId: 2},
	{ id: 19, name: 'Setting Code', parentId: 18, mainMenuId: 2},
	{ id: 20, name: 'Setting API Code', parentId: 17, mainMenuId: 2}
];

export {SystemMenuList, MenuList};