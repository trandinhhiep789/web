export const APIHostName = 'TMSAPI'
export const SearchAPIPath = 'api/AppFeedBackGroup/Search'
export const LoadAPIPath = 'api/AppFeedBackGroup/Load'
export const AddAPIPath = 'api/AppFeedBackGroup/Add'
export const UpdateAPIPath = 'api/AppFeedBackGroup/Update'
export const DeleteAPIPath = 'api/AppFeedBackGroup/Delete'
export const UpdateOrderAPIPath = 'api/AppFeedBackGroup/UpdateOrder'
export const BackLink = '/AppFeedBackGroup'
export const AddLink = '/AppFeedBackGroup/Add'
export const AddLogAPIPath = 'api/UserActivity/Add'
export const IDSelectColumnName = 'chkSelect'
export const PKColumnName = 'CoordinatorGroupID'
export const InitSearchParams = [{ SearchKey: '@Keyword', SearchValue: '' }]

export const PagePath = [
  { Link: '/', Title: 'Trang chủ', icon: 'fa fa-home' },
  { Link: '', Title: 'Danh sách phân loại phản hồi' }
]

export const EditPagePath = [
  { Link: '/', Title: 'Trang chủ', icon: 'fa fa-home' },
  { Link: '/AppFeedBackGroup', Title: 'Danh sách phân loại phản hồi' },
  { Link: '', Title: 'Sửa' }
]

export const AddPagePath = [
  { Link: '/', Title: 'Trang chủ', icon: 'fa fa-home' },
  { Link: '/AppFeedBackGroup', Title: 'Danh sách phân loại phản hồi' },
  { Link: '', Title: 'Thêm' }
]

export const SearchElementList = [
  {
    type: 'text',
    name: 'txtKeyword',
    label: 'Từ khóa:',
    value: '',
    placeholder: '',
    icon: '',
    listoption: {}
  }
]

export const AddElementList = [
  {
    type: 'text',
    name: 'txtAppFeedBackGroupID',
    label: 'mã phân loại phản hồi',
    value: '',
    maxSize: '10',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'AppFeedBackGroupID',
    readonly: false,
    validatonList: ['required', 'number']
  },
  {
    type: 'text',
    name: 'txtAppFeedBackGroupName',
    label: 'tên phân loại phản hồi',
    value: '',
    maxSize: '200',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'AppFeedBackGroupName',
    readonly: false,
    validatonList: ['required']
  },
  {
    type: 'textarea',
    name: 'txtDescription',
    label: 'Mô tả:',
    value: '',
    maxSize: '2000',
    placeholder: '',
    icon: '',
    rows: '6',
    listoption: {},
    DataSourceMember: 'Description',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtIconURL',
    label: 'đường dẫn hình Icon',
    value: '',
    maxSize: '200',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'IconURL',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtColorCode',
    label: 'mã màu',
    value: '',
    maxSize: '20',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'ColorCode',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtOrderIndex',
    label: 'Thứ tự hiển thị:',
    value: '',
    maxSize: '9',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'OrderIndex',
    readonly: false,
    validatonList: ['number']
  },
  {
    type: 'checkbox',
    name: 'chkIsActived',
    label: 'Kích hoạt:',
    value: true,
    placeholder: '',
    icon: '',
    listoption: {},
    readonly: false,
    validatonList: []
  },
  {
    type: 'checkbox',
    name: 'chkIsSystem',
    label: 'Hệ thống:',
    value: false,
    placeholder: '',
    icon: '',
    listoption: {},
    readonly: false,
    validatonList: []
  }
]

export const EditElementList = [
  {
    type: 'text',
    name: 'txtAppFeedBackGroupID',
    label: 'mã phân loại phản hồi',
    value: '',
    maxSize: '5',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'AppFeedBackGroupID',
    readonly: true,
    validatonList: ['required', 'number']
  },
  {
    type: 'text',
    name: 'txtAppFeedBackGroupName',
    label: 'tên phân loại phản hồi',
    value: '',
    maxSize: '200',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'AppFeedBackGroupName',
    readonly: false,
    validatonList: ['required']
  },
  {
    type: 'textarea',
    name: 'txtDescription',
    label: 'Mô tả:',
    value: '',
    maxSize: '2000',
    placeholder: '',
    icon: '',
    rows: '6',
    listoption: {},
    DataSourceMember: 'Description',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtIconURL',
    label: 'đường dẫn hình Icon',
    value: '',
    maxSize: '200',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'IconURL',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtColorCode',
    label: 'mã màu',
    value: '',
    maxSize: '20',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'ColorCode',
    readonly: false,
    validatonList: []
  },
  {
    type: 'text',
    name: 'txtOrderIndex',
    label: 'Thứ tự hiển thị:',
    value: '',
    maxSize: '9',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'OrderIndex',
    readonly: false,
    validatonList: ['number']
  },
  {
    type: 'checkbox',
    name: 'chkIsActived',
    label: 'Kích hoạt:',
    value: '',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'IsActived',
    readonly: false,
    validatonList: []
  },
  {
    type: 'checkbox',
    name: 'chkIsSystem',
    label: 'Hệ thống:',
    value: '',
    placeholder: '',
    icon: '',
    listoption: {},
    DataSourceMember: 'IsSystem',
    readonly: false,
    validatonList: []
  }
]

export const SearchMLObjectDefinition = [
  {
    Name: 'Keyword',
    DefaultValue: '',
    BindControlName: 'txtKeyword'
  }
]

export const MLObjectDefinition = [
  {
    Name: 'AppFeedBackGroupID',
    DefaultValue: '',
    BindControlName: 'txtAppFeedBackGroupID',
    DataSourceMember: 'AppFeedBackGroupID'
  },
  {
    Name: 'AppFeedBackGroupName',
    DefaultValue: '',
    BindControlName: 'txtAppFeedBackGroupName',
    DataSourceMember: 'AppFeedBackGroupName'
  },
  {
    Name: 'IconURL',
    DefaultValue: '',
    BindControlName: 'txtIconURL',
    DataSourceMember: 'IconURL'
  },
  {
    Name: 'ColorCode',
    DefaultValue: '',
    BindControlName: 'txtColorCode',
    DataSourceMember: 'ColorCode'
  },
  {
    Name: 'Description',
    DefaultValue: '',
    BindControlName: 'txtDescription',
    DataSourceMember: 'Description'
  },
  {
    Name: 'OrderIndex',
    DefaultValue: '',
    BindControlName: 'txtOrderIndex',
    DataSourceMember: 'OrderIndex'
  },
  {
    Name: 'IsActived',
    DefaultValue: true,
    BindControlName: 'chkIsActived',
    DataSourceMember: 'IsActived'
  },
  {
    Name: 'IsSystem',
    DefaultValue: false,
    BindControlName: 'chkIsSystem',
    DataSourceMember: 'IsSystem'
  },
  {
    Name: 'CreatedUser',
    DefaultValue: 'administrator',
    BindControlName: '',
    DataSourceMember: 'CreatedUser'
  },
  {
    Name: 'UpdatedUser',
    DefaultValue: 'administrator',
    BindControlName: '',
    DataSourceMember: 'UpdatedUser'
  },
  {
    Name: 'LoginLogID',
    DefaultValue: '',
    BindControlName: '',
    DataSourceMember: ''
  }
]

// export const DataGridColumnList = [
//   {
//     Name: 'chkSelect',
//     Type: 'checkbox',
//     Caption: 'Chọn',
//     DataSourceMember: 'AppFeedBackGroupID',
//     Width: 60
//   },
//   {
//     Name: 'AppFeedBackGroupID',
//     Type: 'text',
//     Caption: 'Mã phân loại phản hồi',
//     DataSourceMember: 'AppFeedBackGroupID',
//     Width: 160
//   },
//   {
//     Name: 'AppFeedBackGroupName',
//     Type: 'text',
//     Caption: 'Tên phân loại phản hồi',
//     DataSourceMember: 'AppFeedBackGroupName',
//     Width: 200
//   },
//   {
//     Name: 'IconURL',
//     Type: 'text',
//     Caption: 'Đường dẫn hình Icon',
//     DataSourceMember: 'IconURL',
//     Width: 120
//   },
//   {
//     Name: 'ColorCode',
//     Type: 'text',
//     Caption: 'Mã màu',
//     DataSourceMember: 'ColorCode',
//     Width: 100
//   },
//   // {
//   //     Name: "Description",
//   //     Type: "text",
//   //     Caption: "Mô tả",
//   //     DataSourceMember: "Description",
//   //     //Width: 200
//   // },
//   {
//     Name: 'IsActived',
//     Type: 'checkicon',
//     Caption: 'Kích hoạt',
//     DataSourceMember: 'IsActived',
//     Width: 80
//   },
//   // {
//   //     Name: "IsSystem",
//   //     Type: "checkicon",
//   //     Caption: "Hệ thống",
//   //     DataSourceMember: "IsSystem",
//   //     Width: 200
//   // },
//   {
//     Name: 'UpdatedDate',
//     Type: 'date',
//     Caption: 'Ngày cập nhật',
//     DataSourceMember: 'UpdatedDate',
//     Width: 140
//   },
//   {
//     Name: 'UpdatedUserFullName',
//     Type: 'text',
//     Caption: 'Người cập nhật',
//     DataSourceMember: 'UpdatedUserFullName',
//     Width: 140
//   },
//   {
//     Name: 'Action',
//     Type: 'link',
//     Caption: 'Tác vụ',
//     DataSourceMember: 'AppFeedBackGroupID',
//     Width: 80,
//     Link: '/AppFeedBackGroup/Edit/',
//     LinkText: 'Chỉnh sửa'
//   }
// ]

// export const gridDataSource = [
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     },
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     },
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     },
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     },
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     },
//     {
//         AppFeedBackGroupID: 1,
//         AppFeedBackGroupName: "Phản hồi gấp",
//         ColorCode: "#666666",
//         CreatedDate: null,
//         CreatedUser: "",
//         CreatedUserFullName: "",
//         DeletedDate: null,
//         DeletedUser: "",
//         Description: "",
//         IconURL: "fa-address-book",
//         IsActived: true,
//         IsDeleted: false,
//         IsSystem: true,
//         LoginlogID: "E356FAD58E8C24B5E053D105010AA519",
//         OrderIndex: 1,
//         UpdatedDate: "2022-07-09T13:54:16",
//         UpdatedUser: "",
//         UpdatedUserFullName: "Nguyễn Hoàng Thái",
//     }
// ]

export const DataGridColumnList = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "UserServiceAreaID",
        Width: 50
    },
    {
        Name: "CoordinatorGroupName",
        Type: "text",
        Caption: "Nhóm điều phối",
        DataSourceMember: "CoordinatorGroupName",
        Width: 150
    },
    {
        Name: "FullName",
        Type: "text",
        Caption: "Nhân viên",
        DataSourceMember: "FullName",
        Width: 150
    },
    {
        Name: "ProvinceName",
        Type: "text",
        Caption: "Tỉnh/thành",
        DataSourceMember: "ProvinceName",
        Width: 120
    },
    {
        Name: "DistrictName",
        Type: "text",
        Caption: "Quận/huyện",
        DataSourceMember: "DistrictName",
        Width: 120
    },
    {
        Name: "WardName",
        Type: "text",
        Caption: "Phường/xã",
        DataSourceMember: "WardName",
        Width: 120
    },
    // {
    //     Name: "UserServiceAreaID",
    //     Type: "texttolink",
    //     Caption: "Mã tư vấn bán hàng",
    //     DataSourceMember: "UserServiceAreaID",
    //     Width: 120,
    //     Link: "/UserServiceArea/Detail/",
    // },
    // {
    //     Name: "ShipmentOrderTypeName",
    //     Type: "text",
    //     Caption: "Loại yêu cầu vận chuyển",
    //     DataSourceMember: "ShipmentOrderTypeName",
    //     Width: 170
    // },
    // {
    //     Name: "SubGroupName",
    //     Type: "text",
    //     Caption: "Nhóm hàng",
    //     DataSourceMember: "SubGroupName",
    //     Width: 150
    // },
    // {
    //     Name: "ProductName",
    //     Type: "text",
    //     Caption: "Sản phẩm",
    //     DataSourceMember: "ProductName",
    //     Width: 150
    // },
    // {
    //     Name: "IsAdviceOtherProduct",
    //     Type: "checkicon",
    //     Caption: "Tư vấn sản phẩm khác",
    //     DataSourceMember: "IsAdviceOtherProduct",
    //     Width: 130
    // },
    // {
    //     Name: "CreatedUserFullName",
    //     Type: "text",
    //     Caption: "Người tạo",
    //     DataSourceMember: "CreatedUserFullName",
    //     Width: 120
    // },
    // {
    //     Name: "CreatedDate",
    //     Type: "datetime",
    //     Caption: "Ngày tạo",
    //     DataSourceMember: "CreatedDate",
    //     Width: 120
    // },
    // {
    //     Name: "IsActived",
    //     Type: "checkicon",
    //     Caption: "Kích hoạt",
    //     DataSourceMember: "IsActived",
    //     Width: 60
    // },
    // {
    //     Name: "IsSystem",
    //     Type: "checkicon",
    //     Caption: "Hệ thống",
    //     DataSourceMember: "IsSystem",
    //     Width: 60
    // },
    {
        Name: "UpdatedDate",
        Type: "date",
        Caption: "Ngày cập nhật",
        DataSourceMember: "UpdatedDate",
        Width: 140
    },
    {
        Name: "UpdatedUserFullName",
        Type: "text",
        Caption: "Người cập nhật",
        DataSourceMember: "UpdatedUserFullName",
        Width: 140
    },
    {
        Name: "Action",
        Type: "link",
        Caption: "Tác vụ",
        DataSourceMember: "UserServiceAreaID",
        Width: 80,
        Link: "/UserServiceArea/Edit/",
        LinkText: "Chỉnh sửa"
    }
];

export const gridDataSource = [
  {
    CoordinatorGroupID: 16,
    CoordinatorGroupName: '16-ĐML_HCM_HMO - Bà Điểm',
    CreatedDate: null,
    CreatedUser: '',
    CreatedUserFullName: '',
    DeletedDate: null,
    DeletedUser: '',
    DistrictID: 962,
    DistrictName: '962-Huyện Tuy Phong',
    FullName: '73309-Lê Nho Học',
    Index: 0,
    IsDeleted: false,
    IsSelected: false,
    LoginlogID: 'E4B89052254956ACE053D105010AE23C',
    ProvinceID: 111,
    ProvinceName: '111-Bình Thuận',
    UpdatedDate: '2022-07-27T16:30:59',
    UpdatedUser: '',
    UpdatedUserFullName: 'Nguyễn Hoàng Thái',
    UserName: '73309',
    UserServiceAreaID: 'E4C713226CFC40A0E053D105010A6365',
    WardID: 1384,
    WardName: '1384-Xã Bình Thạnh',
    cdc_TimestAmp: '2022-07-27T16:30:59.235184',
    cdc_Version: 0
  },
  {
    CoordinatorGroupID: 17,
    CoordinatorGroupName: '17-ĐML_HCM_HMO - Bà Điểm',
    CreatedDate: null,
    CreatedUser: '',
    CreatedUserFullName: '',
    DeletedDate: null,
    DeletedUser: '',
    DistrictID: 962,
    DistrictName: '962-Huyện Tuy Phong',
    FullName: '73309-Lê Nho Học',
    Index: 0,
    IsDeleted: false,
    IsSelected: false,
    LoginlogID: 'E4B89052254956ACE053D105010AE23C',
    ProvinceID: 111,
    ProvinceName: '111-Bình Thuận',
    UpdatedDate: '2022-07-27T16:30:59',
    UpdatedUser: '',
    UpdatedUserFullName: 'Nguyễn Hoàng Thái',
    UserName: '73309',
    UserServiceAreaID: 'E4C713226CFC40A0E053D105010A6365',
    WardID: 1384,
    WardName: '1384-Xã Bình Thạnh',
    cdc_TimestAmp: '2022-07-27T16:30:59.235184',
    cdc_Version: 0
  },
  {
    CoordinatorGroupID: 18,
    CoordinatorGroupName: '18-ĐML_HCM_HMO - Bà Điểm',
    CreatedDate: null,
    CreatedUser: '',
    CreatedUserFullName: '',
    DeletedDate: null,
    DeletedUser: '',
    DistrictID: 962,
    DistrictName: '962-Huyện Tuy Phong',
    FullName: '73309-Lê Nho Học',
    Index: 0,
    IsDeleted: false,
    IsSelected: false,
    LoginlogID: 'E4B89052254956ACE053D105010AE23C',
    ProvinceID: 111,
    ProvinceName: '111-Bình Thuận',
    UpdatedDate: '2022-07-27T16:30:59',
    UpdatedUser: '',
    UpdatedUserFullName: 'Nguyễn Hoàng Thái',
    UserName: '73309',
    UserServiceAreaID: 'E4C713226CFC40A0E053D105010A6365',
    WardID: 1384,
    WardName: '1384-Xã Bình Thạnh',
    cdc_TimestAmp: '2022-07-27T16:30:59.235184',
    cdc_Version: 0
  },
  {
    CoordinatorGroupID: 19,
    CoordinatorGroupName: '19-ĐML_HCM_HMO - Bà Điểm',
    CreatedDate: null,
    CreatedUser: '',
    CreatedUserFullName: '',
    DeletedDate: null,
    DeletedUser: '',
    DistrictID: 962,
    DistrictName: '962-Huyện Tuy Phong',
    FullName: '73309-Lê Nho Học',
    Index: 0,
    IsDeleted: false,
    IsSelected: false,
    LoginlogID: 'E4B89052254956ACE053D105010AE23C',
    ProvinceID: 111,
    ProvinceName: '111-Bình Thuận',
    UpdatedDate: '2022-07-27T16:30:59',
    UpdatedUser: '',
    UpdatedUserFullName: 'Nguyễn Hoàng Thái',
    UserName: '73309',
    UserServiceAreaID: 'E4C713226CFC40A0E053D105010A6365',
    WardID: 1384,
    WardName: '1384-Xã Bình Thạnh',
    cdc_TimestAmp: '2022-07-27T16:30:59.235184',
    cdc_Version: 0
  }
]
