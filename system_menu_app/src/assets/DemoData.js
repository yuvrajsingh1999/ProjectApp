const SystemMenuList = [
	{ id: '1', name: 'System Management'}
];

const MenuList = [
	{ id: 1, name: 'System Management', parentId: null},
	{ id: 2, name: 'System', parentId: 1},
	{ id: 3, name: 'System Code', parentId: 2},
	{ id: 4, name: 'Code Registration', parentId: 3},
	{ id: 5, name: 'Code Registration 2', parentId: 2},
	{ id: 6, name: 'Properties', parentId: 2},
	{ id: 7, name: 'Menus', parentId: 2},
	{ id: 8, name: 'Menus Registration', parentId: 7},
	{ id: 9, name: 'API List', parentId: 2},
	{ id: 10, name: 'API Registration', parentId: 9},
	{ id: 11, name: 'API Edits', parentId: 9},
	{ id: 12, name: 'Users & Groups', parentId: 1},
	{ id: 13, name: 'Users', parentId: 12},
	{ id: 14, name: 'Groups', parentId: 12},
	{ id: 15, name: 'User Account Registration', parentId: 13},
	{ id: 16, name: 'User Group Registration', parentId: 14}
];

export {SystemMenuList, MenuList};