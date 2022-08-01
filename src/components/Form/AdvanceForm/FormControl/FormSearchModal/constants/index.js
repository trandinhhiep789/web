export const APIHostName = "TMSAPI";
export const SearchAPIPath = "api/Product/Search";
export const SearchModelAPIPath = "api/Model/Search";
export const IDSelectColumnNameMultiple = "chkSelect";
export const IDSelectColumnNameItem = "chkRadio";
export const PKColumnName = "ModelID,ModelName";
export const InitSearchParams = [{
    SearchKey: "@Keyword",
    SearchValue: ""
}
];
export const SearchMLObjectDefinition = [
    {
        Name: "Keyword",
        DefaultValue: "",
        BindControlName: "txtKeyword"
    }
];

export const SearchElementList = [
    {
        type: "textType",
        name: "txtKeyword",
        label: "",
        value: "",
        placeholder: "Từ khóa ",
        icon: "",
        listoption: {}
    }
];


export const DataGridColumnList = [
    {
        Name: "chkRadio",
        Type: "checkBoxRadio",
        Caption: "Chọn",
        DataSourceMember: "ModelID",
        Width: 50
    },
    {
        Name: "ModelID",
        Type: "text",
        Caption: "Mã model",
        DataSourceMember: "ModelID",
        Width: 150
    },
    {
        Name: "ModelName",
        Type: "text",
        Caption: "Tên model",
        DataSourceMember: "ModelName",
        Width: 200
    }

];

export const DataGridColumnListMultiple = [
    {
        Name: "chkSelect",
        Type: "checkbox",
        Caption: "Chọn",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductID",
        Type: "text",
        Caption: "Mã sản phẩm",
        DataSourceMember: "ProductID",
        Width: 150
    },
    {
        Name: "ProductName",
        Type: "text",
        Caption: "Tên sản phẩm",
        DataSourceMember: "ProductName",
        Width: 200
    }

];