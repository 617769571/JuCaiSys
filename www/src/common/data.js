module.exports = {
	// 测试数据
	currentRole: 0,
	// 正式数据
	role: ['客服', '风控', '催收', '财务', '总后台'],
	roleJava: [2, 3, 4, 5, 1],
	// 菜单
	menu: {
		0: { 
			title: '工作站',
			value: ['工作站'] 
		},
		1: { 
			title: '客服审核',
			value: ['客服抢单列表', '客服待审核列表', '贷款客户', '通讯信息', '审核成功', '审核失败', '拉黑列表']
		},
		2: { 
			title: '风控专员',
			value: ['风控1审核列表', '风控2审核列表', '待还客户', '展期管理', '逾期管理', '新贷款用户', '高逾期管理']
		},
		3: { 
			title: '财务专员',
			value: ['待放款管理', '贷款管理', '逾期管理', '待还客户', '展期管理', '还款成功', '新贷款用户', '财务统计', '贷款金额']
		},
		4: { 
			title: '个人中心',
			value: ['密码修改'] 
		},
		5: { 
			title: '账号管理',
			value: ['账号管理'] 
		},
		6: {
			title: '数据管理',
			value: ['查看费率'] 
		}
	},
	// 权限与菜单关系
	authority: {
		// 客服
		0: {
			1: [0, 1, 2, 3, 4, 5, 6],
			4: [0]
		},
		// 风控
		1: {
			1: [2, 3, 5, 6],
			2: [0, 1, 2, 3, 4, 5, 6],
			4: [0]
		},
		// 催收
		2: {
			1: [3],
			2: [4, 6],
			3: [2, 3, 4, 5],
			4: [0]
		},
		// 财务
		3: {
			0: [0],
			1: [2],
			3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			4: [0]
		},
		// admin
		4: {
			0: [0],
			1: [0, 1, 2, 3, 4, 5, 6],
			2: [0, 1, 2, 3, 4, 5, 6],
			3: [0, 1, 2, 3, 4, 5, 6, 7, 8],
			4: [0],
			5: [0],
			6: [0]
		}
	},
	// 搜索条件
	search: [
		{
			index: 0,
			name: '姓名',
			field: 'customerName',
			type: 0 // 0-默认，1-时间段，2-选项
		}, {
			index: 1,
			name: '手机号',
			field: 'telephone',
			type: 0
		}, {
			index: 2,
			name: '身份证号',
			field: 'idCard',
			type: 0
		}, {
			index: 3,
			name: '注册时间',
			field: '',
			type: 1
		}, {
			index: 4,
			name: '放款时间',
			field: '',
			type: 1
		}, {
			index: 5,
			name: '应还时间',
			field: '',
			type: 1
		}, {
			index: 6,
			name: '实还时间',
			field: '',
			type: 1
		}, {
			index: 7,
			name: '借款状态',
			children: ['请选择', '申请中', '未放款', '未还款', '已还款', '已展期', '已分期', '审核未通过'],
			field: 'status',
			type: 2
		}, {
			index: 8,
			name: '申请时间',
			field: '',
			type: 1
		}, {
			index: 9,
			name: '订单号',
			field: 'orderNo',
			type: 0
		}, {
			index: 10,
			name: '展期时间',
			field: '',
			type: 1
		}, {
			index: 11,
			name: '银行卡号',
			field: '',
			type: 0
		}, {
			index: 12,
			name: '逾期天数',
			field: '',
			type: 0
		}, {
			index: 13,
			name: '角色',
			children: ['请选择', '客服', '风控', '催收', '财务', '管理员'],
			field: '',
			type: 2
		}
	],
	// 列表项
	/*listItem: [
		{
			index: 0,
			name: '客户姓名',
			field: 'customerName'
		}, {
			index: 1,
			name: '手机号',
			field: 'telephone'
		}, {
			index: 2,
			name: '证件号',
			field: 'idCard'
		}, {
			index: 3,
			name: '实名认证',  //是否实名认证：0-否，1-是
			field: 'isVerifiedStr'
		}, {
			index: 4,
			name: '银行卡认证',//是否银行卡认证：0-否，1-是
			field: 'isBankStr'
		}, {
			index: 5,
			name: '手机认证',//是否手机认证：0-否，1-是
			field: 'isPhoneStr'
		}, {
			index: 6,
			name: '淘宝认证',//是否淘宝认证：0-否，1-是
			field: 'isTaobaoStr'
		}, {
			index: 7,
			name: '状态', //是否黑名单：0-是，1-否  
			field: 'isBlackStr'
		}, {
			index: 8,
			name: '注册日期',
			field: 'createTime'
		}, {
			index: 9,
			name: '客户来源',//此字段不用
			field: ''
		}, {
			index: 10,
			name: '银行卡名称',//开户行
			field: 'bankName'
		}, {
			index: 11,
			name: '银行卡号',//银行卡账号
			field: 'bankNo'
		}, {
			index: 12,
			name: '申请时间',
			field: 'createTime'
		}, {
			index: 13,
			name: '贷款金额',
			field: 'borrowAmount'
		}, {
			index: 14,
			name: '放款金额',
			field: 'giveAmount'
		}, {
			index: 15,
			name: '手续费',
			field: 'handlingFee'
		}, {
			index: 16,
			name: '期限',//还款期限/天
			field: 'termDay'
		}, {
			index: 17,
			name: '应还时间',
			field: 'shouldRepayTime'
		}, {
			index: 18,
			name: '实际还款时间',
			field: 'repayTime'
		}, {
			index: 19,
			name: '是否逾期',//是否逾期：0-逾期，1-未逾期
			field: 'isOverdueStr'
		}, {
			index: 20,
			name: '逾期天数',
			field: 'overdueDays'
		}, {
			index: 21,
			name: '放款时间',
			field: 'loanTime'
		}, {
			index: 22,
			name: '审核时间',
			field: 'reviewTime'
		}, {
			index: 23,
			name: '状态', // 还款状态   //是否还款：0-未还款，1-已还款
			field: 'isRepayStr'
		}, {
			index: 24,
			name: '平台标识',//平台标志：1-android，2-ios
			field: 'sign'
		}, {
			index: 25,
			name: '订单号',
			field: 'orderNo'
		}, {
			index: 26,
			name: '审核人员',//哪位审核人员？
			field: ''
		}, {
			index: 27,
			name: '逾期费',
			field: 'overdueFee'
		}, {
			index: 28,
			name: '滞纳金',
			field: 'lataAmount'
		}, {
			index: 29,
			name: '展期时间',
			field: ''
		}, {
			index: 30,
			name: '风险评估状态',//先放着对接第三方的
			field: ''
		}, {
			index: 31,
			name: '当日贷款金额',//客户当日贷款金额？
			field: ''
		}, {
			index: 32,
			name: '日期',//什么日期？
			field: ''
		}, {
			index: 33,
			name: '申请日期',
			field: ''
		}, {
			index: 34,
			name: '工作认证',//先放着可能不用
			field: ''
		}, {
			index: 35,
			name: '应还金额',
			field: 'repayAmount'
		}, {
			index: 36,
			name: '状态', // 申请状态
			field: 'status'
		}, {
			index: 37,
			name: '状态', // 审核状态
			field: 'shStatus'
		}, {
			index: 38,
			name: '角色',
			field: ''
		}, {
			index: 39,
			name: '账号',
			field: ''
		}
	],*/
	listItem: [
		{
			index: 0,
			name: '客户姓名',
			field: ['customer', 'customerName']
		}, {
			index: 1,
			name: '手机号',
			field: ['customer', 'telephone']
		}, {
			index: 2,
			name: '证件号',
			field: ['customer', 'idCard']
		}, {
			index: 3,
			name: '实名认证',  //是否实名认证：否，是
			field: ['dynamic', 'isVerifiedStr']
		}, {
			index: 4,
			name: '银行卡认证',//是否银行卡认证：否，是
			field: ['dynamic', 'isBankStr']
		}, {
			index: 5,
			name: '手机认证',//是否手机认证：否，是
			field: ['dynamic', 'isPhoneStr']
		}, {
			index: 6,
			name: '淘宝认证',//是否淘宝认证：否，是
			field: ['dynamic', 'isTaobaoStr']
		}, {
			index: 7,
			name: '状态', //是否黑名单：是，否  
			field: ['dynamic', 'isBlackStr']
		}, {
			index: 8,
			name: '注册日期',
			field: ['customer', 'createTime']
		}, {
			index: 9,
			name: '客户来源',//前端默认写死 来源app吧。这个字段不用也行
			field: ''
		}, {
			index: 10,
			name: '银行卡名称',//开户行
			field: ['bankCard', 'bankName']
		}, {
			index: 11,
			name: '银行卡号',//银行卡账号
			field: ['bankCard', 'bankNo']
		}, {
			index: 12,
			name: '申请时间',
			field: ['borrowInfo', 'createTime']
		}, {
			index: 13,
			name: '贷款金额',
			field: ['borrowInfo', 'borrowAmount']
		}, {
			index: 14,
			name: '放款金额',
			field: ['dynamic', 'giveAmount']
		}, {
			index: 15,
			name: '手续费',
			field: ['borrowInfo', 'handlingFee']
		}, {
			index: 16,
			name: '期限',//还款期限/天
			field: ['dynamic', 'ermDay'],
			value: 7
		}, {
			index: 17,
			name: '应还时间',
			field: ['borrowInfo', 'repayTime']
		}, {
			index: 18,
			name: '实际还款时间',
			field: ['borrowInfo', 'actualRepayTime']
		}, {
			index: 19,
			name: '是否逾期',//是否逾期：逾期，未逾期
			field: ['dynamic', 'isOverdueStr']
		}, {
			index: 20,
			name: '逾期天数',
			field: ['dynamic', 'overdueDays']
		}, {
			index: 21,
			name: '放款时间',
			field: ['borrowInfo', 'loanTime']
		}, {
			index: 22,
			name: '审核时间',
			field: ['borrowInfo', 'reviewTime']
		}, {
			index: 23,
			name: '状态', // 还款状态   //是否还款：未还款，已还款
			field: ['dynamic', 'isRepayStr']
		}, {
			index: 24,
			name: '平台标识',//平台标志：android，ios
			field: ['customer', 'sign']
		}, {
			index: 25,
			name: '订单号',
			field: ['borrowInfo', 'orderNo']
		}, {
			index: 26,
			name: '审核人员',
			field: ['customer', 'kfName']
		}, {
			index: 27,
			name: '逾期费',
			field: ['dynamic', 'overdueFee']
		}, {
			index: 28,
			name: '滞纳金',
			field: ['dynamic', 'lataAmount']
		}, {
			index: 29,
			name: '展期时间',
			field: ['dynamic', 'extensionTime']
		}, {
			index: 30,
			name: '风险评估状态',//此字段暂时不用 对接第三方的。直接第三方返回的html里面让他们看数据就行了
			field: ''
		}, {
			index: 31,
			name: '当日贷款金额',//客户当日贷款金额？
			field: ['borrowInfo', 'borrowAmount']
		}, {
			index: 32,
			name: '日期',//什么日期？
			field: ['borrowInfo', 'reviewTime']
		}, {
			index: 33,
			name: '申请日期',
			field: ['borrowInfo', 'createTime']
		}, {
			index: 34,
			name: '工作认证',//此字段不用
			field: ''
		}, {
			index: 35,
			name: '应还金额',
			field: ['borrowInfo', 'repayAmount']
		}, {
			index: 36,
			name: '状态', // 申请状态
			field: ['dynamic', 'status']
		}, {
			index: 37,
			name: '状态', // 审核状态
			field: ['dynamic', 'shStatus']
		}, {
			index: 38,
			name: '角色',
			field: ['llevelStr']
		}, {
			index: 39,
			name: '账号',
			field: ['username']
		}
	],
	// 操作
	operation: [
		{
			index: 0,
			name: '拉黑',
			func: 'putInBlacklist'
		}, {
			index: 1,
			name: '查看',
			func: 'goCusInfo'
		}, {
			index: 2,
			name: '放款',
			func: 'makeMoney'
		}, {
			index: 3,
			name: '确认还款',
			func: 'repayment'
		}, {
			index: 4,
			name: '展期',
			func: 'renewal'
		}, {
			index: 5,
			name: '修改',
			func: 'edit'
		}, {
			index: 6,
			name: '审核通过',
			func: 'auditPass'
		}, {
			index: 7,
			name: '审核不通过',
			func: 'auditReject'
		}, {
			index: 8,
			name: '等级修改',
			func: 'editRank'
		}, {
			index: 9,
			name: '删除',
			func: 'delete'
		}, {
			index: 10,
			name: '查看通讯录',
			func: 'goAddrList'
		}, {
			index: 11,
			name: '移除黑名单',
			func: 'removeFromBlacklist'
		}
	],
	// 每个菜单每个角色对应搜索条件、列表项、操作、接口路径
	pageSearch: {
		'1_0': {
			search: [],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 36, 24],
			operation: {
				0: [1],
				4: [1]
			},
			url: '',
			params: { isBlack: 1, isKf: 0 }
		},
		'1_1': {
			search: [],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 22, 36, 24, 26],
			operation: {
				0: [1, 6, 7],
				4: [1, 6, 7]
			},
			url: '',
			params: { isBlack: 1, isKf: 0 }
		},
		'1_2': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
			operation: {
				0: [0, 1, 5],
				1: [1, 8],
				3: [0],
				4: [0, 1, 5],
			},
			url: '',
			params: { isBlack: 1 }
		},
		'1_3': {
			search: [0, 1],
			listItem: [0, 1, 2],
			operation: {
				0: [10],
				1: [10],
				2: [10],
				4: [10]
			},
			url: '/selectCustomer',
			params: {}
		},
		'1_4': {
			search: [0, 1, 2, 11, 9, 8, 5, 6],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 27, 28, 12, 18, 21, 22, 23, 25],
			operation: {
				0: [],
				4: []
			},
			url: '',
			params: { isBlack: 1, status: 2 }
		},
		'1_5': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 21, 22, 37, 25, 26],
			operation: {
				0: [0, 1],
				1: [1],
				4: [0, 1]
			},
			url: '',
			params: { isBlack: 1, status: 3 }
		},
		'1_6': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 3, 4, 34, 7, 33],
			operation: {
				0: [1, 11],
				1: [1, 11],
				4: [1, 11]
			},
			url: '',
			params: { isBlack: 0 }
		},

		'2_0': {
			search: [],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 22, 36, 24, 26],
			operation: {
				1: [1, 6, 7],
				4: [1, 6, 7]
			},
			url: '',
			params: { isBlack: 1, isKf: 1, isFk2: 0 ,isFk1 : 0,}
		},
		'2_1': {
			search: [],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 22, 36, 24, 26],
			operation: {
				1: [1, 6, 7],
				4: [1, 6, 7] 
			},
			url: '',
			params: { isBlack: 1, isKf: 1, isFk1: 1 ,isFk2 :0}
		},
		'2_2': {
			search: [0, 1, 2, 8, 5],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 19, 20, 35, 17, 12, 21, 22, 23, 25],
			operation: {
				1: [],
				4: []
			},
			url: '',
			params: { isBlack: 1, status: 2, isRepay: 0 }
		},
		'2_3': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 12, 21, 22, 23, 25, 26],
			operation: {
				1: [],
				4: []
			},
			url: '',
			params: { isBlack: 1, status: 2, isExtensionStr: '是' }
		},
		'2_4': {
			search: [0, 1, 2, 12, 5],
			listItem: [0, 1, 2, 13, 15, 16, 17, 35, 20, 27, 12, 21, 22, 23, 25],
			operation: {
				1: [1],
				2: [1],
				4: [1]
			},
			url: '',
			params: { isBlack: 1, isLoan: 1, isOverdue: 1, status: 2, isRepay: 0 }
		},
		'2_5': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 17, 18, 19, 20, 12, 21,22, 23, 24, 25, 26],
			operation: {
				1: [],
				4: []
			},
			url: '',
			params: { isBlack: 1 }
		},
		'2_6': {
			search: [0, 1, 2, 12, 5],
			listItem: [0, 1, 2, 13, 15, 16, 17, 35, 20, 27, 12, 21, 22, 23, 25],
			operation: {
				1: [1],
				2: [1],
				4: [1]
			},
			url: '',
			params: { isBlack: 1 }
		},
		'3_0': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 10, 11, 13, 14, 12],
			operation: {
				3: [1, 2],
				4: [1, 2]
			},
			url: '',
			params: { isBlack: 1, isLoan: 0, status: 2 }
		},
		'3_1': {
			search: [0, 1, 2, 3, 4, 5, 6, 7],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 17, 18, 19, 20, 12, 21, 22, 23, 24, 25, 26],
			operation: {
				3: [1],
				4: [1]
			},
			url: '',
			params: { isBlack: 1 }
		},
		'3_2': {
			search: [0, 1, 2, 5],
			listItem: [0, 1, 2, 13, 15, 16, 17, 20, 27, 28, 12, 21, 22, 25],
			operation: {
				2: [1],
				3: [1],
				4: [1]
			},
			url: '',
			params: { isBlack: 1, isLoan: 1, isOverdue: 0, status: 2, isRepay: 0 }
		},
		'3_3': {
			search: [0, 1, 2, 8, 5],
			listItem: [0, 1, 2, 10, 11, 12, 15, 16, 17, 19, 20, 27, 28, 12, 21, 22, 23],
			operation: {
				2: [1, 3, 4],
				3: [1, 3, 4],
				4: [1, 3, 4]
			},
			url: '',
			params: { isBlack: 1, status: 2, isRepay: 0 ,isLoan:1}
		},
		'3_4': {
			search: [0, 1, 2, 9, 5, 10],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 27, 28, 29, 21, 22, 17, 23, 25, 26],
			operation: {
				2: [],
				3: [],
				4: []
			},
			url: '',
			params: { isBlack: 1, status: 2, isExtensionStr: '是' }
		},
		'3_5': {
			search: [0, 1, 2, 11, 9, 8, 5, 6],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 27, 28, 12, 18, 21, 22, 23, 25],
			operation: {
				2: [],
				3: [],
				4: []
			},
			url: '',
			params: { isBlack: 1, status: 2, isRepay: 1 }
		},
		'3_6': {
			search: [0, 1, 2, 3],
			listItem: [0, 1, 2, 10, 11, 13, 15, 16, 17, 18, 19, 20, 12, 21, 22, 23, 30, 24, 25, 26],
			operation: {
				3: [],
				4: []
			},
			url: '',
			params: { isBlack: 1 }
		},
		'3_8': {
			search: [],
			listItem: [31, 32],
			operation: {
				3: [5],
				4: [5]
			},
			url: '',
			params: {}
		},
		'5_0': {
			search: [13],
			listItem: [38, 39],
			operation: {
				4: [5]
			},
			url: '/listAdmin',
			params: {}
		}
	}
}







































