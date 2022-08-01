

import React from "react";
// import {
//     BrowserRouter as Router,
//     Route,
//     Switch
// } from "react-router-dom";
// import { connect } from "react-redux";
// import { callFetchAPI } from "../../../../actions/fetchAPIAction";
import { formatMoney } from '~/utils/function';


class PartnerPayaleTemplateCom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            titlePartnerName: '',
            girdDataSource: this.props.data,
            totalPayableAmount: 0
        }
    }

    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
            const result = nextProps.data.map((item) => {
                item.totalCost = item.ServiceFee * item.Quantity
                return item
            })
            const totalPayableAmount = result.reduce((sum, curValue, curIndex, []) => {
                sum += curValue.totalCost
                return sum
            }, 0);

            this.setState({
                girdDataSource: result,
                totalPayableAmount

            })
        }

    }

    componentDidMount() {
    }

    render() {

        return (
            <div id="print">
                <div className="header" style={{ textAlign: "center", fontSize: 20, color: '#333', fontWeight: 600, textTransform: "uppercase" }}>
                    <p >Bảng kê tổng hợp đơn hàng lắp đặt theo tháng <span style={{ fontWeight: 'normal', fontSize: 15 }}>...................................</span></p>
                    <p>(Siêu thị <span style={{ fontWeight: 'normal', fontSize: 15 }}>.............................................</span>)</p>
                </div>
                <div style={{ width: '100%', marginTop: 30, }} >
                    <div style={{ width: '100%', display: 'block', flex: 1, flexDirection: 'row', }}>
                        <div style={{ width: '100%', display: 'inline-block', marginBottom: 15 }}>
                            <div style={{ width: '60%', float: "left", textAlign: 'left' }}>
                                <h3 style={{ textTransform: 'uppercase', fontSize: 15 }}>Đối tác: {this.state.girdDataSource.length > 0 ? this.state.girdDataSource[0].PartnerName : ''}</h3>
                            </div>
                            <div style={{ width: '40%', float: 'right', textAlign: 'right', lineHeight: 2 }}>
                                <span style={{ fontSize: 20, }}>Nhân viên: <span style={{ fontWeight: 'normal', fontSize: 15 }}>.............................................</span></span>
                            </div>
                        </div>
                    </div>
                    <table style={{ width: '100%', border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{padding: 0,}}>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">STT</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">Nhóm sản phẩm</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0, borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15 }} align="center">Số lượng đơn hàng</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0 , borderTop: 0, borderLeft: 0, borderBottom: 0, fontSize: 15}} align="center">Giá tiền</td>
                                <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', margin: 0 , borderTop: 0, borderLeft: 0, borderBottom: 0,borderRight: 0, fontSize: 15  }} align="center">Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.girdDataSource && this.state.girdDataSource.map((item, index) => {
                                    return (
                                        <tr key={index} style={{padding: 0,}}>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="center">{index + 1}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }}>{item.SubGroupName}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="center">{item.Quantity}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15 }} align="right">{formatMoney(item.ServiceFee, 0)}</td>
                                            <td style={{ padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0, fontSize: 15,borderRight: 0}} align="right">{formatMoney(item.totalCost, 0)}</td>
                                        </tr>
                                    )
                                })
                            }
                            <tr style={{}}>
                                <td colSpan="4" style={{ fontSize: 16, fontWeight: 600, padding: 6, border: 1, borderColor: '#dee2e6', borderStyle: 'solid', borderBottom: 0, borderLeft: 0 }}>Tổng cộng</td>
                                <td style={{ padding: 6, fontSize: 16, fontWeight: 600, border: 1, borderColor: '#dee2e6', borderStyle: 'solid',borderRight: 0, borderBottom: 0, borderLeft: 0 }} align="right">{formatMoney(this.state.totalPayableAmount, 0)}</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="footer" style={{ display: 'table', width: '100%', marginTop: 30 }}>
                    <div style={{ display: 'table-cell', width: '33.33%', textAlign: 'center' }}>
                        <h3 style={{fontSize: 15}}>Trưởng nhóm xác nhận</h3>
                        <span style={{fontSize: 12}}>(Ký,ghi rõ user-họ tên)</span>
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{fontSize: 15}}>Đối tác xác nhận</h3>
                            <span style={{fontSize: 12}}>(Ký,ghi rõ họ tên)</span>
                        </div>


                        {/* <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày ký (Bắt buộc):</p> */}
                    </div>
                    <div style={{ display: 'table-cell', width: '33.33%', textAlign: 'center' }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{fontSize: 15}}>Người nhận chứng từ</h3>
                            <span style={{fontSize: 12}}>(Ký,ghi rõ họ tên)</span>
                        </div>

                        {/* <p style={{ marginTop: 100, textAlign: 'left', fontSize: 15 }}>Ngày nhận:</p> */}
                    </div>
                </div>
            </div>

        );
    }
}

// const mapStateToProps = state => {
//     return {
//         AppInfo: state,
//         FetchAPIInfo: state.FetchAPIInfo
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         callFetchAPI: (hostname, hostURL, postData) => {
//             return dispatch(callFetchAPI(hostname, hostURL, postData));
//         }
//     };
// };

// const PartnerPayaleTemplate = connect(mapStateToProps, mapDispatchToProps)(PartnerPayaleTemplateCom);
export default PartnerPayaleTemplateCom;
